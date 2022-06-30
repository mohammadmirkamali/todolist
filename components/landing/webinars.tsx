/* eslint-disable import/no-unresolved */
import { t } from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Card from 'components/Common/Card';
import LoadingBox from 'components/Common/LoadingBox';
import { getHomeAction } from 'store/course/course.action';
import Link from 'next/link';
import { SAllLink } from './style';
import { AllPageRoute } from 'services/routes';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Webinars: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.course.home)?.events;
  const error = useSelector((state) => state.course.homeError);

  const reloadData = (): void => {
    dispatch(getHomeAction());
  };
  return (
    <div className="w-full min-h-[300px] text-center px-[40px] mb-[50px]">
      <h2 className="font-bold mb-[40px] text-[27px]">{t('webinar.webinars')}</h2>
      <LoadingBox data={events} error={error} reload={reloadData}>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            className="xl:w-[1280px] md:w-[650px] w-[330px] md:h-[360px] mb-[24px]"
            freeMode
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              '100': { slidesPerView: 1 },
              '768': { slidesPerView: 2 },
              '1250': { slidesPerView: 4 },
            }}
          >
            {events?.map((item) => (
              <SwiperSlide key={item.id}>
                <Card data={item} webinar />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </LoadingBox>

      <Link href={AllPageRoute('events')}>
        <SAllLink className="mt-[36px] text-[16px] text-blue-1 cursor-pointer">
          {t('landing.seeAllWebinars')} <ArrowLeftOutlined />
        </SAllLink>
      </Link>
    </div>
  );
};

export default Webinars;
