/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getChapterAction } from 'store/course/course.action';

const Navbar = dynamic(() => import('components/Navbar'));
const Lesson = dynamic(() => import('components/Lesson'));
const Head = dynamic(() => import('next/head'));

const LessonPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId, lessonId }: any = router.query; // eslint-disable-line
  const course = useSelector((state) => state.course.chapters)?.[courseId]?.data;
  const user = useSelector((state) => state.account.user);
  const lesson = course?.chapters
    ?.map((item) => item.lessons.map((k) => k))
    .flat()
    .find((item) => item.id === Number(lessonId));

  useEffect(() => {
    courseId && !course?.user && dispatch(getChapterAction(courseId, !!user));
  }, [courseId, user]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.title })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Lesson lesson={lesson} course={course} />
    </>
  );
};

export default LessonPage;
