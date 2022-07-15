/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import request from 'services/request';
import { ExamUrl, HomeRoute } from 'services/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getExamInfoAction } from 'store/course/course.action';
import { message } from 'antd';

const Navbar = dynamic(() => import('components/Navbar'));
const ExamQuestions = dynamic(() => import('components/Exam/examQuestions'));
const Head = dynamic(() => import('next/head'));

const ExamPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { examId } = router.query;
  const examInfo = useSelector((state) => state.course.examInfo);

  const getData = async () => {
    const res = await request.get(ExamUrl(examId));
    res.ok ? setData(res.data) : setError(res.data);
  };
  useEffect(() => {
    examId && getData();
  }, [examId]);

  useEffect(() => {
    !examInfo && dispatch(getExamInfoAction(examId));
    examInfo?.is_passed &&
      (router.push(HomeRoute()), message.warn(t('exam.alreadyPassed')));
  }, [examInfo]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('global.exam') })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      {data?.message ? (
        <div className="flex justify-center min-h-[calc(100vh-70px)] bg-blue-7">
          <div className="w-screen mx-[24px] h-[200px] mt-[100px] text-center md:w-[400px] shadow-lg rounded-[8px] bg-white flex flex-col items-center p-[40px]">
            {data?.message}
          </div>
        </div>
      ) : (
        <ExamQuestions data={data} info={examInfo} error={error} reload={getData} />
      )}
    </>
  );
};

export default ExamPage;
