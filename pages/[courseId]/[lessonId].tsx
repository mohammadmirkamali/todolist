/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('components/Navbar'));
const Lesson = dynamic(() => import('components/Lesson'));
const Head = dynamic(() => import('next/head'));

const LessonPage: React.FC = () => {
  const id = useRouter().query.courseId as string;
  const data = useSelector((state) => state.course.chapters)?.[id]?.data;
  return (
    <>
      <Head>
        <title>{t('global.title')}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {data && <Lesson data={data} />}
    </>
  );
};

export default LessonPage;
