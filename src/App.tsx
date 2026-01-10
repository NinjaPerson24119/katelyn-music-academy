import { useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import type { LayoutProps } from './routing';
import { GenerateRouter,  } from './routing';

export default function App() {
  const layout = ({ content }: LayoutProps) => (
    <Layout content={content} />
  );
  const router = useMemo(() => GenerateRouter(layout), [layout]);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
