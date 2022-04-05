import React from 'react';
import Image from 'next/image';
import { t } from 'i18next';
import TeacherAvatar from 'components/Common/TeacherAvatar';
import { WebinarType } from 'types/course.type';
import AntButton from 'components/Common/AntButton';
import { faNumber } from 'utils/common.util';

const Webinar: React.FC<{ webinar: WebinarType }> = ({ webinar }) => (
  <div className="pt-[110px] duration-300 md:pt-[70px] bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
    <div className="xl:pr-[370px] w-[300px] md:w-[600px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
      <div className="w-full bg-white rounded-[8px]">
        <h2 className="h-[70px] center w-full font-bold text-[26px] m-[0px]">
          {webinar.title}
        </h2>
        <Image
          src={webinar.image}
          layout="responsive"
          alt={webinar.title}
          width={530}
          height={300}
          priority
        />
        <p className="mx-[40px] py-[50px] text-[18px]">
          {webinar.description.split('\r\n').map((item) => (
            <div key={item}>{item}</div>
          ))}
        </p>
      </div>
    </div>
    <div className="w-[300px] mb-[20px] overflow-auto toRight px-[40px] rounded-[8px] xl:rounded mt-[170px] xl:mt-0 xl:mb-0 h-[470px] md:w-[600px] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
      <div className="toLeft">
        <TeacherAvatar
          name={webinar.teacher_name}
          title={webinar.teacher_title}
          img={webinar.teacher_avatar}
        />

        <div className="flex w-full justify-between mt-[10px]">
          <div>{t('webinar.type')}</div>
          <div>{t('global.online')}</div>
        </div>

        <div className="flex w-full justify-between mt-[15px]">
          <div>{t('global.status')}</div>
          <div className="text-green-2">{t('webinar.active')}</div>
        </div>

        {webinar.headline && (
          <div className=" w-full mt-[15px]">
            <div className="font-bold">{t('webinar.headline')}</div>
            <div className="">
              {webinar.headline.split('\r\n').map((item) => (
                <div className="my-[5px]" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <AntButton className="w-full mt-[20px]">
          {false ? (
            <a href={webinar.link} target="_blank" rel="noreferrer">
              {t('webinar.link')}
            </a>
          ) : (
            <>
              {' '}
              {t('webinar.register')}
              <span className="mr-[30px]">
                {webinar.price !== 0
                  ? faNumber(webinar.price / 1000) + t('global.tooman')
                  : t('global.free')}
              </span>
            </>
          )}
        </AntButton>

        {webinar.webinar_times && (
          <div>
            <div className="font-bold text-[16px] mt-[20px]">{t('global.courses')}</div>

            {webinar.webinar_times.map((time, index) => (
              <div className="my-[5px]" key={time.date}>
                <div className="flex">
                  <div className="font-bold ml-[15px]">
                    {t('global.course')} {faNumber(index + 1)}
                  </div>
                  {time.description && <div>({time.description})</div>}
                </div>
                <div className="flex">
                  <div className="ml-[10px]">{t('global.date')}:</div>
                  <div>{faNumber(time.date)}</div>
                  <div className="ml-[10px] mr-[20px]">{t('global.hour')}:</div>
                  <div>
                    {faNumber(time.start)} {t('webinar.to')} {faNumber(time.end)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Webinar;