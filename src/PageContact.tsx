import { useTranslation } from 'react-i18next';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { API_PREFIX } from './constants';

export default function PageContact() {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const apiUrl = `${API_PREFIX}/contact`;

    const formData: Record<string, string> = {
      name:
        (event.currentTarget.elements.namedItem('name') as HTMLInputElement)
          ?.value || '',
      email:
        (event.currentTarget.elements.namedItem('email') as HTMLInputElement)
          ?.value || '',
      message:
        (event.currentTarget.elements.namedItem('message') as HTMLInputElement)
          ?.value || '',
    };

    const formBody = Object.keys(formData)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]),
      )
      .join('&');

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="w-full md:w-1/2 p-4 flex flex-col  items-center">
        <h1 className="accent-text">{t('CONTACT.TITLE')}</h1>
        <p>
          {t('CONTACT.CONTENT_1')}
          <br />
          {t('CONTACT.CONTENT_2')}
        </p>
      </div>
      <div className="w-full md:w-1/2 p-4  flex flex-col md:flex-row items-center md:items-start">
        <form className="form-control w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-full items-center md:items-start">
            <div className="form-control ">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_NAME')}
                </span>
              </label>
              <input name="name" type="text" className="input input-bordered" required disabled={submitted}/>
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_EMAIL')}
                </span>
              </label>
              <input name="comments" type="email" className="input input-bordered" required disabled={submitted} />
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_COMMENTS')}
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                name="message"
                required disabled={submitted}
              ></textarea>
            </div>
            <div className="form-control mt-6 p-2 md:p-0">
              <button  type="submit" disabled={submitted} className="btn btn-outline rounded-3xl">
                <span className="italic p-4">{t('HOME.CONTACT_BUTTON')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
