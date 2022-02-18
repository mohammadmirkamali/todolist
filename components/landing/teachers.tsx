import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProfileRoute } from 'services/routes';
import { CourseType } from 'types/course.type';
import Title from './title';

type TeacherType = { courses: CourseType[] };
const Teachers: React.FC<TeacherType> = ({ courses }) => {
  const teachers = [...new Set(courses.map((item) => item.teacher_name))];

  return (
    <div className="center flex-col overflow-hidden">
      <Title title="landing.teacherTitle" subTitle="landing.teacherSubTitle" />
      <div className="grid grid-cols-[repeat(2,170px)] md:grid-cols-[repeat(5,220px)]">
        {teachers.map((teacher) => {
          const item = courses.find((course) => course.teacher_name === teacher);
          return (
            <Link
              href={ProfileRoute(teacher.replaceAll(' ', '-'))}
              key={item.id}
              passHref
            >
              <a className="center flex-col cursor-pointer my-[10px] md:m-[20px] transition-all duration-500 text-center opacity-70 hover:opacity-100 hover:text-blue-2 grayscale-[1] hover:grayscale-0">
                <Image
                  src={item.teacher_avatar}
                  width={120}
                  height={120}
                  alt={item.teacher_title}
                  className="rounded-full "
                />
                <div className="text-[16px] my-[5px] font-bold">{item.teacher_name}</div>
                <div className="text-[12px] w-[120px]">{item.teacher_title}</div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Teachers;
