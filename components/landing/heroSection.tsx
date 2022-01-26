import { t } from 'i18next';
import React from 'react';
import AntSearch from 'components/Navbar/AntSearch';
import { CourseType } from 'types/account.type';

const HeroSection: React.FC<{ courses: CourseType[] }> = ({ courses }) => (
  <div className="w-[290px] md:w-[650px] h-[230px] flex flex-col items-center lg:text-right lg:items-start text-center lg:pr-[40px] lg:w-[1260px] lg:h-[270px] bg-blue-8 bg-cover rounded-[8px] mt-[40px] text-[20px] lg:bg-[url('/search-image.webp')] ">
    <h1 className="text-white font-bold text-[24px] md:text-[30px]  lg:text-[40px]  mt-[30px]">
      {t('landing.title')}
    </h1>
    <h2 className="text-white w-[240px] md:w-[400px] lg:w-[600px] text-[14px] lg:text-[20px]">
      {t('landing.subTitle')}
    </h2>
    <AntSearch
      options={courses?.map((item) => ({ name: item.workshop_title, id: item.id }))}
      landing
    />
  </div>
);

export default HeroSection;
