import { message, Skeleton } from 'antd';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { LessonRoute } from 'services/routes';
import { faNumber } from 'utils/common.util';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Lessons = ({ profile, id, data }) => {
  const router = useRouter();
  //   const onLesson = (item): void => {
  //     item.lesson_free || profile
  //       ? router.push(LessonRoute(id, item.lesson_id))
  //       : message.warning(t('course.notAllow'));
  //   };

  return (
    <div>
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
              <Link key={item.lesson_title} href={LessonRoute(id, item.lesson_id)}>
                <a>
                  <div
                    className={`text-[16px] px-[40px] py-[15px] text-black ${
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
                </a>
              </Link>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Lessons;
