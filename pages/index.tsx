import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import PageLoading from 'components/Common/pageLoading';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC = () => {
  const courses = useSelector((state) => state.course.courses);
  const error = useSelector((state) => state.course.coursesError);

  return (
    <>
      <Head>
        <title>{t('global.homeHead')}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {courses ? (
        <Landing courses={courses} />
      ) : error ? (
        <div>error</div>
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default Home;
