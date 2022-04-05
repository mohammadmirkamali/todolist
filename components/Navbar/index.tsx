import {
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';

import { getCoursesAction } from 'store/course/course.action';
import { getUserAction, logoutAction } from 'store/account/account.action';
import Login from 'components/Account/login';
import { SButton, SExit, SNav } from './style';
import * as url from 'services/routes';
import AntSearch from './AntSearch';

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

  const handleClick = (): void => {
    user ? router.push(url.ProfileRoute('user')) : setIsModalVisible(true);
  };

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
            <SButton onClick={handleClick} className="mt-[20px]">
              {user && <UserOutlined />}
              <p>{t(`account.${user ? 'profile' : 'signIn'}`)}</p>
            </SButton>
            {user && <LogoutOutlined className="text-[20px] px-[130px] pt-[15px]" />}
          </div>
        </Drawer>

        <div className="absolute right-[40px] flex">
          <div className="border-l-2 border-l-gray-1 text-gray-3 items-center hidden xl:flex pl-[20px]">
            <SButton onClick={handleClick}>
              {user && <UserOutlined />}
              <p>{t(`account.${user ? 'profile' : 'signIn'}`)}</p>
            </SButton>
            {user && (
              <SExit title={t('global.exit')} placement="left">
                <LogoutOutlined
                  onClick={(): void => {
                    dispatch(logoutAction());
                  }}
                  className="text-[20px] pr-[20px] cursor-pointer "
                />
              </SExit>
            )}
          </div>

          <div className="text-[25px] pl-[10px] pt-[5px] xl:hidden">
            <MenuOutlined onClick={(): void => setIsDrawerVisible(true)} />
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
          <a className="absolute left-[40px] cursor-pointer">
            <Image src="/main-logo.webp" width={120} height={60} priority alt="" />
          </a>
        </Link>

        <Login isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      </SNav>
    </div>
  );
};

export default Navbar;
