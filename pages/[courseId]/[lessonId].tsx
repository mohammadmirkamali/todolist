/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useRouter } from 'next/router';
import { t } from 'i18next';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('components/Navbar'));
const Lesson = dynamic(() => import('components/Lesson'));
const Head = dynamic(() => import('next/head'));

const LessonPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('global.title')}</title>
      </Head>

      <Navbar />
      <Lesson />
    </>
  );
};

export default LessonPage;

export const getStaticPaths = async () => {
  const paths = [
    { params: { courseId: '245', lessonId: '3574' } },
    { params: { courseId: '245', lessonId: '3575' } },
    { params: { courseId: '245', lessonId: '3576' } },
    { params: { courseId: '245', lessonId: '3577' } },
    { params: { courseId: '245', lessonId: '3578' } },
    { params: { courseId: '245', lessonId: '3579' } },
    { params: { courseId: '245', lessonId: '3580' } },
    { params: { courseId: '245', lessonId: '3581' } },
    { params: { courseId: '245', lessonId: '3582' } },
    { params: { courseId: '245', lessonId: '3583' } },
    { params: { courseId: '245', lessonId: '3584' } },
    { params: { courseId: '245', lessonId: '3585' } },
    { params: { courseId: '245', lessonId: '3586' } },
    { params: { courseId: '245', lessonId: '3587' } },
    { params: { courseId: '245', lessonId: '3588' } },
    { params: { courseId: '245', lessonId: '3598' } },
    { params: { courseId: '245', lessonId: '3599' } },
    { params: { courseId: '245', lessonId: '3600' } },
  ];
  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
