import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('components/Navbar'));
const Term = dynamic(() => import('components/Term'));
const Head = dynamic(() => import('next/head'));

const WebinarPage: React.FC = () => {
  const router = useRouter();
  const { termId, termTitle } = router.query;
  const terms = useSelector((state) => state.course.searchData?.terms);
  const data = terms?.find((term) => term.id === Number(termId));

  return (
    <>
      <Head>
        <title>
          {t('global.title', { title: (termTitle as string)?.replace(/-/g, ' ') })}
        </title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Term data={data} />
    </>
  );
};

export default WebinarPage;
