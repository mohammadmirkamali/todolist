import {
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  StarFilled,
} from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Avatar, Drawer, Tooltip } from 'antd';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';

import { getCoursesAction } from 'store/course/course.action';
import { getUserAction, logoutAction } from 'store/account/account.action';
import Login from 'components/Account/login';
import { SButton, SExit, SNav } from './style';
import * as url from 'services/routes';
import AntSearch from './AntSearch';
import { faNumber } from 'utils/common.util';

const items = [
  { name: 'home', tab: '/' },
  { name: 'posts', tab: url.PostsRoute() },
  { name: 'webinar', tab: url.WebinarRoute() },
  { name: 'conditions', tab: url.ConditionRoute() },
  { name: 'contactUs', tab: url.ContactUsRoute() },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab] = useState(router.route);
  const [searching, setSearching] = useState(false);
  const courses = useSelector((state) => state.course.courses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    const token = parseCookies().taalei;
    token && !user && dispatch(getUserAction());
    !courses && dispatch(getCoursesAction());
  }, [courses, user]);

  const tabs = (style): ReactElement[] =>
    items.map((item) => (
      <Link href={item.tab} key={item.tab} passHref>
        <a
          className={`${style} ${
            item.tab === tab ? 'text-blue-1' : 'text-gray-3'
          } hover:text-black `}
        >
          {t(`navbar.${item.name}`)}
        </a>
      </Link>
    ));

  const DrawerTitle = (
    <Link href={url.HomeRoute()}>
      <a className="absolute left-[30px] top-[15px]">
        <Image src="/main-logo.webp" width={80} height={40} alt="" />
      </a>
    </Link>
  );

  return (
    <div className="relative">
      <SNav className="border-b border-b-gray-1">
        <Drawer
          closeIcon={<CloseOutlined className="text-[25px] m-[10px]" />}
          onClose={(): void => setIsDrawerVisible(false)}
          headerStyle={{ border: 'none' }}
          title={DrawerTitle}
          visible={isDrawerVisible}
          width={330}
        >
          <div className="flex flex-col">
            {tabs('p-5 border-t border-t-gray-4 w-[190px] first:border-none text-[18px]')}
          </div>
        </Drawer>

        <div className="absolute right-[40px] flex">
          <div className="text-[25px] pl-[10px] ml-[10px] md:pt-[4px] xl:hidden">
            <MenuOutlined onClick={(): void => setIsDrawerVisible(true)} />
          </div>

          <div className="md:border-l-2 border-l-gray-1 text-gray-3 items-center flex pl-[20px]">
            {!user ? (
              <SButton onClick={(): void => setIsModalVisible(true)}>
                <p>{t(`account.signIn`)}</p>
              </SButton>
            ) : (
              <>
                <Link href={url.ProfileRoute('user')}>
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
              </>
            )}
          </div>

          <AntSearch
            setSearching={setSearching}
            options={courses?.map((item) => ({ name: item.workshop_title, id: item.id }))}
          />
        </div>

        {!searching && (
          <div className="text-[20px] hidden xl:flex">
            {tabs('mx-[18px] cursor-pointer hover:text-[#000}')}
          </div>
        )}

        <Link href={url.HomeRoute()} passHref>
          <a className="absolute left-[10px] md:left-[40px] cursor-pointer">
            <Image src="/main-logo.webp" width={120} height={60} priority alt="" />
          </a>
        </Link>

        <Login isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      </SNav>
    </div>
  );
};

export default Navbar;
