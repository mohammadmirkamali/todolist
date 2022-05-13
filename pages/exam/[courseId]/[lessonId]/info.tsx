/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import request from 'services/request';
import { ExamInfoUrl } from 'services/routes';

const PageLoading = dynamic(() => import('components/Common/pageLoading'));
const Navbar = dynamic(() => import('components/Navbar'));
const ExamInfo = dynamic(() => import('components/Exam/examInfo'));
const Head = dynamic(() => import('next/head'));

const ExamInfoPage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { courseId, lessonId } = router.query;
  useEffect(() => {
    const getData = async () => {
      const res = await request.get(ExamInfoUrl(courseId, lessonId));
      res.ok ? setData(res.data) : setError(res.data);
    };
    courseId && getData();
  }, [courseId]);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {data ? <ExamInfo data={data} /> : error ? <div>error</div> : <PageLoading />}
    </>
  );
};

export default ExamInfoPage;
