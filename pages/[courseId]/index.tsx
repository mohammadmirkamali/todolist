/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import request from 'services/request';
import { CourseUrl } from 'services/routes';
import { CourseType } from 'types/course.type';
import { GET_CHAPTER_SUCCESS } from 'store/course/course.constants';

const Navbar = dynamic(() => import('components/Navbar'));
const Course = dynamic(() => import('components/Course'));
const Head = dynamic(() => import('next/head'));

type PageType = { data: CourseType };
const CoursePage: React.FC<PageType> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.courseId as string;

  useEffect(() => {
    dispatch({
      type: GET_CHAPTER_SUCCESS,
      payload: data,
      id,
    });
  }, []);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: data.title })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      <Course course={data} />
    </>
  );
};

export default CoursePage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getServerSideProps = async ({ query }) => {
  const response = await request.get(CourseUrl(query.courseId));

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: response.data },
  };
};
