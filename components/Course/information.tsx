import { ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { ProfileRoute } from 'services/routes';
import { faNumber } from 'utils/common.util';
import { SButton } from './style';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Information = ({ course, profile }) => (
  <div className="text-[18px] pr-[30px] text-gray-10">
    <Link href={ProfileRoute(course.teacher_name.replaceAll(' ', '-'))} passHref>
      <a className="py-[30px] flex items-center cursor-pointer text-gray-10 hover:text-black duration-300">
        <Image
          src={course.teacher_avatar}
          width={60}
          height={60}
          priority
          alt={course.teacher_name}
          className="rounded-full"
        />
        <div className="mr-[10px] ">
          <div className="font-bold text-[20px]">{course.teacher_name}</div>
          <div className="text-[16px]">{course.teacher_title}</div>
        </div>
      </a>
    </Link>

    <div className="py-[10px] flex items-center">
      <ClockCircleOutlined className="text-[30px] pr-[10px]" />
      <div className="px-[20px] toRight">
        {faNumber(course.workshop_time.replaceAll(':', ' : '))}
      </div>
      <div>{t('global.hour')}</div>
    </div>

    <div className="py-[10px] flex items-center">
      <i className="fas fa-user-graduate pr-[10px] text-[30px]" />
      <div className="px-[20px] ">{faNumber(course.count_students.toLocaleString())}</div>
      <div>{t('course.students')}</div>
    </div>

    <div className="py-[7px] flex items-center">
      <Image src="/book.webp" width={50} height={50} alt="" />
      <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
      <div>{t('global.course')}</div>
    </div>

    {!profile && (
      <div className="py-[7px] flex items-center">
        <i className="fas fa-money-bill-wave text-[25px] pr-[15px]" />
        <div className="px-[20px] toLeft">
          {course.workshop_price
            ? `${faNumber(course.workshop_price / 1000)} ${t('global.tooman')}`
            : t('global.free')}
        </div>
      </div>
    )}

    <div className="py-[7px] flex items-center pr-[15px]">
      <Rate value={course.rates_avg} allowHalf />
      <div className="px-[15px] toRight">
        {`( ${t('global.person')} ${faNumber(course.count_rates.toLocaleString())} ) `}
      </div>
    </div>

    <div className="py-[7px] flex flex-col pr-[15px] overflow-hidden w-[90%]">
      <p className="m-0">{t('course.rateStudents')}</p>
      <ScrollContainer className="flex">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className=" flex flex-col ml-[30px] items-center max-w-[120px] text-[14px] shrink-0 text-center"
          >
            <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
            <div>
              علی{' '}
              <span className="text-[14px]">
                ( <StarFilled className="translate-y-[-2px] " />3 )
              </span>
            </div>
          </div>
        ))}
      </ScrollContainer>
    </div>

    {!profile && <SButton>{t('global.register')}</SButton>}
  </div>
);

export default Information;
