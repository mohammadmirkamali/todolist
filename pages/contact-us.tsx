import Head from 'next/head';
import React from 'react';
import { t } from 'i18next';
import Navbar from 'components/Navbar';
import ContactUs from 'components/ContactUs';

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
