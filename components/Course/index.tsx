import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { t } from 'i18next';
import ScrollContainer from 'react-indiana-drag-scroll';
import Card from 'components/Common/Card';
import { CourseType } from 'types/course.type';
import UserComment from './comment';
import Attaches from './attaches';
import Information from './Information';
import LessonsList from 'components/Common/LessonsList';
import { Skeleton } from 'antd';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const [tabs, setTabs] = useState([]);
  const searchData = useSelector((state) => state.course.searchData);
  const [slideId, setSlideId] = useState('lessons');
  const categories = course.categories.map((k) => k.title);
  const similarCourses =
    searchData &&
    [...searchData.workshops]
      .filter((item) => categories.includes(item.categories[0]?.title))
      .filter((item) => item.id !== course.id)
      .slice(0, 5);

  useEffect(() => {
    course.attaches.length
      ? setTabs(['attaches', 'questions', 'comments', 'lessons'])
      : setTabs(['questions', 'comments', 'lessons']);
  }, [course]);

  return (
    <div className="bg-gray-0 duration-300 min-h-screen flex xl:block flex-col center">
      {/* title and description */}
      <div className=" w-[300px] md:w-[600px] xl:px-[370px] py-[20px] xl:justify-self-start xl:w-full ">
        <div className="w-full bg-white rounded-[8px]">
          <h2 className="h-[70px] center w-full font-bold text-[26px] m-[0px]">
            {course.title}
          </h2>
          <Image
            src={course.image}
            layout="responsive"
            alt={course.title}
            width={530}
            height={300}
            priority
          />
          <p className="mx-[40px] py-[50px] text-[18px]">{course.description}</p>
        </div>
        {!!categories.length && (
          <div className="w-full bg-white rounded-[8px] overflow-hidden">
            <h3 className="h-[70px] center w-full font-bold text-[22px] m-[0px]">
              {t('course.relatedCourses')}
            </h3>
            {searchData ? (
              <ScrollContainer className="flex overflow-auto">
                {similarCourses.map((item) => (
                  <div className="scale-[.8] m-[-27px]" key={item.id}>
                    <Card data={item} />
                  </div>
                ))}
              </ScrollContainer>
            ) : (
              <Skeleton className="m-[30px]" />
            )}
          </div>
        )}
      </div>

      {/* information */}
      <div className="w-[300px] border-b border-b-gray-1 md:w-[600px] xl:fixed left-0 top-[70px]  xl:w-[350px] xl:h-[calc(100%-70px)] bg-white z-10">
        <div className="h-[55px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.info')}
        </div>

        <Information course={course} />
      </div>

      <div className="w-[300px] h-[620px] md:w-[600px]   xl:fixed right-0 top-[70px] bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div
          className={`h-[55px] center w-full flex text-[${
            tabs.length > 3 ? 13 : 16
          }px] md:text-[${
            tabs.length > 3 ? 16 : 18
          }px] flex-row-reverse border-b-gray-1 border-b text-gray-3`}
        >
          {tabs.map((item, index) => (
            <span key={item} aria-hidden="true" onClick={(): void => setSlideId(item)}>
              <span
                className={`mx-[10px] link ${slideId === item && 'font-bold text-black'}`}
              >
                {t(`course.${item}`)}
              </span>
              {index !== 0 && '/'}
            </span>
          ))}
        </div>
        <div className="overflow-auto h-[550px] xl:h-[90%] toRight">
          {slideId === 'lessons' && <LessonsList course={course} />}
          {slideId === 'attaches' && <Attaches data={course.attaches} />}
          {slideId === 'questions' && (
            <UserComment data={course.questions} id={course.id} />
          )}
          {slideId === 'comments' && (
            <UserComment data={course.comments} type="workshops" id={course.id} comment />
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
