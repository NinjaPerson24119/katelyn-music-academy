import { useTranslation } from 'react-i18next';

export default function PageHome() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <h1 className="accent-text">{t('ABOUT.TITLE')}</h1>
      <img
        className="max-w-32 pb-4"
        width={550}
        src="/bio.webp"
        alt="Picture of Katelyn indoors"
      />
      <p>
        Katelyn is a music teacher with a level 10 Royal Conservatory of Music
        equivalent. She is currently obtaining her Bachelor of Music degree from
        Grant MacEwan University, specializing in music education. In her years
        of playing thus far, she has had the privilege of working with many
        mentors who have given her the skills necessary to obtain appropriate
        music teaching credentials.
      </p>
      <p>
        During her studies, Katelyn has learned two essential things that have
        impacted how she performs and teaches others: there is no correct way to
        play music, and <i>anyone</i> can learn, regardless of age and skill
        set. Katelyn hopes to use her skills in music theory and audiation as
        well as traditional teaching practices to teach her students. Her goal
        is to help her students develop their ears, get creativity flowing, and
        create an environment where students of all ages will genuinely enjoy
        what and how they are playing.
      </p>
    </div>
  );
}
