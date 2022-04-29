import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import request from 'services/request';
import { AllCoursesUrl } from 'services/routes';
import { CoursesType } from 'types/course.type';
import { GET_COURSE_SUCCESS } from 'store/course/course.constants';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC<{ data?: CoursesType[] }> = ({ data }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await request.get(AllCoursesUrl());
      setInfo(response.data);
      dispatch({ type: GET_COURSE_SUCCESS, payload: response.data });
    };
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>{t('global.homeHead')}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar data={info} />
      {info && <Landing courses={info} />}
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await request.get(AllCoursesUrl());

//   return {
//     props: { data: response.data },
//   };
// };
