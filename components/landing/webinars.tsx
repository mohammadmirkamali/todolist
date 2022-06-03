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
import { getSearchDataAction } from 'store/course/course.action';

const Webinars: React.FC = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.course.searchData);
  const error = useSelector((state) => state.course.searchDataError);

  const reloadData = (): void => {
    dispatch(getSearchDataAction());
  };
  return (
    <div className="w-full min-h-[300px] text-center px-[40px] mb-[40px]">
      <h2 className="font-bold mb-[40px] text-[27px]">{t('webinar.webinars')}</h2>
      <LoadingBox data={searchData} error={error} reload={reloadData}>
        <div>
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
            {searchData?.events.map((item) => (
              <SwiperSlide key={item.id}>
                <Card data={item} webinar />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </LoadingBox>
    </div>
  );
};

export default Webinars;
