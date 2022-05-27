import { ClockCircleOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CourseRoute, WebinarRoute } from 'services/routes';
import { CoursesType, WebinarsType } from 'types/course.type';
import { BadgeCategory, faNumber } from 'utils/common.util';
import { SBadge, SContainer } from './style';

type CardType = { data: CoursesType | WebinarsType; webinar?: boolean };
const Card: React.FC<CardType> = ({ data, webinar }) => {
  const badge = BadgeCategory(
    webinar ? t('global.event') : (data as CoursesType).categories?.[0]?.title,
  );
  const time = ((data as CoursesType).time / 3600).toFixed(0);
  const href = webinar
    ? WebinarRoute(data.id, data.title)
    : CourseRoute(data?.id, data?.title);

  return (
    <Link href={href}>
      <a>
        <SContainer className="w-[300px] h-[310px] bg-white border border-gray-5 cursor-pointer relative rounded-[6px] m-[10px]">
          {badge && <SBadge text={badge.name} color={badge.color} placement="start" />}

          <div className="bg-gray-7 absolute top-0 h-full w-full z-10 rounded-[6px] enter">
            <div className="text-white absolute bottom-[60px] text-center w-full text-[25px] text-bold register">
              {t('global.register')}
            </div>
          </div>

          <div className="h-[160px] overflow-hidden rounded-tl-[6px] rounded-tr-[6px]">
            <Image
              src={data[webinar ? 'image' : 'thumb']}
              width={300}
              height={170}
              alt={data.title}
              className="img  mt-[-20px]"
            />
          </div>

          <div className="h-[130px] flex justify-center flex-col">
            <h2 className="mx-[30px] text-[18px] text-right font-bold">{data.title}</h2>

            <div className="flex items-center mr-[30px] mt-[6px] text-[16px]">
              <Image
                src={data.teachers[0].avatar}
                width={27}
                height={27}
                alt={data.teachers[0].nickname}
                className="rounded-full"
              />
              <div className="mr-[8px] text-gray-3">{data.teachers[0].nickname}</div>
            </div>
          </div>

          <div className="absolute bottom-[4px] text-gray-6 text-[12px] flex right-[28px] ">
            {!webinar && <ClockCircleOutlined className="text-[14px] ml-[6px] " />}
            {!webinar && (
              <div className="ml-[17px]">{`${faNumber(time)} ${t('global.hour')}`}</div>
            )}

            <i className="fas fa-user-graduate ml-[6px]" />
            <div className="ml-[17px]">{`${faNumber(
              (Number(data.price) / 1000).toLocaleString(),
            )} ${t('global.person')}`}</div>

            <i className="fas fa-money-bill-wave ml-[6px] mt-[3px]" />
            <div>
              {Number(data.price)
                ? `${faNumber(Number(data.price) / 1000)} ${t('global.tooman')}`
                : t('global.free')}
            </div>
          </div>
        </SContainer>
      </a>
    </Link>
  );
};

export default Card;
