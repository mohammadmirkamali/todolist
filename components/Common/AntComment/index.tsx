import { UserOutlined } from '@ant-design/icons';
import { Avatar, Comment } from 'antd';
import React from 'react';

type CommentType = {
  text: string;
  name: string;
  avatar?: string;
  date?: string;
  title?: string;
};
const AntComment: React.FC<CommentType> = (props) => {
  const { children, text, name, avatar, date, title } = props;
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
          {title && <div className="font-bold">{title}</div>} {text}
        </div>
      }
      datetime={<span>{date}</span>}
    >
      {children}
    </Comment>
  );
};

export default AntComment;
