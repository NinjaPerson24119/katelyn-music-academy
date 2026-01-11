import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from './routing';

export default function PageHome() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center">
        <h1 className="accent-text">{t('HOME.TITLE')}</h1>
        <p className="subtitle">{t('HOME.SUBTITLE')}</p>
      </div>
      <img
        className="max-w-32"
        width={400}
        src="/home.webp"
        alt="Picture of Katelyn in front of trees"
      />
      <p>
        Learning to read music and improve muscle memory are important aspects
        of musical education; However, just as much learning should be focused
        on critical listening, music theory, and learning the kinds of music
        that we <i>want</i> to learn.
      </p>
      <p>
        We strive to ensure every student learns using a method that works best
        for them. Whether you or your child learns best from traditional
        learning methods or methods that are more hands on, we strive to provide
        a top-tier level of musical education hand-tailored to your needs.
      </p>
      <p>
        Currently accepting new students for various instruments. Contact for
        more information and rates.
      </p>
      <Link to={ROUTES.CONTACT}>
        <button className="btn btn-outline rounded-3xl">
          <span className="italic p-4">{t('HOME.CONTACT_BUTTON')}</span>
        </button>
      </Link>
    </div>
  );
}
