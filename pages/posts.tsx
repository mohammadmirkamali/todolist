import React from 'react';
import dynamic from 'next/dynamic';
import { t } from 'i18next';

const Navbar = dynamic(() => import('components/Navbar'));
const Posts = dynamic(() => import('components/Posts'));
const Head = dynamic(() => import('next/head'));

// eslint-disable-next-line arrow-body-style
const PostsPage: React.FC = () => {
  // const { posts } = useSelector((state) => state.course);
  return (
    <>
      <Head>
        <title>{t('global.title', { title: t('navbar.posts') })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      <Posts />
    </>
  );
};

export default PostsPage;
