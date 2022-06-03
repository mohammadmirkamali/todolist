import { DownloadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Button } from 'antd';
import Link from 'next/link';
import { t } from 'i18next';
import React from 'react';
import * as url from 'services/routes';

const SButton = styled(Button)`
  width: 210px;
  height: 40px;
  font-size: 18px;
  span {
    padding: 5px 0 0;
  }
`;

const categories = [
  { name: 'home', route: url.HomeRoute() },
  { name: 'posts', route: url.PostsRoute() },
];
const access = [
  { name: 'conditions', route: url.ConditionRoute() },
  { name: 'finance', route: url.FinanceRoute() },
  { name: 'contactUs', route: url.ContactUsRoute() },
];

const Footer: React.FC = () => (
  <div className="w-full text-white h-[700px] p-[20px] md:h-[300px] flex flex-col md:flex-row items-center justify-start md:justify-center bg-blue-9">
    <div className=" w-[300px] h-[200px] py-[30px] md:py-[10px] px-[50px]">
      <div className="font-bold text-[18px] mb-[15px]">{t('footer.category')}</div>
      {categories.map((item) => (
        <Link href={item.route} key={item.name} passHref>
          <a className="text-[16px] cursor-pointer my-[10px] text-white  hover:text-blue-2 duration-300 block">
            {t(`global.${item.name}`)}
          </a>
        </Link>
      ))}
    </div>
    <div className=" w-[300px] border-y md:border-x md:border-y-0 border-gray-3 h-[200px] py-[30px] md:py-[10px] px-[50px]">
      <div className="font-bold text-[18px] mb-[15px]">{t('footer.access')}</div>
      {access.map((item) => (
        <Link href={item.route} key={item.name} passHref>
          <a className="text-[16px] cursor-pointer my-[10px] text-white hover:text-blue-2 duration-300 block">
            {t(`footer.${item.name}`)}
          </a>
        </Link>
      ))}
    </div>
    <div className=" w-[300px] h-[200px] py-[30px] md:py-[10px] pr-[50px]">
      <Image src="/logo.webp" width={50} height={50} alt="" />
      <p>{t('footer.designBy')}</p>
      <p className="text-[12px]">{t('footer.taali')}</p>
      <SButton href={url.DownloadRoute()}>
        <DownloadOutlined /> {t('footer.downloadApp')}
      </SButton>
    </div>
  </div>
);

export default Footer;
