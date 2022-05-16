import dynamic from 'next/dynamic';
import React from 'react';
import { t } from 'i18next';

const Navbar = dynamic(() => import('components/Navbar'));
const Conditions = dynamic(() => import('components/Conditions'));
const Footer = dynamic(() => import('components/Footer'));
const Head = dynamic(() => import('next/head'));

const ConditionsPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title', { title: t('navbar.conditions') })}</title>
      <meta name="description" content={t('global.ceoDescription')} />
    </Head>

    <Navbar />
    <Conditions />
    <Footer />
  </>
);

export default ConditionsPage;
