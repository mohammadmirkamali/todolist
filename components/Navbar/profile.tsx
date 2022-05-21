import { LogoutOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileRoute } from 'services/routes';
import { logoutAction } from 'store/account/account.action';
import { faNumber } from 'utils/common.util';
import { SButton, SExit } from './style';

const Profile: React.FC<{ setIsModalVisible: (value) => void }> = ({
  setIsModalVisible,
}) => {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  return !user ? (
    <SButton onClick={(): void => setIsModalVisible(true)}>
      <p>{t(`account.signIn`)}</p>
    </SButton>
  ) : (
    <div className="flex items-center text-gray-3 justify-center">
      <Link href={ProfileRoute('user')}>
        <a>
          <Tooltip title={t('global.seeProfile')}>
            <Avatar icon={<UserOutlined />} size={40} />
          </Tooltip>
        </a>
      </Link>
      <Tooltip title={t('global.star')}>
        <div className="text-[20px] center mr-[12px]">
          <StarFilled />
          <span className="text-[18px] mr-[6px] mt-[4px]">{faNumber(223)}</span>
        </div>
      </Tooltip>
      <SExit title={t('global.exit')} placement="left">
        <LogoutOutlined
          onClick={(): void => {
            dispatch(logoutAction());
          }}
          className="text-[20px] pr-[20px] cursor-pointer "
        />
      </SExit>
    </div>
  );
};

export default Profile;
