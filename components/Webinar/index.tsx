import React, { useState } from 'react';
import Image from 'next/image';
import { t } from 'i18next';
import AntButton from 'components/Common/AntButton';
import { faNumber } from 'utils/common.util';
import LoginLayout from 'components/Common/LoginLayout';
import UserComment from 'components/Course/comment';
import LoadingBox from 'components/Common/LoadingBox';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getEventAction } from 'store/course/course.action';
import TeacherLink from 'components/Common/TeacherLink';

const tabs = ['info', 'comments', 'questions'];
const Webinar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [slide, setSlide] = useState('info');
  const router = useRouter();
  const dispatch = useDispatch();
  const { eventId } = router.query;
  const webinar = useSelector((state) => state.course.event);
  const error = webinar?.[eventId as string]?.error;
  const data = webinar?.[eventId as string]?.data;

  const reload = (): void => {
    dispatch(getEventAction(eventId));
  };

  return (
    <div className="duration-300 bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      <div className="xl:pr-[370px] mt-[20px] md:mt-0 w-screen md:w-[700px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        <div className="w-full bg-white rounded-[8px] min-h-[500px]">
          <LoadingBox data={data} error={error} reload={reload}>
            <h2 className="h-[70px] center w-full font-bold text-[26px] m-[0px]">
              {data?.title}
            </h2>
            <Image
              src={data?.image}
              layout="responsive"
              alt={data?.title}
              width={530}
              height={300}
              priority
            />
            <div className="mx-[40px] py-[50px] text-[18px]">
              {data?.description.split('\r\n').map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </LoadingBox>
        </div>
      </div>
      <div className="w-screen mb-[20px] overflow-auto toRight rounded-[8px] xl:rounded mt-[20px] xl:mt-0 xl:mb-0 md:w-[700px] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={data} error={error} reload={reload}>
          <div className="h-[55px] center text-[16px] w-full flex flex-row-reverse border-b-gray-1 border-b text-gray-3">
            {tabs.map((item, index) => (
              <span key={item} aria-hidden="true" onClick={(): void => setSlide(item)}>
                <span
                  className={`mx-[10px] link ${slide === item && 'font-bold text-black'}`}
                >
                  {t(`course.${item}`)}
                </span>
                {index !== 0 && '/'}
              </span>
            ))}
          </div>

          <div className="overflow-auto xl:h-[90%] toRight mb-[40px] xl:mb-0">
            {slide === 'info' && (
              <div className="toLeft px-[40px]">
                <TeacherLink teacher={data?.teachers[0]} />

                <div className="flex w-full justify-between mt-[10px]">
                  <div>{t('webinar.type')}</div>
                  <div>{t('global.online')}</div>
                </div>

                <div className="flex w-full justify-between mt-[15px]">
                  <div>{t('global.status')}</div>
                  <div className="text-green-2">{t('webinar.active')}</div>
                </div>

                {data?.headline && (
                  <div className=" w-full mt-[15px]">
                    <div className="font-bold">{t('webinar.headline')}</div>
                    <div className="">
                      {data?.headline.split('\r\n').map((item) => (
                        <div className="my-[5px]" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!(data?.link && data?.registered) && (
                  <LoginLayout data={data} setLoading={setLoading}>
                    <AntButton className="w-full mt-[20px] toLeft" loading={loading}>
                      {t('webinar.register')}
                      <span className="mr-[30px] ">
                        {Number(data?.price) !== 0
                          ? faNumber(Number(data?.price) / 1000) + t('global.tooman')
                          : t('global.free')}
                      </span>
                    </AntButton>
                  </LoginLayout>
                )}
                {data?.link && data?.registered && (
                  <AntButton className="w-full mt-[20px]" loading={loading}>
                    <a href={data?.link} target="_blank" rel="noreferrer">
                      {t('webinar.link')}
                    </a>
                  </AntButton>
                )}

                {!!data?.times.length && (
                  <div>
                    <div className="font-bold text-[16px] mt-[20px]">
                      {t('global.courses')}
                    </div>

                    <div className="mb-[30px]">
                      {data?.times.map((time, index) => (
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
                              {faNumber(time.start)} {t('webinar.to')}{' '}
                              {faNumber(time.end)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {slide === 'comments' && (
              <div className="mb-[32px]">
                <UserComment
                  register={data?.registered}
                  data={data?.comments.data}
                  id={data?.id}
                  type="events"
                  comment
                />
              </div>
            )}
            {slide === 'questions' && (
              <UserComment
                type="events"
                data={data?.questions}
                id={data?.id}
                register={data?.registered}
              />
            )}
          </div>
        </LoadingBox>
      </div>
    </div>
  );
};

export default Webinar;
