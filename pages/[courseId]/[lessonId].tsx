/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('components/Navbar'));
const Lesson = dynamic(() => import('components/Lesson'));
const Head = dynamic(() => import('next/head'));

const LessonPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title')}</title>
      <meta name="description" content={t('global.description')} />
    </Head>

    <Navbar />
    <Lesson />
  </>
);

export default LessonPage;

export const getStaticPaths = async () => {
  const ids = [240, 210, 183, 177, 174, 166, 134];
  const lessons = [
    [3483, 3484, 3489, 3569, 3570, 3571, 3886, 3893],
    [1],
    [1],
    [1],
    [1],
    [1],
    [833, 834, 835, 847, 848, 849, 956, 1027, 3040],
  ];

  const paths = ids
    .map((id, index) =>
      lessons[index].map((item) => ({
        params: { courseId: id.toString(), lessonId: item.toString() },
      })),
    )
    .flat(1);

  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
