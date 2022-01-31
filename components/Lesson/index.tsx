import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import Image from 'next/image';
import React from 'react';

const Lesson: React.FC = () => {
  const lessons = [1, 2, 3, 4];
  return (
    <div className="pt-[70px] bg-gray-0 min-h-screen">
      <div className="w-[300px] h-[470px] md:w-[600px]   xl:fixed right-0 top-[70px] bg-white xl:w-[300px] xl:h-[calc(100%-70px)]">
        <div className="h-[70px] center w-full border-b-gray-1 flex justify-between px-[40px] border-b font-bold text-[18px]">
          <RightOutlined className="text-[20px] hover:translate-x-[5px] duration-500 cursor-pointer" />
          <Image
            src="/book.webp"
            width={40}
            height={40}
            className="hover:translate-y-[-5px] duration-500 cursor-pointer"
          />
          <LeftOutlined className="text-[20px] hover:translate-x-[-5px] duration-500 cursor-pointer" />
        </div>
        <div className="overflow-auto h-[400px] xl:h-[100%] toRight pb-[200px] ">
          {lessons.map((item) => (
            <div
              key={item}
              className="text-[16px] px-[40px] cursor-pointer toLeft py-[20px] hover:bg-gray-4 duration-300"
            >
              {t('global.course')} {item}
            </div>
          ))}
        </div>
        <div className="h-[70px] center w-full border-b-gray-1 border-b font-bold text-[18px]">
          {t('course.lessons')}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
