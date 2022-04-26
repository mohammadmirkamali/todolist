import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import request from 'services/request';
import { AllCoursesUrl } from 'services/routes';
import { CoursesType } from 'types/course.type';
import { GET_COURSE_SUCCESS } from 'store/course/course.constants';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC<{ data: CoursesType[] }> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_COURSE_SUCCESS, payload: data });
  }, []);

  return (
    <>
      <Head>
        <title>{t('global.homeHead')}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      <Landing courses={data} />
    </>
  );
};

export default Home;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getServerSideProps = async () => {
  const response = await request.get(AllCoursesUrl());

  return {
    props: { data: response.data },
  };
};
