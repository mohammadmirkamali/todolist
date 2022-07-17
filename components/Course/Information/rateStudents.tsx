import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import AntTooltip from 'components/Common/AntTooltip';
import { t } from 'i18next';
import ScrollContainer from 'react-indiana-drag-scroll';
import React from 'react';
import { TopRateType } from 'types/course.type';
import { faNumber } from 'utils/common.util';

const RateStudents: React.FC<{ data: TopRateType[]; top?: boolean }> = ({
  data,
  top,
}) => (
  <div className="py-[7px] flex text-[16px] flex-col pr-[15px] overflow-hidden w-full">
    <p className="m-0 mb-[8px]">{t(`course.${top ? 'rateStudents' : 'yourRate'}`)}</p>
    <ScrollContainer className="flex">
      {data.map((item) => (
        <div
          key={item.id}
          className=" flex flex-col ml-[30px] items-center max-w-[100px] text-[14px] shrink-0 text-center"
        >
          {item.avatar ? (
            <Avatar src={item.avatar} alt="avatar" />
          ) : (
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          )}

          <div className="toRight">
            <AntTooltip name={item.nickname || ''} length={12}>
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

export default RateStudents;
