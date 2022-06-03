import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CourseType } from 'types/course.type';
import { getChapterAction } from 'store/course/course.action';

const Navbar = dynamic(() => import('components/Navbar'));
const Course = dynamic(() => import('components/Course'));
const Head = dynamic(() => import('next/head'));

type PageType = { data?: CourseType };
const CoursePage: React.FC<PageType> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.courseId as string;
  const course = useSelector((state) => state.course.chapters)?.[id]?.data;
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    id && !course && dispatch(getChapterAction(id));
  }, [id]);

  // re-get data on user login and logout
  useEffect(() => {
    course && dispatch(getChapterAction(id));
  }, [user]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.title })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Course course={course} />
    </>
  );
};

export default CoursePage;
