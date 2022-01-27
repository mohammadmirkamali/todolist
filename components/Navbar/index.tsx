import { LogoutOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';

import { getCoursesAction } from 'store/account/account.action';
import { SDiv } from 'components/Common/commonStyle';
import { SExit, SNav, SUser } from './style';
import { useScroll } from 'hooks/useScroll';
import AntSearch from './AntSearch';
import Login from 'components/Account/Login/login';
import * as url from 'services/routes';

const items = [
  { name: 'home', tab: '/' },
  { name: 'posts', tab: url.PostsRoute() },
  { name: 'finance', tab: url.FinanceRoute() },
  { name: 'conditions', tab: url.ConditionRoute() },
  { name: 'contactUs', tab: url.ContactUsRoute() },
];

const Navbar: React.FC = () => {
  const courses = useSelector((state) => state.account.courses);
  const scrollDirection = useScroll();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [tab] = useState(router.route);

  useEffect(() => {
    !courses && dispatch(getCoursesAction());
  }, [courses]);

  const tabs = (style): ReactElement[] =>
    items.map((item) => (
      <Link href={item.tab} key={item.tab}>
        <div
          className={`${style} ${
            item.tab === tab ? 'text-blue-1' : 'text-gray-3'
          } hover:text-black`}
        >
          {t(`navbar.${item.name}`)}
        </div>
      </Link>
    ));

  const DrawerTitle = (
    <div className="absolute left-[40px] top-[15px]">
      <Image src="/main-logo.webp" width={80} height={40} />
    </div>
  );

  return (
    <div className="relative">
      <SNav
        className="border-b border-b-gray-1"
        isdown={scrollDirection === 'down' ? 1 : 0}
      >
        <Drawer
          closeIcon={<CloseOutlined className="text-[25px] m-[10px]" />}
          onClose={(): void => setIsDrawerVisible(false)}
          headerStyle={{ border: 'none' }}
          title={DrawerTitle}
          visible={isDrawerVisible}
          width={330}
        >
          {tabs('p-5 border-t border-t-gray-4 w-[190px] first:border-none text-[18px]')}
          <SUser className=" text-[30px] mt-[10px]">{t('global.profile')}</SUser>
          <LogoutOutlined className="text-[20px] px-[130px] pt-[15px]" />
        </Drawer>

        <div className="absolute right-[40px] flex">
          <div className="border-l-2 border-l-gray-1 items-center hidden lg:flex">
            <SUser
              onClick={(): void => setIsModalVisible(true)}
              className=" text-[30px] cursor-pointer"
            >
              {t('global.profile')}
            </SUser>
            <SExit title={t('global.exit')}>
              <LogoutOutlined className="text-[20px] px-[20px] cursor-pointer " />
            </SExit>
          </div>
          <div className="text-[25px] pl-[10px] pt-[5px] lg:hidden">
            <MenuOutlined onClick={(): void => setIsDrawerVisible(true)} />
          </div>

          <AntSearch
            options={courses?.map((item) => ({ name: item.workshop_title, id: item.id }))}
          />
        </div>

        <SDiv className="text-[20px] hidden lg:flex">
          {tabs('mx-[18px] cursor-pointer hover:text-[#000}')}
        </SDiv>

        <div className="absolute left-[40px] cursor-pointer">
          <Link href="/">
            <Image src="/main-logo.webp" width={120} height={60} priority />
          </Link>
        </div>

        <Login isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      </SNav>
    </div>
  );
};

export default Navbar;
