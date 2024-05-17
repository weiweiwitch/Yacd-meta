import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { HashRouter as Router, Route, RouteObject, Routes, useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import APIConfig from '~/components//APIConfig';
import { About } from '~/components/about/About';
import APIDiscovery from '~/components/APIDiscovery';
import ErrorBoundary from '~/components/ErrorBoundary';
import Home from '~/components/home/Home';
import { Head } from '~/components/shared/Head';
import Loading from '~/components/shared/Loading';
import Loading2 from '~/components/shared/Loading2';
import SideBar from '~/components/shared/SideBar';
import StyleGuide from '~/components/shared/StyleGuide';
import StateProvider from '~/components/StateProvider';
import { queryClient } from '~/misc/query';
import { actions, initialState } from '~/store';

import styles from './App.module.scss';

const { lazy, Suspense } = React;

const Connections = lazy(() => import('~/components/connections/Connections'));
const Config = lazy(() => import('~/components/config/Config'));
const Logs = lazy(() => import('~/components/logs/Logs'));
const Proxies = lazy(() => import('~/components/proxies/Proxies'));
const Rules = lazy(() => import('~/components/rules/Rules'));

const routes = [
  { path: '/', element: <Home /> },
  { path: '/connections', element: <Connections /> },
  { path: '/configs', element: <Config /> },
  { path: '/logs', element: <Logs /> },
  { path: '/proxies', element: <Proxies /> },
  { path: '/rules', element: <Rules /> },
  { path: '/about', element: <About /> },
  process.env.NODE_ENV === 'development' ? { path: '/style', element: <StyleGuide /> } : false,
].filter(Boolean) as RouteObject[];

function SideBarApp() {
  return (
    <>
      <APIDiscovery />
      <SideBar />
      <div className={styles.content}>
        <Suspense fallback={<Loading2 />}>{useRoutes(routes)}</Suspense>
      </div>
    </>
  );
}

const App = () => (
  <ErrorBoundary>
    <RecoilRoot>
      <StateProvider initialState={initialState} actions={actions}>
        <QueryClientProvider client={queryClient}>
          <div className={styles.app}>
            <Head />
            <Suspense fallback={<Loading />}>
              <Router>
                <Routes>
                  <Route path="/backend" element={<APIConfig />} />
                  <Route path="*" element={<SideBarApp />} />
                </Routes>
              </Router>
            </Suspense>
          </div>
        </QueryClientProvider>
      </StateProvider>
    </RecoilRoot>
  </ErrorBoundary>
);

export default App;
