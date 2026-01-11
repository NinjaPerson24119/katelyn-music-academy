# Backend

Implements a catch-all route accepting form fields
- email
- name
- message

This function uses Revo to emit a confirmation to the form submitter, and a copy of the form submission to the business owner.

Required environment variables:
- BREVO_API_KEY
- CONTACT_FORM_EMAIL
- NO_REPLY_EMAIL
