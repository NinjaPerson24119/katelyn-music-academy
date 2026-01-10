const BUSINESS_NAME = 'Katelyn Hesse'
const RESPONSE_SUBJECT = 'Thanks for reaching out - Katelyn Hesse'
const RESPONSE_BODY = 'Thank you for contacting me. I will get back to you as soon as possible.\n\nBest Regards,\nKatelyn Hesse\nKatelyn Music Academy\nhttps://katelynmusicacademy.com'

export async function onRequestPost(context) {
  try {
    const requiredEnvVars = [
      'CONTACT_FORM_EMAIL',
      'NO_REPLY_EMAIL',
      'DKIM_DOMAIN',
      'DKIM_SELECTOR',
      'DKIM_PRIVATE_KEY',
    ];
    for (const envVar of requiredEnvVars) {
      if (!context.env.hasOwnProperty(envVar)) {
        console.log(`${envVar} environment variable not set`);
        return new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        });
      }
    }
    const CONTACT_FORM_EMAIL = context.env.CONTACT_FORM_EMAIL;
    const NO_REPLY_EMAIL = context.env.NO_REPLY_EMAIL;
    const dkimProps = {
      dkim_domain: context.env.DKIM_DOMAIN,
      dkim_selector: context.env.DKIM_SELECTOR,
      dkim_private_key: context.env.DKIM_PRIVATE_KEY,
    };

    const request = await context.request;
    if (request.method !== 'POST') {
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    }

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

    const messageBody = {
      personalizations: [
        {
          to: [{ name: BUSINESS_NAME, email: CONTACT_FORM_EMAIL }],
          ...dkimProps,
        },
      ],
      from: {
        name: name,
        email: NO_REPLY_EMAIL,
      },
      subject: `Contact Form Submission from ${name}`,
      content: [
        {
          type: 'text/plain',
          value: `${message}\n\n---------------\nSent by ${name} <${email}>`,
        },
      ],
      reply_to: {
        name: name,
        email: email,
      },
    };
    const messageResp = await sendEmail(messageBody, 'message');
    if (messageResp.status !== 202) {
      return messageResp;
    }

    const confirmationBody = {
      personalizations: [
        {
          to: [{ email: email }],
          ...dkimProps,
        },
      ],
      from: {
        name: BUSINESS_NAME,
        email: NO_REPLY_EMAIL,
      },
      subject: RESPONSE_SUBJECT,
      content: [
        {
          type: 'text/plain',
          value:
            RESPONSE_BODY,
        },
      ],
    };
    const confirmationResp = await sendEmail(confirmationBody, 'message');
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

async function sendEmail(body: any, kind: string): Promise<Response> {
  const messageRequest = new Request(
    'https://api.mailchannels.net/tx/v1/send',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
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
