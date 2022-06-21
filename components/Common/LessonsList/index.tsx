import { CheckCircleFilled, LockFilled, PlayCircleFilled } from '@ant-design/icons';
import { t } from 'i18next';
import React from 'react';
import { LessonRoute } from 'services/routes';
import { CourseType } from 'types/course.type';
import { calcTime } from 'utils/common.util';
import LoginLayout from 'components/Common/LoginLayout';

type LessonsType = { course: CourseType; activeId?: number };
const LessonsList: React.FC<LessonsType> = ({ course, activeId }) => (
  <div>
    {course.chapters.map((key) => (
      <div key={key.name} className="toLeft">
        {course.chapters.length > 1 && (
          <div className="font-bold px-[40px] border-b border-b-gray-1 py-[7px] text-[16px]">
            {key.name}
          </div>
        )}
        {key?.lessons
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <LoginLayout
              data={course}
              key={item.title}
              condition={!!item.files[0].file}
              url={LessonRoute(course.id, item.id, item.title)}
            >
              <div
                className={`text-[14px] px-[30px] items-center py-[15px] cursor-pointer flex text-black hover:bg-gray-4 ${
                  item.id === activeId && 'bg-gray-4'
                } duration-300`}
              >
                <div className="ml-[16px] text-gray-3 text-[20px]">
                  {item.files[0].file ? (
                    course.passed_lessons?.includes(item.id) ? (
                      <CheckCircleFilled style={{ color: '#429933' }} />
                    ) : (
                      <PlayCircleFilled />
                    )
                  ) : (
                    <LockFilled />
                  )}
                </div>
                <div>
                  <div>
                    {item.title}
                    <div className="text-[13px] pr-[10px] inline-block">
                      {item.free ? `(${t('global.free')})` : ''}
                    </div>
                  </div>
                  <div>{calcTime(item.time)}</div>
                </div>
              </div>
            </LoginLayout>
          ))}
      </div>
    ))}
  </div>
);

export default LessonsList;
