import Image from 'next/image';
import React from 'react';
import { CourseType } from 'types/account.type';
import Title from './title';

type TeacherType = { courses: CourseType[] };
const Teachers: React.FC<TeacherType> = ({ courses }) => {
  const teachers = [...new Set(courses.map((item) => item.teacher_name))];

  return (
    <div className="center flex-col overflow-hidden">
      <Title title="landing.teacherTitle" subTitle="landing.teacherSubTitle" />
      <div className="grid grid-cols-[repeat(2,180px)] md:grid-cols-[repeat(5,220px)]">
        {teachers.map((teacher) => {
          const item = courses.find((course) => course.teacher_name === teacher);
          return (
            <div
              className="center flex-col my-[10px] md:m-[20px] duration-300 text-center hover:text-blue-2 contrast-[.6] hover:contrast-100"
              key={item.id}
            >
              <Image
                src={item.teacher_avatar}
                width={150}
                height={150}
                className="rounded-full "
              />
              <div className="text-[16px] my-[5px] font-bold">{item.teacher_name}</div>
              <div className="text-[12px] ">{item.teacher_title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teachers;