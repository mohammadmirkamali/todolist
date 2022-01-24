import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/Landing'));
const Head = dynamic(() => import('next/head'));

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
