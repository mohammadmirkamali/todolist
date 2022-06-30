import { CheckCircleFilled } from '@ant-design/icons';
import ProgressCard from 'components/Common/ProgressCard';
import { t } from 'i18next';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { LessonRoute } from 'services/routes';
import { calcTime, ellipsisText, faNumber } from 'utils/common.util';
import { calculateWeeks, mapTermData } from 'utils/term.util';
import { SCard, SCardItem } from './style';

type ScheduleType = { data: any; days: number[]; hourPerWeek: number }; // eslint-disable-line
const Schedule: React.FC<ScheduleType> = ({ data, days, hourPerWeek }) => {
  const user = useSelector((state) => state.account.user);
  const searchData = useSelector((state) => state.course.searchData);
  const newData = mapTermData(data?.items, user?.workshops, searchData?.workshops);
  const allWeeks = calculateWeeks(newData, days, hourPerWeek); // final data that keep weeks and lesson of each day in week
  const courses = [...new Set(data?.items.map((k) => k.workshop_id))].map((id) =>
    searchData?.workshops.find((item) => item.id === id),
  );
  return (
    <div className="xl:pr-[370px] w-screen mt-[20px] md:mt-0 md:w-[700px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
      <div className="flex flex-wrap center mb-[32px]">
        {courses.map((item) => (
          <ProgressCard key={item?.id} course={item} />
        ))}
      </div>

      {allWeeks.map((week, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SCard title={`${t('global.week')} ${faNumber(index + 1)}`} key={index}>
          {week?.data?.map((day) => (
            <div className="grid text-[15px]" key={day.title}>
              <div className="flex">
                <SCardItem hoverable={false} index={0}>
                  {t(`global.weekDay${day.title}`)}
                </SCardItem>
                <SCardItem hoverable={false} index={1}>
                  {calcTime(day.total)}
                </SCardItem>
                {day.data.map((lesson) => (
                  <Link
                    key={lesson.title}
                    href={LessonRoute(lesson.id, lesson.lessonId, lesson.lessonTitle)}
                  >
                    <a>
                      <SCardItem>
                        {lesson.passed && (
                          <div className="text-green-5 absolute right-2 text-[20px] ml-[8px] my-auto">
                            <CheckCircleFilled />
                          </div>
                        )}
                        <div className="flex flex-col justify-start">
                          <div className="text-[16px]">
                            {ellipsisText(lesson.title, 27)}
                          </div>
                          <div className="text-[13px]">
                            {faNumber(lesson.lessonIndex)}.
                            {ellipsisText(lesson.lessonTitle, 26)}
                          </div>
                        </div>
                      </SCardItem>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </SCard>
      ))}
    </div>
  );
};

export default Schedule;
