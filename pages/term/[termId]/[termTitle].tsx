import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getTermAction } from 'store/course/course.action';

const Navbar = dynamic(() => import('components/Navbar'));
const Term = dynamic(() => import('components/Term'));
const Head = dynamic(() => import('next/head'));

const WebinarPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { termId, termTitle } = router.query;
  const term = useSelector((state) => state.course.term);

  useEffect(() => {
    termId && Number(termId) !== term?.id && dispatch(getTermAction(termId));
  }, [termId]);

  return (
    <>
      <Head>
        <title>
          {t('global.title', { title: (termTitle as string)?.replace(/-/g, ' ') })}
        </title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Term />
    </>
  );
};

export default WebinarPage;
