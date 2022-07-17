import { UserOutlined } from '@ant-design/icons';
import { Avatar, Comment } from 'antd';
import React from 'react';
import Plyr from 'plyr-react';
import { SPlyr } from 'components/Lesson';

type CommentType = {
  text: string;
  name: string;
  avatar?: string;
  date?: string;
  title?: string;
  voice?: boolean;
};
const AntComment: React.FC<CommentType> = (props) => {
  const { children, text, name, avatar, date, title, voice } = props;
  return (
    <Comment
      key={text}
      className="px-[20px]"
      author={<div>{name}</div>}
      avatar={
        avatar ? (
          <Avatar src={avatar} alt="avatar" />
        ) : (
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        )
      }
      content={
        <div>
          {title && <div className="font-bold">{title}</div>}{' '}
          {voice ? (
            <SPlyr className="mr-[-12px]">
              <Plyr
                source={{ type: 'audio', sources: [{ src: text }] }}
                options={{ controls: ['play'] }}
              />
            </SPlyr>
          ) : (
            text
          )}
        </div>
      }
      datetime={<span>{date}</span>}
    >
      {children}
    </Comment>
  );
};

export default AntComment;
