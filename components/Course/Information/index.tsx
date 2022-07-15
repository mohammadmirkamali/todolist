import { ClockCircleOutlined } from '@ant-design/icons';
import { message, Progress, Rate, Spin } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseType } from 'types/course.type';
import { calcTime, faNumber } from 'utils/common.util';
import { SButton } from 'components/Course/style';
import RateStudents from './rateStudents';
import LoginLayout from 'components/Common/LoginLayout';
import request from 'services/request';
import { RateCourseUrl } from 'services/routes';
import { UPDATE_COURSE } from 'store/course/course.constants';
import TeacherLink from 'components/Common/TeacherLink';

type InfoType = { course: CourseType };
const Information: React.FC<InfoType> = ({ course }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.account.user);
  const [rate, setRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const categories = course.categories.map((item) => item.title.replace(/ /g, '_'));
  const allLessons = course.chapters.reduce((a, b) => a + b.lessons.length, 0);
  const passedLessons = course.passed_lessons?.length || 0;

  const handleRate = async (value): Promise<void> => {
    setRateLoading(true);
    setRate(value);
    if (value) {
      const res: any = await request.post(RateCourseUrl(course.id), { rate: value }); // eslint-disable-line
      setRateLoading(false);
      res.ok ? message.success(res.data.message) : message.error(res.data.message);
      dispatch({
        type: UPDATE_COURSE,
        filed: 'workshop_user_rate',
        id: course.id,
        rate: value,
      });
    }
  };

  return (
    <div className="text-[18px] px-[30px] flex flex-col text-gray-10">
      {course.teachers.map((teacher) => (
        <TeacherLink teacher={teacher} key={teacher.id} />
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

      {course.registered && (
        <div className="py-[7px] text-[16px] items-center pr-[6px]">
          <div>{t('course.progress')}:</div>
          <Progress
            strokeColor={{ from: '#108ee9', to: '#87d068' }}
            percent={Math.floor((passedLessons * 100) / allLessons)}
            status="active"
          />
        </div>
      )}

      <LoginLayout>
        <div className="py-[7px] text-[16px] flex items-center pr-[15px]">
          <Rate
            style={{ color: course.workshop_user_rate ? '#507adc' : 'gold' }}
            value={rate || course.workshop_user_rate || course.rate}
            onChange={handleRate}
          />
          {rateLoading ? (
            <Spin style={{ marginRight: 10 }} />
          ) : course.workshop_user_rate ? null : (
            <div className="px-[15px] toRight flex">
              <span className="mr-[4px]"> {`( ${t('global.person')}`}</span>
              <span>{`${faNumber(course.rate_count.toLocaleString())} )`}</span>
            </div>
          )}
        </div>
      </LoginLayout>

      {!!categories.length && (
        <div className="py-[7px] text-[16px] my-[10px] flex items-center pr-[15px]">
          <div className="text-[16px]">{t('global.tag')}:</div>
          <div className="pr-[10px] pl-[8px]">
            {categories.map((item) => (
              <span
                key={item}
                className="border border-gray-15 py-[6px] text-[14px] px-[12px] ml-[6px] text-[16px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {!!course?.top_users?.length && <RateStudents data={course?.top_users} top />}
      {user && !!course?.user_rate?.length && (
        <RateStudents data={course?.user_rate.slice(1, 4)} />
      )}

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
