import { t } from 'i18next';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => (
  <div>
    {t('landing.title')}
    <Image src="/search-image.webp" width={1200} height={300} />
  </div>
);

export default HeroSection;
