import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavigationItems, ROUTES } from './routing';

interface LayoutProps {
  content: ReactNode;
}

export function Layout({ content }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center min-h-screen w-full md:w-[95%] lg:w-[80%] xl:w-[70%]">
        {/* Header */}
        <header className="p-8 w-full flex items-center justify-between flex-col md:flex-row">
          <Link to={ROUTES.HOME}>
            <span className="navigation-title text-xl font-bold accent">
              {t('HEADER.TITLE')}
            </span>
          </Link>
          <div className="flex flex-col xs:flex-row xs:gap-8">
            {NavigationItems.map((item, index) => (
              <Link key={index} to={item.href}>
                <p className="navigation-item">{item.text}</p>
              </Link>
            ))}
          </div>
        </header>
        {/* Content */}
        <main className="grow w-full md:w-[90%] lg:w-[80%] xl:w-[70%] flex justify-center">
          <div className="p-4 flex flex-col items-center">{content}</div>
        </main>
        {/* Footer */}
        <footer className="w-full p-4 flex justify-center md:block">
          <span className="footer-title md:pl-16">{t('FOOTER.TITLE')}</span>
        </footer>
      </div>
    </div>
  );
}
