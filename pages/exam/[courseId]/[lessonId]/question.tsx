/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import request from 'services/request';
import { ExamUrl } from 'services/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getExamInfoAction } from 'store/course/course.action';

const Navbar = dynamic(() => import('components/Navbar'));
const ExamQuestions = dynamic(() => import('components/Exam/examQuestions'));
const Head = dynamic(() => import('next/head'));

const ExamPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { courseId, lessonId } = router.query;
  const examInfo = useSelector((state) => state.course.examInfo);

  const getData = async () => {
    const res = await request.get(ExamUrl(courseId, lessonId));
    res.ok ? setData(res.data) : setError(res.data);
  };
  useEffect(() => {
    courseId && getData();
  }, [courseId]);

  useEffect(() => {
    !examInfo && courseId && dispatch(getExamInfoAction(courseId, lessonId));
  }, [courseId, examInfo, lessonId]);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <ExamQuestions data={data} info={examInfo} error={error} reload={getData} />
    </>
  );
};

export default ExamPage;
