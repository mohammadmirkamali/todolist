/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getChapterAction } from 'store/course/course.action';
import PageLoading from 'components/Common/pageLoading';

const Navbar = dynamic(() => import('components/Navbar'));
const Lesson = dynamic(() => import('components/Lesson'));
const Head = dynamic(() => import('next/head'));

const LessonPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId, lessonId }: any = router.query; // eslint-disable-line
  const course = useSelector((state) => state.course.chapters)?.[courseId]?.data;
  const error = useSelector((state) => state.course.chapters)?.[courseId]?.error;
  const lesson = course?.chapters
    ?.map((item) => item.lessons.map((k) => k))
    .flat()
    .find((item) => item.id === Number(lessonId));

  useEffect(() => {
    courseId && !course && dispatch(getChapterAction(courseId));
  }, [courseId]);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.title })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {course ? (
        <Lesson lesson={lesson} course={course} />
      ) : error ? (
        <div>error</div>
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default LessonPage;
