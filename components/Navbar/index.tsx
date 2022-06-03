import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';
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
  const token = parseCookies()?.taalei;
  useEffect(() => {
    token && !user && dispatch(getUserAction());
  }, [token]);

  useEffect(() => {
    !searchData && dispatch(getSearchDataAction());
  }, [searchData]);

  return (
    <SNav className="border-b border-b-gray-1 justify-center">
      <div className=" items-center flex pl-[20px] md:flex md:absolute right-[20px]">
        <Profile setIsModalVisible={setIsModalVisible} />
      </div>

      <AntSearch options={generateOptions(searchData)} />

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
