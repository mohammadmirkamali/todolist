/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getEventAction } from 'store/course/course.action';

const PageLoading = dynamic(() => import('components/Common/pageLoading'));
const Navbar = dynamic(() => import('components/Navbar'));
const Webinar = dynamic(() => import('components/Webinar'));
const Head = dynamic(() => import('next/head'));

const WebinarPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { eventId } = router.query;
  const webinar = useSelector((state) => state.course.event);
  const data = webinar?.[eventId as string]?.data;
  const error = webinar?.[eventId as string]?.error;

  useEffect(() => {
    eventId && !webinar?.[eventId as string] && dispatch(getEventAction(eventId));
  }, [eventId]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      {data ? <Webinar data={data} /> : error ? <div>error</div> : <PageLoading />}
    </>
  );
};

export default WebinarPage;
