export interface Env {
  BREVO_API_KEY: string;
  CONTACT_FORM_EMAIL: string;
  NO_REPLY_EMAIL: string;
}

interface Email {
  email: string;
  name: string;
}

interface MessageVersion {
  to: Email[];
  htmlContent?: string;
  subject?: string;
}

interface EmailPayload {
  sender: Email;
  subject: string;
  htmlContent: string;
  messageVersions: MessageVersion[];
}
