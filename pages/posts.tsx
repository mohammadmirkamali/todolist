import Head from 'next/head';
import React from 'react';
import { t } from 'i18next';
import Navbar from 'components/Navbar';
import Posts from 'components/Posts';

const PostsPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title', { title: t('navbar.posts') })}</title>
    </Head>

    <Navbar />
    <Posts />
  </>
);

export default PostsPage;
