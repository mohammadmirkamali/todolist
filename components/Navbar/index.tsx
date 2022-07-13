import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { getSearchDataAction } from 'store/course/course.action';
import { getUserAction } from 'store/account/account.action';
import Login from 'components/Account/login';
import { SNav } from './style';
import * as url from 'services/routes';
import AntSearch from './AntSearch';
import { generateOptions } from 'utils/common.util';
import Profile from './profile';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.course.searchData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    !user && dispatch(getUserAction());
  }, []);

  useEffect(() => {
    !searchData && dispatch(getSearchDataAction());
  }, [searchData]);

  return (
    <SNav className="border-b hidden border-b-gray-1 justify-center">
      <Link href={url.HomeRoute()}>
        <a className="absolute right-[10px] md:right-[24px] cursor-pointer">
          <Image src="/main-logo.webp" width={120} height={60} priority alt="" />
        </a>
      </Link>

      <AntSearch options={generateOptions(searchData)} />

      <div className="items-center flex pl-[20px] absolute left-[10px] md:left-[24px]">
        <Profile setIsModalVisible={setIsModalVisible} />
      </div>

      <Login isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </SNav>
  );
};

export default Navbar;
