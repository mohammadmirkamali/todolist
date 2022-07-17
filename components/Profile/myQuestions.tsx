import { Skeleton, Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import AntButton from 'components/Common/AntButton';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { MyQuestionsUrl } from 'services/routes';

const MyQuestions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const handleClick = async (): Promise<boolean> => {
    setLoading(true);
    const res: any = await request.get(MyQuestionsUrl()); // eslint-disable-line
    setLoading(false);
    if (res.ok) {
      setShowModal(true);
      setList(res.data.data);
      return true;
    }
    return null;
  };

  const handleLoadMore = async (): Promise<void> => {
    setPageLoading(true);
    const res: any = await request.get(MyQuestionsUrl(page + 1)); // eslint-disable-line
    setPageLoading(false);
    setPage(page + 1);
    res.ok && setList([...list, ...res.data.data]);
  };

  const dataSource = list.map((item) => ({
    question: item.description,
    title3: item.title,
    answer: (
      <div>
        {item?.answers?.map((key) => (
          <div key={item.id}>{key.content}</div>
        ))}
      </div>
    ),
    status: t(
      `global.${
        item.state === 0 ? 'waitingToAnswer' : item.state === 1 ? 'approved' : 'answered'
      }`,
    ),
  }));

  const columns = ['title3', 'question', 'status', 'answer'].map((item) => ({
    title: t(`global.${item}`),
    dataIndex: item,
  }));

  return (
    <div className="mb-[12px]">
      <div onClick={handleClick} className="cursor-pointer hover:text-blue-0">
        {t('account.myQuestions')} <Spin spinning={loading} />
      </div>
      <SModal
        centered
        title={null}
        footer={null}
        width={900}
        destroyOnClose
        visible={showModal}
        onCancel={(): void => setShowModal(false)}
      >
        <div className="flex flex-col w-full self-start">
          <div className="self-center font-bold text-[18px] mb-[24px]">
            {t('account.questionList')}
          </div>

          <Table dataSource={dataSource} columns={columns} pagination={false} />

          {list.length === 20 * page && (
            <div className="w-full px-[30px] text-center my-[30px]">
              {pageLoading ? (
                <Skeleton active />
              ) : (
                <AntButton width="200px" onClick={handleLoadMore}>
                  {t('course.loadMore')}
                </AntButton>
              )}
            </div>
          )}
        </div>
      </SModal>
    </div>
  );
};

export default MyQuestions;
