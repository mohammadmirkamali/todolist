import { DownloadOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { t } from 'i18next';
import React from 'react';
import * as url from 'services/routes';

const access = [
  { name: 'conditions', route: url.ConditionRoute() },
  { name: 'finance', route: url.FinanceRoute() },
  { name: 'home', route: url.HomeRoute() },
  // { name: 'contactUs', route: url.ContactUsRoute() },
];

const Footer: React.FC = () => (
  <div className="w-full text-white h-[700px] p-[20px] md:h-[300px] flex flex-col md:flex-row items-center justify-start md:justify-center bg-blue-9">
    <div className=" w-[300px] h-[200px] py-[30px] md:py-[10px] px-[50px]">
      <div className="font-bold text-[18px] mb-[24px]">{t('footer.support')}</div>

      <div className="my-[10px] text-white block">
        <WhatsAppOutlined style={{ fontSize: '20px', marginLeft: 4 }} />{' '}
        {t(`footer.whatsapp`)} : ۹۸۹۹۰۰۰۱۴۰۹۰+
      </div>
      <div className="my-[10px] text-white block">
        {t(`footer.eeta`)} : ravabet_omumi_taalei@
      </div>
      <div className="my-[10px] text-white block">
        {t(`footer.telegram`)} : taalei_support@
      </div>
    </div>
    <div className=" w-[300px] border-y md:border-x md:border-y-0 border-gray-3 h-[200px] py-[30px] md:py-[10px] px-[50px]">
      <div className="font-bold text-[18px] mb-[24px]">{t('footer.access')}</div>
      {access.map((item) => (
        <Link href={item.route} key={item.name} passHref>
          <a className="cursor-pointer my-[10px] text-white hover:text-blue-2 duration-300 block">
            {t(`footer.${item.name}`)}
          </a>
        </Link>
      ))}
    </div>
    <div className=" w-[300px] h-[200px] py-[30px] md:py-[10px] pr-[50px]">
      <p className="text-[18px] font-bold mb-[24px]">{t('footer.downloadApp')}</p>

      <div className="flex flex-col">
        <Link href={url.DownloadRoute()}>
          <a className="text-white mb-[12px]">
            <DownloadOutlined /> {t('footer.directDownload')}
          </a>
        </Link>
        <a
          className="text-white"
          href={url.GooglePlayRoute()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DownloadOutlined /> {t('footer.googleDownload')}
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
