import React, { useState } from 'react';
import { t } from 'i18next';
import { SComment } from './style';
import { CommentsType, QuestionsType } from 'types/course.type';
import AntComment from 'components/Common/AntComment';
import AntButton from 'components/Common/AntButton';
import {
  CommentUrl,
  QuestionUrl,
  SendCommentUrl,
  SendQuestionUrl,
} from 'services/routes';
import request from 'services/request';
import { message, Skeleton } from 'antd';

type CommentType = {
  data: CommentsType[] | QuestionsType[];
  comment?: boolean;
  id: number;
};
const UserComment: React.FC<CommentType> = ({ data, comment, id }) => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(data);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    const body = comment ? { text: description } : { title, description };
    setSendLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await request.post(
      comment ? SendCommentUrl(id) : SendQuestionUrl(id),
      body,
    );
    setSendLoading(false);
    if (res.ok) {
      message.success(res.data.message);
      setDescription('');
      setTitle('');
    } else {
      message.warn(res.data.message);
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    const url = comment ? CommentUrl(id, 1) : QuestionUrl(id);
    setLoading(true);
    const res: any = await request.get(url); // eslint-disable-line
    setLoading(false);
    res.ok && (setAllData(res.data.data), setAllDataLoaded(true));
  };
  const text = comment ? 'text' : 'description';
  const name = comment ? 'nickname' : 'title';
  const date = comment ? '1/1/1402' : null;

  return (
    <>
      <div className={`h-[calc(100%-${comment ? 200 : 240}px)] overflow-auto`}>
        {allData.map((item) => (
          <AntComment
            text={item[text]}
            avatar={item.avatar}
            name={item[name]}
            date={item[date]}
            key={item[text]}
          >
            {item.answer && (
              <AntComment
                text={item.answer[text]}
                avatar={item.answer.avatar}
                name={item.answer[name]}
                date={item.answer[date]}
              />
            )}
          </AntComment>
        ))}
        {data.length > 10 && (
          <div className="w-full px-[30px] text-center mb-[40px]">
            {allDataLoaded ? null : loading ? (
              <Skeleton active />
            ) : (
              <AntButton width="200px" onClick={handleLoadMore}>
                {t('course.loadMore')}
              </AntButton>
            )}
          </div>
        )}
      </div>
      <div className="w-full center flex-col toLeft text-[16px]">
        {!comment && (
          <div className="self-start pr-[27px] text-[14px] mt-[12px]">
            {t('global.title3')}
          </div>
        )}
        {!comment && (
          <input
            className="border border-gray-5 rounded-[8px] w-[270px] md:w-[300px] h-[40px] p-[10px]"
            placeholder={t('global.title3')}
            value={title}
            onChange={(e): void => setTitle(e.target.value)}
          />
        )}
        <textarea
          onChange={(e): void => setDescription(e.target.value)}
          placeholder={t('global.description')}
          value={description}
          className="border border-gray-5 rounded-[8px] w-[270px] md:w-[300px] h-[100px] my-[15px] p-[10px]"
        />
        <SComment
          onClick={handleSubmit}
          loading={sendLoading}
          disabled={comment ? !description : !(description && title)}
        >
          {t(`course.${comment ? 'sendComment' : 'sendQuestion'}`)}
        </SComment>
      </div>
    </>
  );
};

export default UserComment;
