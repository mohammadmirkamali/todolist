import { Progress } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { CourseRoute } from 'services/routes';
import { CoursesType } from 'types/course.type';
import { ellipsisText } from 'utils/common.util';

const ProgressCard: React.FC<{ course: CoursesType }> = ({ course }) => {
  const user = useSelector((state) => state.account.user);
  const lessonCounts = course?.lessons.length;
  const passed =
    user?.workshops?.find((key) => key.id === course?.id)?.passed_lessons?.length || 0;

  return (
    <Link href={CourseRoute(course?.id, course?.title)}>
      <a className="bg-white text-black m-[8px] w-[136px] text-center p-[8px] h-[170px] duration-300 hover:text-black transition-all font-bold center flex-col text-[14px] drop-shadow hover:drop-shadow-lg rounded-[8px] cursor-pointer">
        <Progress
          type="dashboard"
          percent={Math.floor((passed * 100) / lessonCounts)}
          trailColor="#ebf6fc"
          strokeWidth={12}
          width={100}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
        />
        <div className="h-[48px] center">{ellipsisText(course?.title, 31)}</div>
      </a>
    </Link>
  );
};

export default ProgressCard;
