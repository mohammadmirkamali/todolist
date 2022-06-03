import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { t } from 'i18next';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC = () => (
  <>
    <Head>
      <title>{t('global.homeHead')}</title>
      <meta name="description" content={t('global.ceoDescription')} />
    </Head>

    <Navbar />
    <Landing />
  </>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: { data: null },
});
