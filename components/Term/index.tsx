import styled from '@emotion/styled';
import { Card, Select, Skeleton, Tag } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { LessonRoute } from 'services/routes';
import { TermItemType, TermType } from 'types/course.type';
import { calcTime, faNumber } from 'utils/common.util';

const { Option } = Select;
const HOURS = [8, 9, 10, 11, 12];
const DAYS = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  value: day,
  label: t(`global.weekDay${day}`),
}));

const SCard = styled(Card)<{ index?: number }>`
  overflow: auto;
  margin-bottom: 40px;
  border-radius: 12px;
  .ant-card-head {
    font-weight: bold;
  }
  .ant-card-body {
    padding: 0;
  }
`;

const SCardItem = styled(Card.Grid)<{ index?: number }>`
  width: ${({ index }): string => (index === 0 || index === 1 ? '120px' : '250px')};
  cursor: ${({ index }): string => !(index === 0 || index === 1) && 'pointer'};
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: initial;
`;

const Term: React.FC<{ data: TermType }> = ({ data }) => {
  const [hourPerWeek, setHourPerWeek] = useState(11);
  const [days, setDays] = useState([0, 1, 2]);
  const allWeeks = []; // final data that keep weeks and lesson of each day in week

  if (data?.items && !!days.length) {
    const lessons: TermItemType[] = [...data.items]; // all lessons
    const dailySecond = Number(((hourPerWeek * 3600) / (days.length || 1)).toFixed(0)); // time of each day in second

    while (lessons.length > 0) {
      const week = [];
      days.forEach((day, index) => {
        const dayLessons = [];
        let dayTime = 0;
        const endTime =
          index === days.length - 1
            ? hourPerWeek * 3600 - week.reduce((a, b) => a + b.total, 0)
            : dailySecond;
        while (dayTime < endTime && !!lessons.length) {
          const bb = lessons.shift();
          dayLessons.push(bb);
          dayTime += bb.time;
        }

        week.push({ total: dayTime, title: day, data: dayLessons });
      });

      allWeeks.push({ total: week.reduce((a, b) => a + b.total, 0), data: week });
    }
  }

  const tagRender = (props): ReactElement => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event): void => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, fontSize: 14 }}
      >
        {t(`global.weekDay${label}`)}
      </Tag>
    );
  };

  return (
    <div className="duration-300 bg-gray-0 min-h-[calc(100vh-70px)] flex-col flex items-center justify-items-start">
      <div className="w-screen mb-[20px] flex p-[30px] flex-col rounded-[8px] xl:rounded mt-[40px] xl:mt-0 xl:mb-0 h-[400px] md:w-[700px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <h2 className="mx-[30px] text-[20px] mb-[30px] self-center text-right font-bold">
          {data?.title}
        </h2>

        <div className="flex text-[16px] mb-[12px]">
          <div className="ml-[8px]">{t('term.start')} : </div>
          <div>{faNumber(data?.start.split(' ')[0])}</div>
        </div>
        <div className="flex text-[16px] mb-[30px]">
          <div className="ml-[8px]">{t('term.end')} : </div>
          <div>{faNumber(data?.end.split(' ')[0])}</div>
        </div>

        <div className="text-[16px]">
          <div className="ml-[8px] mb-[8px]">{t('term.weekHours')} : </div>
          <Select
            style={{ width: 120, fontSize: 17 }}
            onChange={setHourPerWeek}
            defaultValue={hourPerWeek}
          >
            {HOURS.map((item) => (
              <Option value={item} key={item} style={{ fontSize: 16 }}>
                {faNumber(item)}
              </Option>
            ))}
          </Select>
        </div>

        <div className="text-[16px] mt-[30px]">
          <div className="ml-[8px] mb-[8px]">{t('term.weekDays')} : </div>
          <Select
            mode="multiple"
            style={{ width: 250, fontSize: 17 }}
            onChange={setDays}
            tagRender={tagRender}
            value={days}
            notFoundContent={t('global.noData')}
            options={DAYS.filter((item) => !days.includes(item.value))}
          />
        </div>
      </div>

      {data ? (
        <div className="xl:pr-[370px] w-screen mt-[20px] md:mt-0 md:w-[700px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
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
                        href={LessonRoute(
                          lesson.workshop_id,
                          lesson.lesson_id,
                          lesson.title,
                        )}
                      >
                        <a>
                          <SCardItem>{lesson.title}</SCardItem>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </SCard>
          ))}
        </div>
      ) : (
        <Skeleton active className="p-[50px] pr-[400px]" />
      )}
    </div>
  );
};

export default Term;
