/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import request from 'services/request';
import { CourseUrl } from 'services/routes';
import { CourseType } from 'types/course.type';
import { getChapterAction } from 'store/course/course.action';
import PageLoading from 'components/Common/pageLoading';

const Navbar = dynamic(() => import('components/Navbar'));
const Course = dynamic(() => import('components/Course'));
const Head = dynamic(() => import('next/head'));

type PageType = { data: CourseType };
const CoursePage: React.FC<PageType> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.courseId as string;
  const chapters = useSelector((state) => state.course.chapters);
  const data = chapters?.[id]?.data;
  const error = chapters?.[id]?.error;
  useEffect(() => {
    id && !chapters?.[id] && dispatch(getChapterAction(Number(id)));
  }, [chapters, id]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: data?.title })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {data ? <Course course={data} /> : error ? <div>error</div> : <PageLoading />}
    </>
  );
};

export default CoursePage;
