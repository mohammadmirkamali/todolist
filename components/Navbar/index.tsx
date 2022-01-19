import { LogoutOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';

import { getCoursesAction } from 'store/main/main.action';
import { SDiv } from 'components/Common/commonStyle';
import { SExit, SNav, SUser } from './style';
import { useScroll } from 'hooks/useScroll';
import AntSearch from './AntSearch';

const items = [
  { name: 'home', tab: '/' },
  { name: 'posts', tab: '/posts' },
  { name: 'finance', tab: 'https://idpay.ir/taaleei' },
  { name: 'conditions', tab: '/conditions' },
  { name: 'contactUs', tab: '/contact-us' },
];

const Navbar: React.FC = () => {
  const courses = useSelector((state) => state.main.courses);
  const [visible, setVisible] = useState(false);
  const scrollDirection = useScroll();
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
          className={`${style} cursor-pointer ${
            item.tab === tab ? 'text-blue-1' : 'text-gray-3'
          } hover:text-[#000]`}
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
    <div className="relative  ">
      <SNav
        className="border-b border-b-gray-1"
        isDown={scrollDirection === 'down' ? 1 : 0}
      >
        <Drawer
          closeIcon={<CloseOutlined className="text-[25px] m-[10px]" />}
          onClose={(): void => setVisible(false)}
          headerStyle={{ border: 'none' }}
          title={DrawerTitle}
          visible={visible}
          width={330}
        >
          {tabs('p-5 border-t border-t-gray-4 w-[190px] first:border-none text-[18px]')}
          <SUser className=" text-[30px] mt-[10px]">{t('global.profile')}</SUser>
          <LogoutOutlined className="text-[20px] px-[130px] pt-[15px]" />
        </Drawer>

        <div className="absolute right-[40px] flex">
          <div className="border-l-2 border-l-gray-1 items-center hidden lg:flex">
            <SUser className=" text-[30px] cursor-pointer">{t('global.profile')}</SUser>
            <SExit title={t('global.exit')}>
              <LogoutOutlined className="text-[20px] px-[20px] cursor-pointer " />
            </SExit>
          </div>
          <div className="text-[25px] pl-[10px] pt-[5px] lg:hidden">
            <MenuOutlined onClick={(): void => setVisible(true)} />
          </div>

          <AntSearch
            options={courses?.map((item) => ({ name: item.workshop_title, id: item.id }))}
          />
        </div>

        <SDiv className="text-[20px] hidden lg:flex">{tabs('mx-[18px]')}</SDiv>

        <div className="absolute left-[40px]">
          <Image src="/main-logo.webp" width={120} height={60} priority />
        </div>
      </SNav>
    </div>
  );
};

export default Navbar;
