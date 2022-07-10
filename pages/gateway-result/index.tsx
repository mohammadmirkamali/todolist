import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import PayResult from 'components/PayResult';

const Navbar = dynamic(() => import('components/Navbar'));
const Head = dynamic(() => import('next/head'));

const ExamInfoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('global.pay') })}</title>
      </Head>

      <Navbar />
      <PayResult />
    </>
  );
};

export default ExamInfoPage;
