/* eslint-disable import/no-unresolved */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { t } from 'i18next';
import ScrollContainer from 'react-indiana-drag-scroll';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { getChapterAction } from 'store/course/course.action';
import { CourseType } from 'types/course.type';
import UserComment from './comment';
import Lessons from './lessons';
import Information from './information';
import Card from 'components/Common/Card';
import Attaches from './attaches';

const tabs = ['comments', 'lessons'];

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  // const id = useRouter().query.courseId as string;
  const [swiper, setSwiper] = useState({} as any); // eslint-disable-line
  const [slideId, setSlideId] = useState(0);
  // const data = course.chapters?.[id]?.data;
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    course.attaches.length && tabs.unshift('attaches');
  }, []);

  const onSlide = (item): void => {
    const index = item.activeIndex;
    const { length } = tabs;
    // handle changing last and first slide. it a swiper bug
    setSlideId(index === length + 1 ? 0 : !index ? length - 1 : index - 1);
  };

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
        <div className="w-full bg-white rounded-[8px] overflow-hidden">
          <h3 className="h-[70px] center w-full font-bold text-[22px] m-[0px]">
            {t('course.relatedCourses')}
          </h3>
          {courses && (
            <ScrollContainer className="flex overflow-auto">
              {[...courses].slice(0, 5).map((item) => (
                <div className="scale-[.8] m-[-27px]" key={item.id}>
                  <Card course={item} />
                </div>
              ))}
            </ScrollContainer>
          )}
        </div>
      </div>

      {/* information */}
      <div className="w-[300px] border-b border-b-gray-1 md:w-[600px] xl:fixed left-0 top-[70px]  xl:w-[350px] xl:h-[calc(100%-70px)] bg-white z-10">
        <div className="h-[55px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.info')}
        </div>

        <Information course={course} user={user} />
      </div>

      <div className="w-[300px] h-[620px] md:w-[600px]   xl:fixed right-0 top-[70px] bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div className="h-[55px] center w-full flex flex-row-reverse border-b-gray-1 border-b text-gray-3 text-[18px]">
          {tabs.map((item, index) => (
            <span
              key={item}
              aria-hidden="true"
              onClick={(): void => (setSlideId(index), swiper.slideTo(index + 1))}
            >
              <span
                className={`mx-[10px] link ${
                  slideId === index && 'font-bold text-black'
                }`}
              >
                {t(`course.${item}`)}
              </span>
              {index !== 0 && '/'}
            </span>
          ))}
        </div>
        <div className="overflow-auto h-[550px] xl:h-[90%] toRight">
          <Swiper
            loop
            initialSlide={tabs.length - 1}
            onInit={(item): void => setSwiper(item)}
            className="h-full"
            onSlideChange={onSlide}
          >
            {course.attaches.length && (
              <SwiperSlide>
                <Attaches data={course.attaches} />
              </SwiperSlide>
            )}
            <SwiperSlide className="relative h-full overflow-hidden">
              <UserComment comments={course.comments} />
            </SwiperSlide>
            <SwiperSlide className="min-h-full overflow-auto">
              <Lessons user={user} course={course} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Course;
