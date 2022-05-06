import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProfileRoute } from 'services/routes';
import { CoursesType } from 'types/course.type';

type TeacherType = { courses: CoursesType[] };
const Teachers: React.FC<TeacherType> = ({ courses }) => {
  const teachers = [...new Set(courses.map((item) => item.teachers[0].nickname))];

  return (
    <div className="center flex-col overflow-hidden">
      <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
        {t('global.teachers')}
      </h2>

      <div className="grid grid-cols-[repeat(2,170px)] md:grid-cols-[repeat(5,220px)]">
        {teachers.map((teacher) => {
          const item = courses.find((course) => course.teachers[0].nickname === teacher);
          return (
            <Link href={ProfileRoute(teacher)} key={item.id} passHref>
              <a className="center flex-col cursor-pointer my-[10px] md:m-[20px] transition-all duration-500 text-center opacity-70 hover:opacity-100 hover:text-blue-2 grayscale-[1] hover:grayscale-0">
                <Image
                  src={item.teachers[0].avatar}
                  width={120}
                  height={120}
                  alt={item.teachers[0].nickname}
                  className="rounded-full "
                />
                <div className="text-[16px] my-[5px] font-bold">
                  {item.teachers[0].nickname}
                </div>
                {/* <div className="text-[12px] w-[120px]">{item.teacher_title}</div> */}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Teachers;
