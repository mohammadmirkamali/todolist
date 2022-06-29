import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('components/Navbar'));
const Head = dynamic(() => import('next/head'));

const ExamInfoPage: React.FC = () => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('global.exam') })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <div>ddd</div>
    </>
  );
};

export default ExamInfoPage;
