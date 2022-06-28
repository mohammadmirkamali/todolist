/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('components/Navbar'));
const Profile = dynamic(() => import('components/Profile'));
const Head = dynamic(() => import('next/head'));

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const searchData = useSelector((state) => state.course.searchData);

  return (
    <>
      <Head>
        <title>
          {t('global.title', { title: (name as string)?.replace(/-/g, ' ') })}
        </title>
        <meta name="description" content={t('global.ceoDescription')} />
      </Head>

      <Navbar />
      <Profile searchData={searchData} />
    </>
  );
};

export default ProfilePage;
