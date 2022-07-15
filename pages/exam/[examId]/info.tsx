import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { getExamInfoAction } from 'store/course/course.action';
import { useDispatch, useSelector } from 'react-redux';
import { HomeRoute } from 'services/routes';
import { message } from 'antd';

const Navbar = dynamic(() => import('components/Navbar'));
const ExamInfo = dynamic(() => import('components/Exam/examInfo'));
const Head = dynamic(() => import('next/head'));

const ExamInfoPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { examId } = router.query;
  const examInfo = useSelector((state) => state.course.examInfo);

  useEffect(() => {
    examId && dispatch(getExamInfoAction(examId));
  }, [examId]);
  useEffect(() => {
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
      <ExamInfo data={examInfo} />
    </>
  );
};

export default ExamInfoPage;
