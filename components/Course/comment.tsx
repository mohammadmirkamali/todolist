import React from 'react';
import { Avatar, Comment } from 'antd';
import { t } from 'i18next';
import { SComment } from './style';

const UserComment: React.FC = () => (
  <>
    <div className="h-[calc(100%-200px)] overflow-auto">
      {[1, 2, 3, 4, 5, 7, 8].map((item) => (
        <Comment
          key={item}
          className="px-[20px]"
          author={<a>کاربر</a>}
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={<p>این دوره خوبه یسی یسی سی ی سیبسیبل بلیبلبی ب لی بلی لیبلب</p>}
          datetime={<span>1/1/1400</span>}
        />
      ))}
    </div>
    <div className="w-full center flex-col">
      <textarea className="border border-gray-5 rounded-[8px] w-[270px] md:w-[300px] h-[100px] my-[15px] toLeft text-[16px] p-[10px]" />
      <SComment>{t('course.sendComment')}</SComment>
    </div>
  </>
);

export default UserComment;
