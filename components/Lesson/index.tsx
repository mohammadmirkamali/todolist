/* eslint-disable @typescript-eslint/no-unused-vars */
import { DownloadOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Checkbox, message, Skeleton } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
} from 'video-react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseRoute, LessonRoute } from 'services/routes';
import { getChapterAction } from 'store/course/course.action';
import { CourseType, LessonType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import { LeftArrow, MenuItems, RightArrow } from 'components/Common/AnitmateLogo';

const Lesson: React.FC<{ data?: CourseType }> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = true; // to do ...
  // const id = router.query.courseId as string;
  // const lessonId = router.query.lessonId as string;
  // const chapters = useSelector((state) => state.course.chapters);
  // // const data = chapters?.[id]?.data?.data;
  // const lessons = data?.map((item) => item.lessons.map((k) => k)).flat();
  // const index = lessons?.findIndex((item) => item.lesson_id === Number(lessonId));
  // const lesson = lessons?.[index] as LessonType;
  // const prePage = index ? lessons[index - 1] : null;
  // const nextPage = lessons && index + 1 !== lessons?.length && lessons[index + 1];
  // const mp3 = lesson?.attaches?.find((item) => item.attach_type === 'mp3');
  // const pdf = lesson?.attaches?.find((item) => item.attach_type === 'pdf');

  // useEffect(() => {
  //   (!chapters || !chapters?.[id]) && dispatch(getChapterAction(id));
  // }, [id]);

  // const onLesson = (item): void => {
  //   item.lesson_free || profile
  //     ? router.push(LessonRoute(id, item.lesson_id))
  //     : message.warning(t('course.notAllow'));
  // };

  return (
    <div className="pt-[110px] duration-300 md:pt-[70px] bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      {/* <div className="xl:pr-[370px] w-[300px] md:w-[600px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        {!lesson ? (
          <div className="m-[15px]">
            <Skeleton active />
          </div>
        ) : (
          <div className="w-full bg-white rounded-[8px]">
            <div className="py-[15px] text-center px-[25px]">
              <h2 className="font-bold m-0 text-[20px]">{lesson?.workshop_title}</h2>
              <h3 className="text-[16px] m-0">{lesson?.lesson_title}</h3>
            </div>

            <React.Fragment key={lesson.lesson_file}>
              <Player className="toRight">
                <source src={lesson.lesson_file} />
                <ControlBar>
                  <ReplayControl seconds={10} order={1.1} />
                  <ForwardControl seconds={30} order={1.2} />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <PlaybackRateMenuButton
                    rates={[5, 2, 1.5, 1.25, 1, 0.7, 0.5]}
                    order={7.1}
                  />
                </ControlBar>
              </Player>
            </React.Fragment>
          </div>
        )}
      </div> */}

      <div className="w-[300px] mb-[20px] rounded-[8px] xl:rounded mt-[170px] xl:mt-0 xl:mb-0 h-[470px] md:w-[600px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        {/* <div className="h-[70px] center w-full border-b-gray-1 relative px-[40px] border-b font-bold text-[18px]">
          <RightArrow
            disable={!prePage}
            className="right-12 absolute"
            onClick={(): void => prePage && onLesson(prePage)}
          />

          <Link href={CourseRoute(id,)} passHref>
            <a>
              <MenuItems />
            </a>
          </Link>

          <LeftArrow
            disable={!nextPage}
            className="left-12 absolute"
            onClick={(): void => nextPage && onLesson(nextPage)}
          />
        </div> */}

        {/* <div className="overflow-auto h-[400px] xl:h-[100%] toRight">
          {!data ? (
            <div className="m-[15px]">
              <Skeleton active />
              <Skeleton active />
            </div>
          ) : (
            data.map((key) => (
              <div key={key.name} className="toLeft">
                {data.length > 1 && (
                  <div className="font-bold px-[40px] border-b border-b-gray-1 py-[7px] text-[16px]">
                    {key.name}
                  </div>
                )}
                {key?.lessons.map((item) => (
                  <div
                    onClick={(): void => onLesson(item)}
                    aria-hidden="true"
                    key={item.lesson_title}
                    className={`text-[16px] px-[40px] py-[15px] ${
                      item.lesson_free || profile
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    } ${
                      item.lesson_id === Number(lessonId) && 'bg-gray-4 '
                    }  hover:bg-gray-4 duration-300`}
                  >
                    <div>
                      {item.lesson_title}
                      <div className="text-[13px] pr-[10px] inline-block">
                        {item.lesson_free ? `(${t('global.free')})` : ''}
                      </div>
                    </div>
                    <div>{faNumber(item.time_string)}</div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div> */}

        {/* {!lesson ? (
          <div className="m-[15px]">
            <Skeleton active />
          </div>
        ) : (
          <div className="absolute p-[20px] flex-col flex-wrap flex text-[15px] bg-white bottom-[490px] rounded-[8px]  w-full xl:bottom-0 h-[150px]">
            <Link href={lesson.lesson_file} passHref>
              <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                <DownloadOutlined className="ml-[8px] text-[20px]" />
                {t('global.download')}
              </a>
            </Link>
            {mp3 && (
              <Link href={mp3.attach_link} passHref>
                <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                  <DownloadOutlined className="ml-[8px] text-[20px]" />
                  {t('course.voiceDownload')}
                </a>
              </Link>
            )}
            {pdf && (
              <Link href={pdf.attach_link} passHref>
                <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                  <DownloadOutlined className="ml-[8px] text-[20px]" />
                  {t('course.pdfDownload')}
                </a>
              </Link>
            )}
            {lesson.has_exam === 1 && (
              <div className="mb-5 rounded-[4px] items-center flex cursor-pointer text-gray-3 hover:text-black duration-300">
                <FileDoneOutlined className="ml-[8px] text-[25px]" /> {t('course.exam')}
              </div>
            )}
            <Checkbox className="text-gray-3 hover:text-black duration-300">
              <div className="mb-5 text-gray-3 hover:text-black">
                {t('course.isSeen')}
              </div>
            </Checkbox>
            <Checkbox className="text-gray-3 hover:text-black duration-300">
              <div className="text-gray-3 hover:text-black duration-300">
                {t('course.coversation')}
              </div>
            </Checkbox>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Lesson;
