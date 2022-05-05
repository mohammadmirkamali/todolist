import { t } from 'i18next';
import Link from 'next/link';
import React from 'react';
import { LessonRoute } from 'services/routes';
import { CourseType } from 'types/course.type';
import { calcTime } from 'utils/common.util';

type LessonsType = { course: CourseType; activeId?: number };
const LessonsList: React.FC<LessonsType> = ({ course, activeId }) => {
  const hours = Math.floor(course.time / 3600);
  const minutes = Math.floor((course.time - hours * 3600) / 60);

  return (
    <div>
      {course.chapters.map((key) => (
        <div key={key.name} className="toLeft">
          {course.chapters.length > 1 && (
            <div className="font-bold px-[40px] border-b border-b-gray-1 py-[7px] text-[16px]">
              {key.name}
            </div>
          )}
          {key?.lessons.map((item) => (
            <Link key={item.title} href={LessonRoute(course.id, item.id, item.title)}>
              <a>
                <div
                  className={`text-[16px] px-[40px] py-[15px] text-black ${
                    item.files[0].file ? 'cursor-pointer' : 'cursor-not-allowed'
                  } hover:bg-gray-4 ${item.id === activeId && 'bg-gray-4'} duration-300`}
                >
                  <div>
                    {item.title}
                    <div className="text-[13px] pr-[10px] inline-block">
                      {item.free ? `(${t('global.free')})` : ''}
                    </div>
                  </div>
                  <div>{calcTime(item.time)}</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LessonsList;
