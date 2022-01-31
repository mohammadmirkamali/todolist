import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseRoute, LessonRoute } from 'services/routes';
import { getChapterAction } from 'store/course/course.action';
import { faNumber } from 'utils/common.util';

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.courseId as string;
  const lessonId = router.query.lessonId as string;
  const chapters = useSelector((state) => state.course.chapters);
  const data = chapters?.[id]?.data;
  const lessons = data?.map((item) => item.lessons.map((k) => k)).flat();
  const index = lessons?.findIndex((item) => item.lesson_id === Number(lessonId));
  const prePage = index ? lessons[index - 1].lesson_id : null;
  const nextPage =
    lessons && index + 1 !== lessons?.length && lessons[index + 1].lesson_id;

  // console.log(id, lessonId, data, lessons, index, nextPage);
  useEffect(() => {
    (!chapters || !chapters?.[id]) && dispatch(getChapterAction(id));
  }, [id]);
  return (
    <div className="pt-[70px] bg-gray-0 min-h-screen">
      <div className="w-[300px] h-[470px] md:w-[600px]   xl:fixed right-0 top-[70px] bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div className="h-[70px] center w-full border-b-gray-1 relative px-[40px] border-b font-bold text-[18px]">
          {prePage && (
            <Link href={LessonRoute(id, prePage)}>
              <RightOutlined className="text-[20px] hover:translate-x-[5px] absolute right-12 duration-500 cursor-pointer" />
            </Link>
          )}
          <Link href={CourseRoute(id)} passHref>
            <Image
              src="/book.webp"
              width={40}
              height={40}
              className="hover:translate-y-[-5px] justify-self-center duration-500 cursor-pointer"
            />
          </Link>
          {nextPage && (
            <Link href={LessonRoute(id, nextPage)}>
              <LeftOutlined className="text-[20px] absolute left-12 hover:translate-x-[-5px] duration-500 cursor-pointer" />
            </Link>
          )}
        </div>
        <div className="overflow-auto h-[400px] xl:h-[100%] toRight pb-[200px] ">
          {!data ? (
            <Skeleton active />
          ) : (
            data.map((key) => (
              <div key={key.name} className="toLeft">
                {data.length > 1 && (
                  <div className="font-bold px-[40px] border-b border-b-gray-1 py-[7px] text-[16px]">
                    {key.name}
                  </div>
                )}
                {key?.lessons.map((item) => (
                  <Link href={LessonRoute(id, item.lesson_id)} key={item.lesson_title}>
                    <div
                      className={`text-[16px] px-[40px] py-[15px] ${
                        !item.lesson_free ? 'cursor-not-allowed' : 'cursor-pointer'
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
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
