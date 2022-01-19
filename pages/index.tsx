import Head from 'next/head';
import React from 'react';
import { t } from 'i18next';
import Landing from 'components/Landing';
import Navbar from 'components/Navbar';

const Home: React.FC = () => (
  <>
    <Head>
      <title>{t('global.homeHead')}</title>
    </Head>

    <Navbar />
    <Landing />
  </>
);

export default Home;
