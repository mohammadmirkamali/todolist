import Head from 'next/head';
import React from 'react';
import { t } from 'i18next';
import Navbar from 'components/Navbar';
import Conditions from 'components/Conditions';

const ConditionsPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title', { title: t('navbar.conditions') })}</title>
    </Head>

    <Navbar />
    <Conditions />
  </>
);

export default ConditionsPage;
