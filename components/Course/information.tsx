import { ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import { Rate } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { ChapterDataType, CourseType, TopRateType } from 'types/course.type';
import { UserType } from 'types/account.type';
import { faNumber } from 'utils/common.util';
import { SButton } from './style';
import AntTooltip from 'components/Common/AntTooltip';
import TeacherAvatar from 'components/Common/TeacherAvatar';

const RateStudents: React.FC<{ data: TopRateType[] }> = ({ data }) => (
  <div className="py-[7px] flex text-[16px] flex-col pr-[15px] overflow-hidden w-[90%]">
    <p className="m-0">{t('course.rateStudents')}</p>
    <ScrollContainer className="flex">
      {data.map((item) => (
        <div
          key={item.id}
          className=" flex flex-col ml-[30px] items-center max-w-[100px] text-[14px] shrink-0 text-center"
        >
          <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
            <Image src={item.avatar} width={40} height={40} alt="" />
          </div>

          <div className="toRight">
            <AntTooltip name={item.nickname} length={13}>
              {item.nickname}
            </AntTooltip>

            <div className="text-[12px]">
              ( {faNumber(item.total_rate)} <StarFilled className="translate-y-[-2px] " />{' '}
              )
            </div>
          </div>
        </div>
      ))}
    </ScrollContainer>
  </div>
);

type InfoType = { data: ChapterDataType; course: CourseType; user: UserType };
const Information: React.FC<InfoType> = ({ course, user, data }) => (
  <div className="text-[18px] pr-[30px] text-gray-10">
    <TeacherAvatar
      name={course.teacher_name}
      title={course.teacher_title}
      img={course.teacher_avatar}
    />

    <div className="py-[7px] flex items-center text-[16px]">
      <ClockCircleOutlined className="text-[20px] pr-[10px]" />
      <div className="px-[20px] toRight">
        {faNumber(course.workshop_time.replaceAll(':', ' : '))}
      </div>
      <div>{t('global.hour')}</div>
    </div>

    <div className="py-[7px] text-[16px] flex items-center">
      <i className="fas fa-user-graduate pr-[10px] text-[20px]" />
      <div className="pr-[20px] pl-[16px]">
        {faNumber(course.count_students.toLocaleString())}
      </div>
      <div>{t('course.students')}</div>
    </div>

    <div className="py-[7px] text-[16px] flex items-center pr-[6px]">
      <Image src="/book.webp" width={30} height={30} alt="" />
      <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
      <div>{t('global.course')}</div>
    </div>

    {!user && (
      <div className="py-[7px] text-[16px] flex items-center">
        <i className="fas fa-money-bill-wave text-[18px] pr-[12px]" />
        <div className="px-[20px] toLeft">
          {course.workshop_price
            ? `${faNumber(course.workshop_price / 1000)} ${t('global.tooman')}`
            : t('global.free')}
        </div>
      </div>
    )}

    <div className="py-[7px] text-[16px] flex items-center pr-[15px]">
      <Rate value={course.rates_avg} allowHalf />
      <div className="px-[15px] toRight">
        {`( ${t('global.person')} ${faNumber(course.count_rates.toLocaleString())} ) `}
      </div>
    </div>

    {data?.topRate?.length ? <RateStudents data={data.topRate} /> : null}
    {data?.userRate?.length ? <RateStudents data={data.userRate} /> : null}

    {!user && <SButton>{t('global.register')}</SButton>}
  </div>
);

export default Information;
