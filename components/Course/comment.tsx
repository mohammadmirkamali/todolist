import React from 'react';
import { t } from 'i18next';
import { SComment } from './style';
import { CommentsType } from 'types/course.type';
import AntComment from 'components/Common/AntComment';

const UserComment: React.FC<{ comments: CommentsType[] }> = ({ comments }) => {
  const handleSubmit = (): void => {
    // todo:
  };
  return (
    <>
      <div className="h-[calc(100%-200px)] overflow-auto">
        {comments.map(({ nickname, avatar, text, answer }) => (
          <AntComment
            text={text}
            avatar={avatar}
            name={nickname}
            date="1/1/1401"
            key={text}
          >
            {answer && (
              <AntComment
                text={answer.text}
                avatar={answer.avatar}
                name={answer.nickname}
                date="1/1/1401"
              />
            )}
          </AntComment>
        ))}
      </div>
      <div className="w-full center flex-col">
        <textarea className="border border-gray-5 rounded-[8px] w-[270px] md:w-[300px] h-[100px] my-[15px] toLeft text-[16px] p-[10px]" />
        <SComment onClick={handleSubmit}>{t('course.sendComment')}</SComment>
      </div>
    </>
  );
};

export default UserComment;
