import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getWebinarAction } from 'store/course/course.action';
import PageLoading from 'components/Common/pageLoading';
import Webinars from 'components/Webinars';

const Navbar = dynamic(() => import('components/Navbar'));
const Webinar = dynamic(() => import('components/Webinar'));
const Head = dynamic(() => import('next/head'));

const WebinarPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id as string;
  // const webinar = useSelector((state) => state.course.webinar?.[id].data);

  // useEffect(() => {
  //   id && !webinar && dispatch(getWebinarAction(id));npm
  // }, [id, webinar]);

  return (
    <>
      {/* <Head>
        <title>{t('global.title', { title: webinar?.title })}</title>
        <meta name="description" content={webinar?.title} />
      </Head> */}

      <Navbar />
      <Webinars />
      {/* {webinar ? <Webinar webinar={webinar} /> : <PageLoading />} */}
    </>
  );
};

export default WebinarPage;
