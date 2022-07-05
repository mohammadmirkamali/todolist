import { Avatar, Select, Tag } from 'antd';
import AntButton from 'components/Common/AntButton';
import LoadingBox from 'components/Common/LoadingBox';
import LoginLayout from 'components/Common/LoginLayout';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTermHourAction, getTermAction } from 'store/course/course.action';
import { faNumber } from 'utils/common.util';

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

type InfoType = {
  data: any; // eslint-disable-line
  setHourPerWeek: (item) => void;
  hourPerWeek: number;
  setDays: (item) => void;
  days: number[];
};
const Information: React.FC<InfoType> = (props) => {
  const { data, setHourPerWeek, hourPerWeek, setDays, days } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { termId } = router.query;
  const [loading, setLoading] = useState(false);

  const error = useSelector((state) => state.course.termError);
  const saveLoading = useSelector((state) => state.course.changeTermLoading);
  const hours = data?.group_type === 2 ? SABEQ_HOURS : ABRAR_HOURS;
  const hasChange =
    hourPerWeek !== data?.week_hours ||
    JSON.stringify(days) !== JSON.stringify(data?.available_days);
  const reloadData = (): void => {
    dispatch(getTermAction(termId));
  };
  return (
    <div className="w-screen mb-[20px] flex p-[30px] flex-col rounded-[8px] xl:rounded mt-[40px] xl:mt-0 xl:mb-0 h-[600px] md:w-[700px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
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
          className="w-[290px] mt-[20px]"
          loading={saveLoading}
          disabled={!hasChange}
          onClick={(): void => {
            dispatch(changeTermHourAction(data.id, hourPerWeek, days));
          }}
        >
          {data?.registered && t('global.save')}
        </AntButton>
        <LoginLayout data={data} setLoading={setLoading}>
          <AntButton className="w-[290px] mt-[20px]" loading={loading}>
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
  );
};

export default Information;
