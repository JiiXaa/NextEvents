import Head from 'next/head';

import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      {/* We store context in Layout component as we can't tap to it because the MyApp is not wrapped around with it. */}
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
