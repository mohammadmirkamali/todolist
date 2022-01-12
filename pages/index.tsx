import Head from 'next/head';
import React from 'react';
import { t } from 'i18next';
import Landing from 'components/landing';

const Home: React.FC = () => (
  <>
    <Head>
      <title>{t('global.homeHead')}</title>
    </Head>

    <Landing />
  </>
);

export default Home;
