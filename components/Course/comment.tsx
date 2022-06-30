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
import { faNumber } from 'utils/common.util';

type CommentType = {
  data: CommentsType[] | QuestionsType[];
  comment?: boolean;
  notAllowToAsk?: boolean;
  register: boolean;
  id: number;
  type: 'workshops' | 'events';
};
const UserComment: React.FC<CommentType> = (props) => {
  const { data, comment, id, register, type, notAllowToAsk } = props;
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(data);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);
  const [sendLoading, setSendLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    const body = comment ? { text: description } : { title, description };
    setSendLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await request.post(
      comment ? SendCommentUrl(id, type) : SendQuestionUrl(id, type),
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
    const url = comment ? CommentUrl(id, page) : QuestionUrl(id);
    setLoading(true);
    const res: any = await request.get(url); // eslint-disable-line
    setLoading(false);
    setPage(page + 1);
    res.ok && setAllData([...allData, ...res.data.data]);
  };
  const text = comment ? 'text' : 'description';
  const name = comment ? 'nickname' : 'title';

  return (
    <div className="h-full overflow-hidden relative">
      <div className="h-[calc(100%-240px)] overflow-auto">
        {allData.map((item) => (
          <AntComment
            text={item[text]}
            avatar={item.avatar}
            name={item[name]}
            date={faNumber(item?.date?.split(' ')[0])}
            key={item[text]}
          >
            {item.answer && (
              <AntComment
                text={item.answer[text]}
                avatar={item.answer.avatar}
                name={item.answer[name]}
                date={faNumber(item?.date?.split(' ')[0])}
              />
            )}
          </AntComment>
        ))}
        {allData.length === 20 * page && (
          <div className="w-full px-[30px] text-center mb-[30px]">
            {loading ? (
              <Skeleton active />
            ) : (
              <AntButton width="200px" onClick={handleLoadMore}>
                {t('course.loadMore')}
              </AntButton>
            )}
          </div>
        )}
      </div>
      {register && !notAllowToAsk && (
        <div className="w-full center flex-col toLeft text-[16px]">
          {!comment && (
            <div>
              <div className="self-start pr-[8px] text-[13px] mt-[12px]">
                {t('global.title3')}
              </div>
              <input
                className="border border-gray-5 rounded-[8px] w-[270px] md:w-[300px] h-[40px] p-[10px]"
                placeholder={t('global.title3')}
                value={title}
                onChange={(e): void => setTitle(e.target.value)}
              />
            </div>
          )}

          <textarea
            onChange={(e): void => setDescription(e.target.value)}
            placeholder={t(`global.${comment ? 'comment' : 'description'}`)}
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
      )}
    </div>
  );
};

export default UserComment;
