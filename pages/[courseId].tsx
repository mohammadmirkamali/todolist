/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useRouter } from 'next/router';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const Navbar = dynamic(() => import('components/Navbar'));
const Course = dynamic(() => import('components/Course'));
const Head = dynamic(() => import('next/head'));

const CoursePage: React.FC = () => {
  const router = useRouter();
  const course = useSelector((state) => state.account.courses)?.find(
    (item) => item.id === Number(router.query.courseId),
  );

  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.workshop_title })}</title>
      </Head>

      <Navbar />
      {course && <Course course={course} />}
    </>
  );
};

export default CoursePage;

export const getStaticPaths = async () => {
  const paths = [
    { params: { courseId: '246' } },
    { params: { courseId: '245' } },
    { params: { courseId: '240' } },
    { params: { courseId: '235' } },
    { params: { courseId: '228' } },
    { params: { courseId: '227' } },
    { params: { courseId: '225' } },
    { params: { courseId: '220' } },
    { params: { courseId: '216' } },
    { params: { courseId: '204' } },
  ];
  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
