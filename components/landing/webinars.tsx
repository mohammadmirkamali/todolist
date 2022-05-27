/* eslint-disable import/no-unresolved */
import { Skeleton } from 'antd';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Card from 'components/Common/Card';
import { getAllWebinarAction } from 'store/account/account.action';

const Webinars: React.FC = () => {
  const dispatch = useDispatch();
  const webinars = useSelector((state) => state.account.webinars);
  const error = useSelector((state) => state.account.webinarsError);

  return (
    <div className="w-full min-h-[300px] text-center px-[40px] mb-[40px]">
      {webinars ? (
        <div>
          <h2 className="font-bold text-[27px]">{t('webinar.webinars')}</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            className="xl:w-[1280px] md:w-[650px] w-[330px] md:h-[360px]"
            freeMode
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              '100': { slidesPerView: 1 },
              '768': { slidesPerView: 2 },
              '1250': { slidesPerView: 4 },
            }}
          >
            {webinars.map((item) => (
              <SwiperSlide key={item.id}>
                <Card data={item} webinar />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : error ? (
        <div>error</div>
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}
    </div>
  );
};

export default Webinars;
