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
  const paths = [{ params: { courseId: '245', lessonId: '1' } }];
  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
