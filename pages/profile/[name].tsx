/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const PageLoading = dynamic(() => import('components/Common/pageLoading'));
const Navbar = dynamic(() => import('components/Navbar'));
const Profile = dynamic(() => import('components/Profile'));
const Head = dynamic(() => import('next/head'));

const ProfilePage: React.FC = () => {
  const courses = useSelector((state) => state.course.courses);
  const webinars = useSelector((state) => state.account.webinars);
  const error = useSelector((state) => state.course.coursesError);
  const user = useSelector((state) => state.account.user);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      {courses && webinars ? (
        <Profile courses={courses} webinars={webinars} user={user} />
      ) : error ? (
        <div>error</div>
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default ProfilePage;
