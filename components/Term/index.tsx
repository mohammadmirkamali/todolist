import styled from '@emotion/styled';
import { Card, Select, Skeleton, Tag } from 'antd';
import AntButton from 'components/Common/AntButton';
import LoadingBox from 'components/Common/LoadingBox';
import LoginLayout from 'components/Common/LoginLayout';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LessonRoute } from 'services/routes';
import { getTermAction } from 'store/course/course.action';
import { PageTermType, TermItemType } from 'types/course.type';
import { calcTime, faNumber } from 'utils/common.util';

const { Option } = Select;
const HOURS = [8, 9, 10, 11, 12];
const options = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
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

const Term: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { termId } = router.query;
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.course.termError);
  const data = useSelector((state) => state.course.term);
  const user = useSelector((state) => state.account.user);
  const [hourPerWeek, setHourPerWeek] = useState(12);
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]);
  const allWeeks = []; // final data that keep weeks and lesson of each day in week

  if (data?.term.items && !!days.length) {
    const lessons: TermItemType[] = [...data.term.items]; // all lessons
    const dailySecond = Number(((hourPerWeek * 3600) / (days.length || 1)).toFixed(0)); // time of each day in second

    while (lessons.length > 0) {
      const week = [];
      days
        .sort((a, b) => a - b)
        .forEach((day, index) => {
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

          week.push({
            total: dayTime,
            title: day,
            data: dayLessons,
          });
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
        style={{ marginRight: 3, fontSize: 16 }}
      >
        {label}
      </Tag>
    );
  };

  const reloadData = (): void => {
    dispatch(getTermAction(termId));
  };
  return (
    <div className="duration-300 bg-gray-0 min-h-[calc(100vh-70px)] flex-col flex items-center justify-items-start">
      <div className="w-screen mb-[20px] flex p-[30px] flex-col rounded-[8px] xl:rounded mt-[40px] xl:mt-0 xl:mb-0 h-[450px] md:w-[700px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={!!data} error={error} reload={reloadData}>
          <h2 className="mx-[30px] text-[20px] mb-[30px] self-center text-right font-bold">
            {data?.term.title}
          </h2>

          <div className="flex text-[16px] mb-[12px]">
            <div className="ml-[8px]">{t('term.start')} : </div>
            <div>{faNumber(data?.term.start.split(' ')[0])}</div>
          </div>
          <div className="flex text-[16px] mb-[30px]">
            <div className="ml-[8px]">{t('term.end')} : </div>
            <div>{faNumber(data?.term.end.split(' ')[0])}</div>
          </div>

          {!data?.registered && (
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
          )}

          {!data?.registered && (
            <div className="text-[16px] mt-[30px]">
              <div className="ml-[8px] mb-[8px]">{t('term.weekDays')} : </div>
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                onChange={setDays}
                notFoundContent={t('global.noData')}
                defaultValue={[0, 1, 2, 3, 4, 5, 6]}
                style={{ width: 285, fontSize: 17 }}
                options={options}
              />
            </div>
          )}

          <LoginLayout data={data} setLoading={setLoading}>
            <AntButton className="w-full mt-[20px]" loading={loading}>
              {!data?.registered && (
                <>
                  {t('global.register')}{' '}
                  <span className="mr-[30px]">
                    {Number(data?.price) !== 0
                      ? faNumber(Number(data?.price) / 1000) + t('global.tooman')
                      : t('global.free')}
                  </span>
                </>
              )}
            </AntButton>
          </LoginLayout>
        </LoadingBox>
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
