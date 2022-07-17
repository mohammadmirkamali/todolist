/* eslint-disable import/no-unresolved */
import React from 'react';
import { t } from 'i18next';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Card from 'components/Common/Card';
import { CoursesType, WebinarsType } from 'types/course.type';
import useWindowSize from 'hooks/useWidowsSize';
import LoadingBox from 'components/Common/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeAction } from 'store/course/course.action';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AllPageRoute } from 'services/routes';
import { SAllLink } from './style';

type SliderType = { courses: CoursesType[] | WebinarsType[]; title: string };
const Slider: React.FC<SliderType> = ({ courses, title }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.course.homeError);
  const [size] = useWindowSize();
  const data = size >= 1280 ? courses?.slice(0, 7) : courses?.slice(0, 5);
  const reloadData = (): void => {
    dispatch(getHomeAction());
  };
  return (
    <div
      className={`${
        title === 'event' ? '' : 'bg-blue-11'
      } w-full md:my-[50px] center flex-col pb-[40px]`}
    >
      <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
        {t(`landing.${title}`)}
      </h2>

      <div className="flex-wrap center w-[300px] min-h-[250px] md:w-[768px] xl:w-[1300px]">
        <LoadingBox data={!!data?.length} error={error} reload={reloadData}>
          {data?.map((item) => (
            <div
              key={item.id}
              className="scale-[.85] md:scale-[.8] md:m-[-32px] xl:scale-100 xl:m-0"
            >
              <Card data={item} webinar={title === 'event'} />
            </div>
          ))}
        </LoadingBox>
      </div>
      <Link href={title === 'event' ? AllPageRoute('events') : AllPageRoute('courses')}>
        <SAllLink className="mt-[24px] text-[16px] text-blue-1 cursor-pointer">
          {t(`landing.seeAll${title === 'event' ? 'Webinars' : 'Courses'}`)}{' '}
          <ArrowLeftOutlined />
        </SAllLink>
      </Link>
    </div>
  );
};

export default Slider;
