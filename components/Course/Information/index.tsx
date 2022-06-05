import { ClockCircleOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseType } from 'types/course.type';
import { calcTime, faNumber } from 'utils/common.util';
import TeacherAvatar from 'components/Common/TeacherAvatar';
import { SButton } from 'components/Course/style';
import RateStudents from './rateStudents';
import LoginLayout from 'components/Common/LoginLayout';

type InfoType = { course: CourseType };
const Information: React.FC<InfoType> = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.account.user);
  const [rate, setRate] = useState(null);
  const categories = course.categories.map((item) => item.title.replace(/ /g, '_'));

  useEffect(() => {
    if (user && course.registered && rate) {
      // todo: ...
    }
  }, [user, course, rate]);

  return (
    <div className="text-[18px] px-[30px] flex flex-col text-gray-10">
      {course.teachers.map((teacher) => (
        <TeacherAvatar
          key={teacher.nickname}
          name={teacher.nickname}
          title={t('global.teacher')}
          img={teacher.avatar}
        />
      ))}

      <div className="py-[7px] flex items-center text-[16px]">
        <ClockCircleOutlined className="text-[20px] pr-[10px]" />
        <div className="px-[20px] toRight">{calcTime(course.time)}</div>
        <div>{t('global.hour')}</div>
      </div>

      <div className="py-[7px] text-[16px] flex items-center">
        <i className="fas fa-user-graduate pr-[10px] text-[20px]" />
        <div className="pr-[20px] pl-[16px]">
          {faNumber(course.students_count.toLocaleString())}
        </div>
        <div>{t('course.students')}</div>
      </div>

      <div className="py-[7px] text-[16px] flex items-center pr-[6px]">
        <Image src="/book.webp" width={30} height={30} alt="" />
        <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
        <div>{t('global.course')}</div>
      </div>

      <LoginLayout data={course}>
        <div className="py-[7px] text-[16px] flex items-center pr-[15px]">
          <Rate value={course.rate} onChange={(value): void => setRate(value)} />
          <div className="px-[15px] toRight">
            {`( ${t('global.person')} ${faNumber((2).toLocaleString())} ) `}
          </div>
        </div>
      </LoginLayout>

      {!!categories.length && (
        <div className="py-[7px] text-[16px] flex items-center pr-[15px]">
          <div className="text-[16px]">{t('global.tag')}:</div>
          <div className="pr-[10px] pl-[8px]">
            {categories.map((item) => (
              <span key={item}>#{item} </span>
            ))}
          </div>
        </div>
      )}

      {course?.top_users?.length ? <RateStudents data={course?.top_users} top /> : null}
      {user && course?.user_rate?.length ? (
        <RateStudents data={course?.user_rate} />
      ) : null}

      <div className="center">
        {(!course.registered || !user) && (
          <LoginLayout data={course} setLoading={setLoading}>
            <SButton loading={loading} className="toLeft">
              {t('global.register')}
              <span className="text-[16px] mr-[10px]">
                (
                {course.price
                  ? `${faNumber(course.price / 1000)} ${t('global.tooman')}`
                  : t('global.free')}
                )
              </span>
            </SButton>
          </LoginLayout>
        )}
      </div>
    </div>
  );
};

export default Information;
