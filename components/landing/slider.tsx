/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { t } from 'i18next';
import { CourseType } from 'types/main.type';
import Card from 'components/Common/Card';

type SliderType = { courses: CourseType[]; title: string };
const Slider: React.FC<SliderType> = ({ courses, title }) => (
  <div>
    <div>{t(`landing.${title}`)}</div>
    <div>{t(`landing.${title}Info`)}</div>
    <Swiper
      modules={[Navigation, Pagination]}
      className="xl:w-[1280px] md:w-[650px] w-[320px] md:h-[360px]"
      freeMode
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        '200': { slidesPerView: 2 },
        '768': { slidesPerView: 2 },
        '1250': { slidesPerView: 4 },
      }}
    >
      {courses.map((item) => (
        <SwiperSlide key={item.id}>
          <Card course={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Slider;
