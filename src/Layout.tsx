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
      <div className="flex flex-col min-h-screen w-full xl:w-[60%] lg:w-[70%] md:w-[85%]">
        <header className="p-4 flex-col">
          <div className="flex items-center justify-between flex-col md:flex-row">
            <h1 className="text-xl font-bold accent">{t('HEADER.TITLE')}</h1>
            <div className="flex gap-8">
              {NavigationItems.map((item, index) => (
                <Link key={index} to={item.href}>
                  <p className="navigation-item">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className="grow w-full">
          <div className="p-4">{content}</div>
        </main>
        <footer className="p-4">
          <p className="footer-title md:pl-8">{t('FOOTER.TITLE')}</p>
        </footer>
      </div>
    </div>
  );
}
