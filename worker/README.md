# Backend

Implements a catch-all route accepting form fields
- email
- name
- message

This function uses Revo to emit a confirmation to the form submitter, and a copy of the form submission to the business owner.

Required environment variables:
| Variable Name       | Description           |
|---------------------|-----------------------|
| RESEND_API_KEY       | API key for email API     |
| CONTACT_FORM_EMAIL  | Target email to relay contact form submission to|
| NO_REPLY_EMAIL      | No reply email address used as sender for confirmation email|
