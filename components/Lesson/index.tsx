import { DownloadOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Checkbox, message } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { CourseRoute, ExamInfoRoute, LessonRoute, LessonUrl } from 'services/routes';
import { CourseType, LessonType } from 'types/course.type';
import { LeftArrow, MenuItems, RightArrow } from 'components/Common/AnitmateLogo';
import LessonsList from 'components/Common/LessonsList';
import LoginLink from 'components/Common/LoginLink';
import 'plyr-react/dist/plyr.css';
import Image from 'next/image';
import LessonTabs from './lessonTabs';
import request from 'services/request';
import { faNumber, fileSize } from 'utils/common.util';
import LoadingBox from 'components/Common/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getChapterAction } from 'store/course/course.action';
import Plyr from 'plyr-react';
import styled from '@emotion/styled';

const controls = [
  'play',
  'progress',
  'current-time',
  'mute',
  'volume',
  'settings',
  'download',
  'fullscreen',
];

const SPlyr = styled.div`
  .plyr-react {
    display: none;
  }
`;

type LessonPageType = { course: CourseType; lesson: LessonType };
const Lesson: React.FC<LessonPageType> = ({ course, lesson }) => {
  const router = useRouter();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { courseId, lessonId } = router.query;
  const file = lesson?.files[0].file;
  const type = file?.includes('mp4') ? 'video' : 'audio';
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const courseError = useSelector((state) => state.course.chapters)?.[courseId as string]
    ?.error;

  const getData = async (): Promise<void> => {
    const res = await request.get(LessonUrl(courseId, lessonId));
    res.ok ? setData(res.data) : setError(true);
  };
  useEffect(() => {
    lessonId && setData(null);
    lessonId && getData();
  }, [lessonId]);

  const onLesson = (id): void => {
    const target = course.chapters
      ?.map((item) => item.lessons.map((k) => k))
      .flat()
      .find((item) => item.id === Number(id));

    target.files[0].file
      ? router.push(LessonRoute(course.id, id, target.title))
      : message.warning(t('course.notAllow'));
  };

  console.log('first');
  const reloadData = (): void => {
    dispatch(getChapterAction(courseId));
  };
  return (
    <div className="duration-300 bg-gray-0 min-h-[calc(100vh-70px)] flex-col flex items-center justify-items-start">
      <div className="xl:pr-[370px] w-[300px] md:w-[600px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        <div className="w-full bg-white rounded-[8px] min-h-[500px]">
          <LoadingBox data={course} error={courseError} reload={reloadData}>
            <div className="py-[15px] text-center px-[25px]">
              <h2 className="font-bold m-0 text-[20px]">{course?.title}</h2>
              <h3 className="text-[16px] m-0">{lesson?.title}</h3>
            </div>

            {type === 'audio' && (
              <Image
                src={course?.image}
                layout="responsive"
                width={530}
                height={300}
                alt=""
              />
            )}
            <SPlyr>
              <Plyr
                ref={(player) => (ref.current = player)} // eslint-disable-line
                source={{ type, sources: [{ src: file }] }}
                options={{ controls }}
              />
            </SPlyr>

            <LessonTabs data={data} error={error} player={ref} reload={getData} />
          </LoadingBox>
        </div>
      </div>

      <div className="w-[300px] mb-[20px] rounded-[8px] xl:rounded mt-[170px] xl:mt-0 xl:mb-0 h-[470px] md:w-[600px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={course} error={courseError} reload={reloadData}>
          <div className="h-[70px] center w-full border-b-gray-1 relative px-[40px] border-b font-bold text-[18px]">
            <RightArrow
              disable={!lesson?.previous_lesson}
              className="right-12 absolute"
              onClick={(): void =>
                lesson?.previous_lesson && onLesson(lesson.previous_lesson)
              }
            />

            <Link href={CourseRoute(course?.id, course?.title)} passHref>
              <a>
                <MenuItems />
              </a>
            </Link>

            <LeftArrow
              disable={!lesson?.next_lesson}
              className="left-12 absolute"
              onClick={(): void => lesson?.next_lesson && onLesson(lesson?.next_lesson)}
            />
          </div>

          <div className="overflow-auto h-[400px] xl:h-[100%] toRight">
            <LessonsList course={course} activeId={lesson?.id} />
          </div>

          <div className="absolute p-[20px] flex-col flex-wrap flex text-[15px] bg-white bottom-[490px] rounded-[8px]  w-full xl:bottom-0 h-[150px]">
            {!data || lesson?.exam === false ? null : data?.exam?.passed ? (
              <div className="mb-[14px] rounded-[4px] items-center flex text-green-0">
                {t('course.passedExam', { grade: faNumber(data?.exam?.grade) })}
              </div>
            ) : (
              <LoginLink href={ExamInfoRoute(course?.id, lesson?.id)}>
                <div className="mb-5 rounded-[4px] items-center flex cursor-pointer text-gray-3 hover:text-black duration-300">
                  <FileDoneOutlined className="ml-[8px] text-[25px]" /> {t('course.exam')}
                </div>
              </LoginLink>
            )}

            {data?.attaches.map((item) => (
              <Link key={item.link} href={item.link} passHref>
                <a className="mb-5 rounded-[4px] cursor-pointer text-gray-3 hover:text-black duration-300">
                  <DownloadOutlined className="ml-[8px] text-[20px]" />
                  {item.name} ({fileSize(item.size)})
                </a>
              </Link>
            ))}

            <Checkbox className="text-gray-3 hover:text-black duration-300">
              <div className="mb-5 text-gray-3 hover:text-black">
                {t('course.isSeen')}
              </div>
            </Checkbox>
            <Checkbox className="text-gray-3 hover:text-black duration-300">
              <div className="text-gray-3 hover:text-black duration-300">
                {t('course.conversation')}
              </div>
            </Checkbox>
          </div>
        </LoadingBox>
      </div>
    </div>
  );
};

export default Lesson;
