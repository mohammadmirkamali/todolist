import dynamic from 'next/dynamic';
import React from 'react';
import { t } from 'i18next';

const ContactUs = dynamic(() => import('components/ContactUs'));
const Navbar = dynamic(() => import('components/Navbar'));
const Footer = dynamic(() => import('components/Footer'));
const Head = dynamic(() => import('next/head'));

const ContactUsPage: React.FC = () => (
  <>
    <Head>
      <title>{t('global.title', { title: t('navbar.contactUs') })}</title>
      <meta name="description" content={t('global.ceoDescription')} />
    </Head>

    <Navbar />
    <ContactUs />
    <Footer />
  </>
);

export default ContactUsPage;
