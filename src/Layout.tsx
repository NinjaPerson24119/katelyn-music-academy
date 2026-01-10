import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavigationItems } from './routing';

interface LayoutProps {
  content: ReactNode;
}

export function Layout({ content }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col min-h-screen w-full xl:w-[70%] lg:w-[80%] md:w-[95%]">
        <header className="p-4 flex-col">
          <div className="flex items-center justify-between flex-col md:flex-row">
            <h1 className="text-xl font-bold accent">{t('HEADER.TITLE')}</h1>
            <div className="flex flex-col xs:flex-row xs:gap-8">
              {NavigationItems.map((item, index) => (
                <Link key={index} to={item.href}>
                  <p className="navigation-item">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className="grow w-full">
          <div className="p-4 flex flex-col items-center">{content}</div>
        </main>
        <footer className="p-4 flex flex-col md:block items-center">
          <p className="footer-title md:pl-8">{t('FOOTER.TITLE')}</p>
        </footer>
      </div>
    </div>
  );
}
