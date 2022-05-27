import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';
import { parseCookies } from 'nookies';

import { getCoursesAction } from 'store/course/course.action';
import { getAllWebinarAction, getUserAction } from 'store/account/account.action';
import Login from 'components/Account/login';
import { SNav } from './style';
import * as url from 'services/routes';
import AntSearch from './AntSearch';
import { generateOptions } from 'utils/common.util';
import { CoursesType } from 'types/course.type';
import Profile from './profile';

const items = [
  { name: 'home', tab: '/' },
  { name: 'posts', tab: url.PostsRoute() },
  { name: 'conditions', tab: url.ConditionRoute() },
  { name: 'contactUs', tab: url.ContactUsRoute() },
];

const Navbar: React.FC<{ data?: CoursesType[] }> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab] = useState(router.route);
  const [searching, setSearching] = useState(false);
  const courses = useSelector((state) => state.course.courses) || data;
  const webinars = useSelector((state) => state.account.webinars);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const user = useSelector((state) => state.account.user);
  const token = parseCookies()?.taalei;

  useEffect(() => {
    token && !user && dispatch(getUserAction());
  }, [token]);

  useEffect(() => {
    !courses && dispatch(getCoursesAction());
    !webinars && dispatch(getAllWebinarAction());
  }, [courses, webinars]);

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
    <SNav className="border-b border-b-gray-1 justify-center md:justify-start xl:justify-center">
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
          <div className="mt-[16px]">
            <Profile setIsModalVisible={setIsModalVisible} />
          </div>
        </div>
      </Drawer>

      <div className="md:flex md:absolute right-[20px]">
        <div className="text-[25px] mr-[50px] md:ml-[30px] md:mr-0 translate-y-[18px] md:translate-y-0 xl:hidden">
          <MenuOutlined onClick={(): void => setIsDrawerVisible(true)} />
        </div>

        <div className="md:border-l-2 border-l-gray-1 items-center hidden xl:flex pl-[20px]">
          <Profile setIsModalVisible={setIsModalVisible} />
        </div>

        <AntSearch
          setSearching={setSearching}
          options={generateOptions(courses, webinars)}
        />
      </div>

      {!searching && (
        <div className="text-[20px] hidden xl:flex">
          {tabs('mx-[18px] cursor-pointer hover:text-[#000}')}
        </div>
      )}

      <Link href={url.HomeRoute()}>
        <a className="absolute left-[10px] md:left-[40px] cursor-pointer">
          <Image src="/main-logo.webp" width={120} height={60} priority alt="" />
        </a>
      </Link>

      <Login isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </SNav>
  );
};

export default Navbar;
