import { ClockCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Image from 'next/image';
import { t } from 'i18next';
import React from 'react';
import { Button, Rate } from 'antd';
import { CourseType } from 'types/account.type';
import { faNumber } from 'utils/common.util';

const SButton = styled(Button)`
  width: 240px;
  height: 40px;
  margin: 40px 0;
  border-radius: 8px;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const lessons = Array.from(Array(course.lessons_count), (_, i) => i + 1);

  return (
    <div className="bg-gray-0 pt-[110px] duration-300 md:pt-[70px] min-h-screen flex xl:block flex-col center">
      <div className=" w-[300px] md:w-[600px] xl:px-[370px] pt-[20px] xl:justify-self-start xl:w-full ">
        <div className="w-full bg-white border-b border-b-gray-1 xl:border-b-white rounded-[8px] ">
          <h2 className="h-[70px] center w-full font-bold text-[26px] m-[0px]">
            {course.workshop_title}
          </h2>
          <Image src={course.workshop_img} layout="responsive" width={530} height={300} />
          <p className="mx-[40px] my-[50px]  text-[18px]">
            {course.workshop_description}
          </p>
        </div>
      </div>

      <div className="w-[300px] border-b border-b-gray-1 md:w-[600px] xl:absolute left-0 top-[70px]  xl:w-[350px] xl:h-[calc(100vh-70px)] bg-white z-10">
        <div className="h-[70px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.info')}
        </div>

        <div className="text-[18px] pr-[30px]">
          <div className="py-[30px] flex items-center">
            <Image
              src={course.teacher_avatar}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="mr-[10px]">
              <div className="font-bold text-[20px]">{course.teacher_name}</div>
              <div className="text-[16px]">{course.teacher_title}</div>
            </div>
          </div>

          <div className="py-[10px] flex items-center">
            <ClockCircleOutlined className="text-[30px] pr-[10px]" />
            <div className="px-[20px] toRight">
              {faNumber(course.workshop_time.replaceAll(':', ' : '))}
            </div>
            <div>{t('global.hour')}</div>
          </div>

          <div className="py-[10px] flex items-center">
            <i className="fas fa-user-graduate pr-[10px] text-[30px]" />
            <div className="px-[20px] ">
              {faNumber(course.count_students.toLocaleString())}
            </div>
            <div>{t('course.students')}</div>
          </div>

          <div className="py-[7px] flex items-center">
            <Image src="/book.webp" width={50} height={50} />
            <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
            <div>{t('global.course')}</div>
          </div>

          <div className="py-[7px] flex items-center">
            <i className="fas fa-money-bill-wave text-[25px] pr-[15px]" />
            <div className="px-[20px] toRight">
              {course.workshop_price
                ? `${faNumber(course.workshop_price / 1000)} ${t('global.tooman')}`
                : t('global.free')}
            </div>
          </div>

          <div className="py-[7px] flex items-center pr-[15px]">
            <Rate value={course.count_rates} allowHalf />
            <div className="px-[15px] toRight">
              {`${faNumber(course.rates_avg)} ( ${t('global.person')} ${faNumber(
                course.count_rates.toLocaleString(),
              )} ) `}
            </div>
          </div>

          <SButton>{t('global.register')}</SButton>
        </div>
      </div>

      <div className="w-[300px] h-[470px] md:w-[600px]   xl:absolute right-0 top-[70px] bg-white xl:w-[350px] xl:h-[calc(100vh-70px)]">
        <div className="h-[70px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.lessons')}
        </div>
        <div className="overflow-auto h-[400px] xl:h-[90%] toRight">
          {lessons.map((item) => (
            <div
              key={item}
              className="text-[16px] px-[40px] cursor-pointer toLeft py-[20px] hover:bg-gray-4 duration-300"
            >
              {t('global.course')} {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
