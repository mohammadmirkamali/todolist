import { ClockCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from 'next/image';
import { t } from 'i18next';
import Link from 'next/link';
import { Button, message, Rate, Skeleton } from 'antd';
import { getChapterAction } from 'store/course/course.action';
import { faNumber } from 'utils/common.util';
import { CourseType } from 'types/course.type';
import { LessonRoute, ProfileRoute } from 'services/routes';

const SButton = styled(Button)`
  width: 240px;
  height: 40px;
  margin: 40px 0;
  border-radius: 8px;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQueries.sm} {
    width: 290px;
  }
`;

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = useRouter().query.courseId as string;
  const chapters = useSelector((state) => state.course.chapters);
  const data = chapters?.[id]?.data;
  const profile = true; // to do ...

  useEffect(() => {
    (!chapters || !chapters?.[id]) && dispatch(getChapterAction(id));
  }, [id]);

  const onLesson = (item): void => {
    item.lesson_free || profile
      ? router.push(LessonRoute(id, item.lesson_id))
      : message.warning(t('course.notAllow'));
  };

  return (
    <div className="bg-gray-0 pt-[110px] duration-300 md:pt-[70px] min-h-screen flex xl:block flex-col center">
      <div className=" w-[300px] md:w-[600px] xl:px-[370px] py-[20px] xl:justify-self-start xl:w-full ">
        <div className="w-full bg-white rounded-[8px]">
          <h2 className="h-[70px] center w-full font-bold text-[26px] m-[0px]">
            {course.workshop_title}
          </h2>
          <Image
            src={course.workshop_img}
            layout="responsive"
            alt={course.workshop_title}
            width={530}
            height={300}
            priority
          />
          <p className="mx-[40px] py-[50px] text-[18px]">{course.workshop_description}</p>
        </div>
      </div>

      <div className="w-[300px] border-b border-b-gray-1 md:w-[600px] xl:fixed left-0 top-[70px]  xl:w-[350px] xl:h-[calc(100%-70px)] bg-white z-10">
        <div className="h-[70px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.info')}
        </div>

        <div className="text-[18px] pr-[30px] text-gray-10">
          <Link href={ProfileRoute(course.teacher_name.replaceAll(' ', '-'))} passHref>
            <a className="py-[30px] flex items-center cursor-pointer text-gray-10 hover:text-black duration-300">
              <Image
                src={course.teacher_avatar}
                width={60}
                height={60}
                priority
                alt={course.teacher_name}
                className="rounded-full"
              />
              <div className="mr-[10px] ">
                <div className="font-bold text-[20px]">{course.teacher_name}</div>
                <div className="text-[16px]">{course.teacher_title}</div>
              </div>
            </a>
          </Link>

          <div className="py-[10px] flex items-center">
            <ClockCircleOutlined className="text-[30px] pr-[10px]" />
            <div className="px-[20px] toRight">
              {faNumber(course.workshop_time.replaceAll(':', ' : '))}
            </div>
            <div>{t('global.hour')}</div>
          </div>

          <div className="py-[10px] flex items-center">
            <i className="fas fa-user-graduate pr-[10px] text-[30px]" />
            <div className="px-[20px] ">
              {faNumber(course.count_students.toLocaleString())}
            </div>
            <div>{t('course.students')}</div>
          </div>

          <div className="py-[7px] flex items-center">
            <Image src="/book.webp" width={50} height={50} alt="" />
            <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
            <div>{t('global.course')}</div>
          </div>

          {!profile && (
            <div className="py-[7px] flex items-center">
              <i className="fas fa-money-bill-wave text-[25px] pr-[15px]" />
              <div className="px-[20px] toLeft">
                {course.workshop_price
                  ? `${faNumber(course.workshop_price / 1000)} ${t('global.tooman')}`
                  : t('global.free')}
              </div>
            </div>
          )}

          <div className="py-[7px] flex items-center pr-[15px]">
            <Rate value={course.rates_avg} allowHalf />
            <div className="px-[15px] toRight">
              {`( ${t('global.person')} ${faNumber(
                course.count_rates.toLocaleString(),
              )} ) `}
            </div>
          </div>

          {!profile && <SButton>{t('global.register')}</SButton>}
        </div>
      </div>

      <div className="w-[300px] h-[470px] md:w-[600px]   xl:fixed right-0 top-[70px] bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div className="h-[70px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.lessons')}
        </div>
        <div className="overflow-auto h-[400px] xl:h-[90%] toRight">
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
                    } hover:bg-gray-4 duration-300`}
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
        </div>
      </div>
    </div>
  );
};

export default Course;
