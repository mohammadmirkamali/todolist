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
  const course = useSelector((state) => state.course.courses)?.find(
    (item) => item.id === Number(router.query.courseId),
  );

  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.workshop_title })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {course && <Course course={course} />}
    </>
  );
};

export default CoursePage;

export const getStaticPaths = async () => {
  const ids = [240, 210, 183, 177, 174, 166, 134];
  try {
    // const res = await request.get('https://taalei-edu.ir/api/v2/get_lesson/1262');
    const paths = ids.map((id) => ({ params: { courseId: id.toString() } }));
    return { paths, fallback: false };
  } catch (error) {
    const paths = [];
    return { paths, fallback: false };
  }
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
