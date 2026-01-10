import { useTranslation } from 'react-i18next';

export default function PageContact() {
  const { t } = useTranslation();

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
        <form className="form-control w-full max-w-md">
          <div className="flex flex-col gap-2 w-full items-center md:items-start">
            <div className="form-control ">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_NAME')}
                </span>
              </label>
              <input type="text" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_EMAIL')}
                </span>
              </label>
              <input type="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label block">
                <span className="label-text">
                  {t('CONTACT.FORM_FIELD_COMMENTS')}
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>
            <div className="form-control mt-6 p-2 md:p-0">
              <button className="btn btn-outline rounded-3xl">
                <span className="italic p-4">{t('HOME.CONTACT_BUTTON')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
