import { Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { MyQuestionsUrl } from 'services/routes';

const MyQuestions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    const res = await request.get(MyQuestionsUrl());
    setLoading(false);
    setShowModal(true);
    setData(res.data);
  };

  const dataSource = data?.data.map((item) => ({
    question: item.description,
    title3: item.title,
    status: t(`global.${item.type === 'public' ? 'public' : 'private'}`),
  }));

  const columns = ['title3', 'question', 'status'].map((item) => ({
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
        <div className="flex flex-col w-full ">
          <div className="self-center font-bold text-[18px] mb-[24px]">
            {t('account.questionList')}
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </SModal>
    </div>
  );
};

export default MyQuestions;
