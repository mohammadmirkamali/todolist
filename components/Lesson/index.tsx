import { DownloadOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Checkbox, message } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
} from 'video-react';
import { CourseRoute, LessonRoute } from 'services/routes';
import { CourseType, LessonType } from 'types/course.type';
import { LeftArrow, MenuItems, RightArrow } from 'components/Common/AnitmateLogo';
import LessonsList from 'components/Common/LessonsList';

type LessonPageType = { course: CourseType; lesson: LessonType };
const Lesson: React.FC<LessonPageType> = ({ course, lesson }) => {
  const router = useRouter();
  const { file } = lesson.files[0];

  // const mp3 = lesson?.attaches?.find((item) => item.attach_type === 'mp3');
  // const pdf = lesson?.attaches?.find((item) => item.attach_type === 'pdf');

  const onLesson = (id): void => {
    const target = course.chapters
      ?.map((item) => item.lessons.map((k) => k))
      .flat()
      .find((item) => item.id === Number(id));

    target.files[0].file
      ? router.push(LessonRoute(course.id, id, target.title))
      : message.warning(t('course.notAllow'));
  };

  return (
    <div className="duration-300 bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      <div className="xl:pr-[370px] w-[300px] md:w-[600px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        <div className="w-full bg-white rounded-[8px]">
          <div className="py-[15px] text-center px-[25px]">
            <h2 className="font-bold m-0 text-[20px]">{course.title}</h2>
            <h3 className="text-[16px] m-0">{lesson.title}</h3>
          </div>

          <React.Fragment key={file}>
            <Player className="toRight">
              <source src={file} />
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
      </div>

      <div className="w-[300px] mb-[20px] rounded-[8px] xl:rounded mt-[170px] xl:mt-0 xl:mb-0 h-[470px] md:w-[600px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div className="h-[70px] center w-full border-b-gray-1 relative px-[40px] border-b font-bold text-[18px]">
          <RightArrow
            disable={!lesson.previous_lesson}
            className="right-12 absolute"
            onClick={(): void =>
              lesson.previous_lesson && onLesson(lesson.previous_lesson)
            }
          />

          <Link href={CourseRoute(course.id, course.title)} passHref>
            <a>
              <MenuItems />
            </a>
          </Link>

          <LeftArrow
            disable={!lesson.next_lesson}
            className="left-12 absolute"
            onClick={(): void => lesson.next_lesson && onLesson(lesson.next_lesson)}
          />
        </div>

        <div className="overflow-auto h-[400px] xl:h-[100%] toRight">
          <LessonsList course={course} activeId={lesson.id} />
        </div>

        <div className="absolute p-[20px] flex-col flex-wrap flex text-[15px] bg-white bottom-[490px] rounded-[8px]  w-full xl:bottom-0 h-[150px]">
          <Link href={file}>
            <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
              <DownloadOutlined className="ml-[8px] text-[20px]" />
              {t('global.download')}
            </a>
          </Link>
          {/* {mp3 && (
              <Link href={mp3.attach_link} passHref>
                <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                  <DownloadOutlined className="ml-[8px] text-[20px]" />
                  {t('course.voiceDownload')}
                </a>
              </Link>
            )} */}
          {/* {pdf && (
              <Link href={pdf.attach_link} passHref>
                <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                  <DownloadOutlined className="ml-[8px] text-[20px]" />
                  {t('course.pdfDownload')}
                </a>
              </Link>
            )} */}
          {lesson.can_start_exam === 1 && (
            <div className="mb-5 rounded-[4px] items-center flex cursor-pointer text-gray-3 hover:text-black duration-300">
              <FileDoneOutlined className="ml-[8px] text-[25px]" /> {t('course.exam')}
            </div>
          )}
          <Checkbox className="text-gray-3 hover:text-black duration-300">
            <div className="mb-5 text-gray-3 hover:text-black">{t('course.isSeen')}</div>
          </Checkbox>
          <Checkbox className="text-gray-3 hover:text-black duration-300">
            <div className="text-gray-3 hover:text-black duration-300">
              {t('course.conversation')}
            </div>
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
