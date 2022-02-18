import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const PageLoading = dynamic(() => import('components/Common/pageLoading'));
const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/Landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC = () => {
  const { courses } = useSelector((state) => state.course);
  return (
    <>
      <Head>
        <title>{t('global.homeHead')}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {courses ? <Landing courses={courses} /> : <PageLoading />}
    </>
  );
};

export default Home;
