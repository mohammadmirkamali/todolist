import { ClockCircleOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CourseUrl } from 'store/main/main.service';
import { CourseType } from 'types/main.type';
import { BadgeCategory, faNumber } from 'utils/common.util';
import { SBadge, SContainer } from './style';

const Card: React.FC<{ course: CourseType }> = ({ course }) => {
  const badge = BadgeCategory(course.category_name);
  const time = (course.workshop_time_to_min / 60).toFixed(0);

  return (
    <Link href={CourseUrl(course.id)}>
      <SContainer className="w-[300px] h-[310px] bg-white border border-gray-5 cursor-pointer relative rounded-[6px] m-[10px]">
        {badge && <SBadge text={badge.name} color={badge.color} placement="start" />}

        <div className="bg-gray-7 absolute top-0 h-full w-full z-10 rounded-[6px] enter">
          <div className="text-white absolute bottom-[60px] text-center w-full text-[25px] text-bold register">
            {t('global.register')}
          </div>
        </div>

        <div className="h-[160px] overflow-hidden rounded-tl-[6px] rounded-tr-[6px]">
          <Image
            src={course.workshop_img}
            width={300}
            height={170}
            className="img  mt-[-20px]"
          />
        </div>

        <div className="h-[130px] flex justify-center flex-col">
          <h2 className="mx-[30px] text-[18px] font-bold">{course.workshop_title}</h2>

          <div className="flex items-center mr-[30px] mt-[6px] text-[16px]">
            <Image
              src={course.teacher_avatar}
              width={27}
              height={27}
              className="rounded-full"
            />
            <div className="mr-[8px]">{course.teacher_name}</div>
          </div>
        </div>

        <div className="absolute bottom-[4px] text-gray-6 text-[12px] flex right-[28px] ">
          <ClockCircleOutlined className="text-[14px] ml-[6px] " />
          <div className="ml-[17px]">{`${faNumber(time)} ${t('global.hour')}`}</div>

          <i className="fas fa-user-graduate ml-[6px]" />
          <div className="ml-[17px]">{`${faNumber(
            course.count_students.toLocaleString(),
          )} ${t('global.person')}`}</div>

          <i className="fas fa-money-bill-wave ml-[6px] mt-[3px]" />
          <div>
            {course.workshop_price
              ? `${faNumber(course.workshop_price / 1000)} ${t('global.tooman')}`
              : t('global.free')}
          </div>
        </div>
      </SContainer>
    </Link>
  );
};

export default Card;
