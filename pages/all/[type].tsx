/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('components/Navbar'));
const AllData = dynamic(() => import('components/AllData'));
const Head = dynamic(() => import('next/head'));

const ExamInfoPage: React.FC = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <Head>
        <title>{t('global.title', { title: t(`landing.all-${type}`) })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>
      <Navbar />
      <AllData type={type as string} />
    </>
  );
};

export default ExamInfoPage;

export const getStaticPaths = () => {
  const paths = [
    { params: { type: 'courses' } },
    { params: { type: 'events' } },
    { params: { type: 'teachers' } },
  ];
  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
