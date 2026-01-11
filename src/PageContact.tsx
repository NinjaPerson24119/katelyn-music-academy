import type { FormEvent } from 'react';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { API_PREFIX } from './constants';

enum SubmissionState {
  NOT_SUBMITTED,
  SUBMITTING,
  SUBMITTED,
  SUBMISSION_ERROR,
}

export default function PageContact() {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState<SubmissionState>(
    SubmissionState.NOT_SUBMITTED,
  );
  const submissionProcessing = useMemo(
    () => submitted === SubmissionState.SUBMITTING,
    [submitted],
  );
  const disableForm = useMemo(
    () =>
      ![SubmissionState.NOT_SUBMITTED, SubmissionState.SUBMISSION_ERROR].includes(
        submitted,
      ),
    [submitted],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(SubmissionState.SUBMITTING);

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
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Message submission failed.');
        }
        setSubmitted(SubmissionState.SUBMITTED);
      })
      .catch((error) => {
        console.log('error submitting message', error);
        setSubmitted(SubmissionState.SUBMISSION_ERROR);
      });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start">
      <div className="w-full md:w-1/2 p-4 flex flex-col  items-center">
        <h1 className="accent-text">{t('CONTACT.TITLE')}</h1>
        <p>
          {t('CONTACT.CONTENT_1')}
          <br />
          {t('CONTACT.CONTENT_2')}
        </p>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col md:flex-row items-center md:items-start">
        <form className="form-control w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 w-full items-center md:items-start">
            <div className="form-control ">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_NAME')}
                </span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered"
                required
                disabled={disableForm}
              />
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_EMAIL')}
                </span>
              </label>
              <input
                name="comments"
                type="email"
                className="input input-bordered"
                required
                disabled={disableForm}
              />
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
                required
                disabled={disableForm}
              ></textarea>
            </div>
            <div>
              {submissionProcessing ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                <div className="form-control mt-6 p-2 md:p-0">
                  <button
                    type="submit"
                    disabled={disableForm}
                    className="btn btn-outline rounded-3xl"
                  >
                    <p>{disableForm}</p>
                    <span className="italic p-4">
                      {submitted == SubmissionState.NOT_SUBMITTED
                        ? t('CONTACT.FORM_SUBMIT')
                        : t('CONTACT.FORM_SUBMIT_COMPLETE')}
                    </span>
                  </button>
                </div>
              )}
              {/* Alerts */}
              <div className="p-8">
                {submitted == SubmissionState.SUBMITTED && <AlertSuccess />}
                {submitted == SubmissionState.SUBMISSION_ERROR && (
                  <AlertError />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function AlertSuccess() {
  const { t } = useTranslation();
  return (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{t('CONTACT.FORM_SUBMIT_SUCCESS')}</span>
    </div>
  );
}

function AlertError() {
  const { t } = useTranslation();
  return (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{t('CONTACT.FORM_SUBMIT_ERROR')}</span>
    </div>
  );
}
