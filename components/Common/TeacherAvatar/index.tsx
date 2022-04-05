import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProfileRoute } from 'services/routes';

type TeacherType = { name: string; img: string; title: string; className?: string };
const TeacherAvatar: React.FC<TeacherType> = ({ name, img, title, className }) => (
  <Link href={ProfileRoute(name.replaceAll(' ', '-'))}>
    <a
      className={`${className} py-[20px] flex items-center cursor-pointer text-gray-10 hover:text-black duration-300`}
    >
      <Image
        src={img}
        width={50}
        height={50}
        priority
        alt={name}
        className="rounded-full"
      />
      <div className="mr-[10px] ">
        <div className="font-bold text-[18px]">{name}</div>
        <div className="text-[14px]">{title}</div>
      </div>
    </a>
  </Link>
);

export default TeacherAvatar;
