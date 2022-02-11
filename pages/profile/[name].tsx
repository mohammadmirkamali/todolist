/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import Loading from 'components/Common/Loading';

const Navbar = dynamic(() => import('components/Navbar'));
const Profile = dynamic(() => import('components/Profile'));
const Head = dynamic(() => import('next/head'));

const ProfilePage: React.FC = () => {
  const { courses } = useSelector((state) => state.course);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {courses ? <Profile allCourses={courses} /> : <Loading />}
    </>
  );
};

export default ProfilePage;

export const getStaticPaths = () => {
  const profiles = [
    'account',
    'مصطفی-امینی-خواه',
    'مهدی-سالاری',
    'استاد-فیاض-بخش',
    'علی-امینی-نژاد',
    'اصغر-طاهرزاده',
    'مصطفی-امینی-خواه',
    'مصطفی-امینی-خواه',
  ];

  const paths = profiles.map((id) => ({ params: { name: id } }));
  // const paths = [{ params: { name: 'user' } }];
  return { paths, fallback: false };
};

export const getStaticProps = () => {
  const postData = {};
  return { props: { postData } };
};
