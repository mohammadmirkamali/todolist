import dynamic from 'next/dynamic';
import React from 'react';
import { t } from 'i18next';

const Navbar = dynamic(() => import('components/Navbar'));
const ContactUs = dynamic(() => import('components/ContactUs'));
const Head = dynamic(() => import('next/head'));

const ContactUsPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title', { title: t('navbar.contactUs') })}</title>
    </Head>

    <Navbar />
    <ContactUs />
  </>
);

export default ContactUsPage;
