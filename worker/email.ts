import type { EmailPayload, Env } from './types';

const BUSINESS_NAME = 'Katelyn Hesse';
const RESPONSE_SUBJECT = 'Thanks for reaching out - Katelyn Hesse';
const RESPONSE_BODY =
  '<h2>Thank you for contacting me.</h2><p>I will get back to you as soon as possible.</p><p>Best Regards,<br/>Katelyn Hesse<br/>Katelyn Music Academy<br/>https://katelynmusicacademy.com</p>';

export async function onRequestPostContactForm(request: any, env: Env) {
  try {
    // validate environment variables
    const requiredEnvVars = [
      'CONTACT_FORM_EMAIL',
      'NO_REPLY_EMAIL',
      'BREVO_API_KEY',
    ];
    for (const envVar of requiredEnvVars) {
      if (!env.hasOwnProperty(envVar)) {
        console.log(`${envVar} environment variable not set`);
        return new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        });
      }
    }

    // validate request method
    if (request.method !== 'POST') {
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    }

    // unpack form fields
    const contentType = request.headers.get('content-type');
    if (
      !contentType ||
      !contentType.includes('application/x-www-form-urlencoded')
    ) {
      return new Response(null, {
        status: 415,
        statusText: 'Unsupported Media Type',
      });
    }
    const formData = await request.formData();
    if (
      !formData.get('email') ||
      !formData.get('name') ||
      !formData.get('message')
    ) {
      return new Response(null, {
        status: 400,
        statusText: 'Bad Request',
      });
    }
    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const message = formData.get('message')?.toString() ?? '';

    // relay email from form submission
    const messageBody = emailBodyFormSubmission(env, name, email, message);
    const messageResp = await sendEmail(messageBody, 'message', env);
    if (messageResp.status !== 202) {
      return messageResp;
    }

    // send confirmation email to form submitter
    const confirmationResp = await sendEmail(
      emailBodyConfirmation(env, name, email),
      'confirmation',
      env,
    );
    if (confirmationResp.status !== 202) {
      return confirmationResp;
    }

    return new Response(null, {
      status: 202,
      statusText: 'Accepted',
    });
  } catch (error) {
    console.log('Internal server error:', error);
    return new Response(null, {
      status: 500,
      statusText: `Internal Server Error: ${error}`,
    });
  }
}

async function sendEmail(body: any, kind: string, env: Env): Promise<Response> {
  const messageRequest = new Request('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify(body),
  });
  const resp = await fetch(messageRequest);
  if (!resp.ok) {
    let j = await resp.json();
    try {
      j = JSON.stringify(j);
    } catch {}
    console.log(
      `Failed to send email (${kind}), status: ${resp.status}, json(): ${j}`,
      JSON.stringify(resp),
    );
    return new Response(
      JSON.stringify({ error: `Failed to send email (${kind})` }),
      {
        status: resp.status,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  return new Response(null, {
    status: 202,
    statusText: 'Accepted',
  });
}

function emailBodyFormSubmission(
  env: Env,
  name: string,
  email: string,
  message: string,
): EmailPayload {
  return {
    sender: {
      email: env.NO_REPLY_EMAIL,
      name: name,
    },
    subject: `Contact Form Submission from ${name}`,
    htmlContent: `<p>${message}</br></br>---------------</br>Sent by ${name} &lt;${email}&gt;</p>`,
    messageVersions: [
      {
        to: [
          {
            email: env.CONTACT_FORM_EMAIL,
            name: BUSINESS_NAME,
          },
        ],
      },
    ],
  };
}

function emailBodyConfirmation(
  env: Env,
  name: string,
  email: string,
): EmailPayload {
  return {
    sender: {
      email: env.NO_REPLY_EMAIL,
      name: BUSINESS_NAME,
    },
    subject: RESPONSE_SUBJECT,
    htmlContent: RESPONSE_BODY,
    messageVersions: [
      {
        to: [
          {
            email: email,
            name: name,
          },
        ],
      },
    ],
  };
}
