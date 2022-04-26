/* eslint-disable import/no-unresolved */
import React from 'react';
import { t } from 'i18next';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Card from 'components/Common/Card';
import { CoursesType } from 'types/course.type';
import useWindowSize from 'hooks/useWidowsSize';

type SliderType = { courses: CoursesType[]; title: string };
const Slider: React.FC<SliderType> = ({ courses, title }) => {
  const [size] = useWindowSize();
  const data = size >= 1280 ? courses.slice(0, 7) : courses.slice(0, 5);
  return (
    <div className="bg-blue-11 w-full md:my-[50px] center flex-col pb-[60px]">
      <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
        {t(`landing.${title}`)}
      </h2>
      <div className="flex-wrap center w-[320px] md:w-[900px] xl:w-[1300px] ">
        {data.map((item) => (
          <div key={item.id} className="md:scale-[.85] md:m-[-24px] xl:scale-100 xl:m-0">
            <Card course={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
