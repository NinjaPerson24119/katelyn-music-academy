import { useTranslation } from 'react-i18next';

export default function PageLessons() {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2>{t('LESSONS.TITLE')}</h2>
        <p>
          Music lessons available to ages 5+. Online or in-person in Heritage
          Valley, Edmonton, AB.
        </p>
        <p className="italic">
          *lessons may be available to be provided at student's home for an
          additional fee. In select neighborhoods only.
        </p>
      </div>
      <div className="w-1/2 p-4 flex flex-col gap-2">
        {[
          [t('LESSONS.LESSON_LENGTH_30_MINUTES'), t('LESSONS.LESSON_LENGTH_30_MINUTES_CONTENT')],
          [t('LESSONS.LESSON_LENGTH_45_MINUTES'), t('LESSONS.LESSON_LENGTH_45_MINUTES_CONTENT')],
          [t('LESSONS.LESSON_LENGTH_60_MINUTES'), t('LESSONS.LESSON_LENGTH_60_MINUTES_CONTENT')]
        ].map(([title, content], index) => (
          <div key={index} className="collapse collapse-plus bg-none border border-base-400">
            <input type="radio" name="lessons-accordion" defaultChecked={index==0} />
            <div className="collapse-title font-semibold">
              {title}
            </div>
            <div className="collapse-content text-sm">
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
