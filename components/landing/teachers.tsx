import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileRoute } from 'services/routes';
import user from 'public/user.svg';

const Teachers: React.FC = () => {
  const searchData = useSelector((state) => state.course.searchData);
  const teachers = [...(searchData?.workshops || []), ...(searchData?.events || [])]
    .map((item) => item.teachers)
    .flat()
    .filter((k) => k.nickname !== null);

  const uniqueTeachers = [...new Set(teachers.map((item) => item.id))].map((id) =>
    teachers.find((teacher) => teacher.id === id),
  );

  return (
    !!uniqueTeachers.length && (
      <div className="center flex-col overflow-hidden">
        <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
          {t('global.teachers')}
        </h2>

        <div className="grid grid-cols-[repeat(2,170px)] md:grid-cols-[repeat(5,220px)]">
          {uniqueTeachers.map((teacher) => {
            return (
              <Link
                href={ProfileRoute(teacher.id, teacher.nickname || teacher.family)}
                key={teacher.id}
                passHref
              >
                <a className="center flex-col cursor-pointer my-[10px] md:m-[20px] transition-all duration-500 text-center opacity-70 hover:opacity-100 hover:text-blue-2 grayscale-[1] hover:grayscale-0">
                  <Image
                    src={teacher.avatar || user}
                    width={120}
                    height={120}
                    alt={teacher.nickname}
                    className="rounded-full "
                  />
                  <div className="text-[16px] my-[5px] font-bold">
                    {teacher.nickname || teacher.family}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Teachers;
