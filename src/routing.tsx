import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Outlet,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { i18n } from './i18n';

const PageHome = lazy(() => import('./PageHome'));
const PageAbout = lazy(() => import('./PageAbout'));
const PageContact = lazy(() => import('./PageContact'));
const PageLessons = lazy(() => import('./PageLessons'));

export const ROUTES = {
  HOME: '/home',
  ABOUT: '/about',
  CONTACT: '/contact',
  LESSONS: '/lessons',
};
const DEFAULT_PAGE_URL = ROUTES.HOME;

const DEFAULT_PAGE_TITLE = i18n.t('TAB_TITLE');
function WithHelmet({
  ...props
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <Helmet>
        <title>{DEFAULT_PAGE_TITLE}</title>
      </Helmet>
      {props.children}
    </>
  );
}

export interface NavigationItem {
  text: string;
  icon: React.ReactNode;
  href: string;
  component: React.ReactElement;
}

export const NavigationItems: NavigationItem[] = [
  {
    text: i18n.t('NAVIGATION.HOME'),
    icon: <></>,
    href: ROUTES.HOME,
    component: <PageHome />,
  },
  {
    text: i18n.t('NAVIGATION.ABOUT'),
    icon: <></>,
    href: ROUTES.ABOUT,
    component: <PageAbout />,
  },
  {
    text: i18n.t('NAVIGATION.LESSONS'),
    icon: <></>,
    href: ROUTES.LESSONS,
    component: <PageLessons />,
  },
  {
    text: i18n.t('NAVIGATION.CONTACT'),
    icon: <></>,
    href: ROUTES.CONTACT,
    component: <PageContact />,
  },
];

export interface LayoutProps {
  content: React.ReactNode;
}

export function GenerateRouter(
  Layout: React.ComponentType<React.PropsWithChildren<LayoutProps>>,
) {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout content={<Outlet />} />,
      children: [
        {
          index: true,
          element: <Navigate to={DEFAULT_PAGE_URL} />,
        },
        ...NavigationItems.map((navigationItem) => {
          return {
            path: navigationItem.href,
            element: (
              <WithHelmet title={navigationItem.text}>
                {navigationItem.component}
              </WithHelmet>
            ),
          };
        }),
      ],
    },
    {
      path: '*',
      element: <PageHome />,
    },
  ]);
}
