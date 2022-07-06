import { t } from 'i18next';
import Link from 'next/link';
import React from 'react';
import { ProfileRoute } from 'services/routes';
import { TeacherType } from 'types/course.type';
import { TeacherAvatar } from 'utils/component.util';

type TeacherLinkType = {
  size?: number;
  teacher: TeacherType;
  className?: string;
};
const TeacherLink: React.FC<TeacherLinkType> = ({ teacher, className, size = 50 }) => (
  <Link href={ProfileRoute(teacher?.id, teacher?.nickname || teacher?.family)}>
    <a
      className={`${className} py-[20px] flex items-center cursor-pointer text-gray-10 hover:text-black duration-300`}
    >
      <TeacherAvatar teacher={teacher} size={size} />
      <div className="mr-[10px] ">
        <div className="font-bold text-[18px]">
          {teacher?.nickname || teacher?.family}
        </div>
        <div className="text-[14px]">{teacher?.title || t('global.teacher')}</div>
      </div>
    </a>
  </Link>
);

export default TeacherLink;
