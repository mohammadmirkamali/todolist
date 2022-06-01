import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import request from 'services/request';
import { SearchUrl } from 'services/routes';
import { SearchDataType } from 'types/course.type';
import { GET_SEARCH_DATA_SUCCESS } from 'store/course/course.constants';

const Navbar = dynamic(() => import('components/Navbar'));
const Landing = dynamic(() => import('components/landing'));
const Head = dynamic(() => import('next/head'));

const Home: React.FC<{ data?: SearchDataType }> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_SEARCH_DATA_SUCCESS, payload: data });
  }, []);

  return (
    <>
      <Head>
        <title>{t('global.homeHead')}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Landing courses={data.workshops} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await request.get(SearchUrl());

  return {
    props: { data: response.data },
  };
};
