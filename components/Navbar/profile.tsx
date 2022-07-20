import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeRoute, ProfileRoute } from 'services/routes';
import { logoutAction } from 'store/account/account.action';
import { CLEAR_STORE } from 'store/course/course.constants';
// import { faNumber } from 'utils/common.util';
import { SButton, SExit } from './style';

const Profile: React.FC<{ setIsModalVisible: (value) => void }> = ({
  setIsModalVisible,
}) => {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return !user ? (
    <SButton onClick={(): void => setIsModalVisible(true)}>
      <p>{t(`account.signIn`)}</p>
    </SButton>
  ) : (
    <div className="flex items-center text-gray-3 justify-center">
      <Link href={ProfileRoute('user', t('global.profile'))}>
        <a>
          <Tooltip title={t('global.seeProfile')} placement="bottom">
            {user.avatar ? (
              <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
                <Image src={user.avatar} width={40} height={40} alt="profile" />
              </div>
            ) : (
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
                size={40}
              />
            )}
          </Tooltip>
        </a>
      </Link>
      {/* <Tooltip title={t('global.star')}>
        <div className="text-[20px] center mr-[12px]">
          <StarFilled />
          <span className="text-[18px] mr-[6px] mt-[4px]">{faNumber(223)}</span>
        </div>
      </Tooltip> */}
      <SExit title={t('global.exit')} placement="bottom">
        <LogoutOutlined
          className="text-[20px] pr-[20px] cursor-pointer "
          onClick={async (): Promise<void> => {
            await router.push(HomeRoute()); // to not get error on logout on profile page
            dispatch({ type: CLEAR_STORE });
            dispatch(logoutAction());
          }}
        />
      </SExit>
    </div>
  );
};

export default Profile;
