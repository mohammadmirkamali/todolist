import { CheckCircleFilled } from '@ant-design/icons';
import { Avatar, Select, Skeleton, Tag } from 'antd';
import AntButton from 'components/Common/AntButton';
import LoadingBox from 'components/Common/LoadingBox';
import LoginLayout from 'components/Common/LoginLayout';
import ProgressCard from 'components/Common/ProgressCard';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LessonRoute } from 'services/routes';
import { changeTermHourAction, getTermAction } from 'store/course/course.action';
import { calcTime, ellipsisText, faNumber } from 'utils/common.util';
import { calculateWeeks, mapTermData } from 'utils/term.util';
import { SCard, SCardItem } from './style';

const { Option } = Select;
const ABRAR_HOURS = [8, 9, 10, 11, 12];
const SABEQ_HOURS = [12, 13, 14, 15];

const options = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  value: day,
  label: t(`global.weekDay${day}`),
}));

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

const Term: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { termId } = router.query;
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.course.termError);
  const data = useSelector((state) => state.course.term);
  const saveLoading = useSelector((state) => state.course.changeTermLoading);
  const searchData = useSelector((state) => state.course.searchData);
  const hours = data?.group_type === 2 ? SABEQ_HOURS : ABRAR_HOURS;
  // const aaa = useSelector((state) => state.course);
  const user = useSelector((state) => state.account.user);
  const [hourPerWeek, setHourPerWeek] = useState(null);
  const [days, setDays] = useState(null);
  const hasChange =
    hourPerWeek !== data?.week_hours ||
    JSON.stringify(days) !== JSON.stringify(data?.available_days);
  const newData = mapTermData(data?.items, user?.workshops, searchData?.workshops);
  const allWeeks = calculateWeeks(newData, days, hourPerWeek); // final data that keep weeks and lesson of each day in week
  const courses = [...new Set(data?.items.map((k) => k.workshop_id))].map((id) =>
    searchData?.workshops.find((item) => item.id === id),
  );

  const onSave = (): void => {
    dispatch(changeTermHourAction(data.id, hourPerWeek, days));
  };

  useEffect(() => {
    data && setDays(data.available_days);
    data && setHourPerWeek(data.week_hours);
  }, [data]);

  const reloadData = (): void => {
    dispatch(getTermAction(termId));
  };
  return (
    <div className="duration-300 bg-gray-0 min-h-[calc(100vh-70px)] flex-col flex items-center justify-items-start">
      <div className="w-screen mb-[20px] flex p-[30px] flex-col rounded-[8px] xl:rounded mt-[40px] xl:mt-0 xl:mb-0 h-[450px] md:w-[700px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={!!data} error={error} reload={reloadData}>
          <h2 className="mx-[30px] text-[20px] mb-[30px] self-center text-right font-bold">
            {data?.title}
          </h2>

          <div className="flex text-[16px] mb-[12px]">
            <div className="ml-[8px]">{t('global.group')} : </div>
            <div>{t(`term.${data?.group_type === 2 ? 'sabeq' : 'abrar'}`)}</div>
          </div>
          {data?.supporter && (
            <div className="text-[16px] my-[16px]">
              <div className="ml-[8px]">{t('term.supporter')} : </div>
              <div className="flex text-[18px] mt-[4px]">
                <Avatar src={data?.supporter.avatar} />
                <div className="mr-[8px]">
                  {data?.supporter.nickName || data?.supporter.family} (
                  {faNumber(data?.supporter.mobile)})
                </div>
              </div>
            </div>
          )}
          <div className="flex text-[16px] mb-[12px]">
            <div className="ml-[8px]">{t('term.start')} : </div>
            <div>{faNumber(data?.start.split(' ')[0])}</div>
          </div>
          <div className="flex text-[16px] mb-[30px]">
            <div className="ml-[8px]">{t('term.end')} : </div>
            <div>{faNumber(data?.end.split(' ')[0])}</div>
          </div>

          {data?.registered && (
            <div className="text-[16px]">
              <div className="ml-[8px] mb-[8px]">{t('term.weekHours')} : </div>
              <Select
                style={{ width: 120, fontSize: 17 }}
                onChange={setHourPerWeek}
                value={hourPerWeek}
              >
                {hours.map((item) => (
                  <Option value={item} key={item} style={{ fontSize: 16 }}>
                    {faNumber(item)}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {data?.registered && (
            <div className="text-[16px] mt-[30px]">
              <div className="ml-[8px] mb-[8px]">{t('term.weekDays')} : </div>
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                onChange={setDays}
                notFoundContent={t('global.noData')}
                value={days}
                style={{ width: 285, fontSize: 17 }}
                options={options}
              />
            </div>
          )}

          <AntButton
            className="w-full mt-[20px]"
            loading={saveLoading}
            disabled={!hasChange}
            onClick={onSave}
          >
            {data?.registered && t('global.save')}
          </AntButton>
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

      {data && searchData ? (
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
      ) : (
        <Skeleton active className="p-[50px] pr-[400px]" />
      )}
    </div>
  );
};

export default Term;
