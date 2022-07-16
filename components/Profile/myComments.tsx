import { Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import { t } from 'i18next';
import Link from 'next/link';
import React, { useState } from 'react';
import request from 'services/request';
import { CourseRoute, MyCommentsUrl, WebinarRoute } from 'services/routes';

const MyComments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async (): Promise<boolean> => {
    setLoading(true);
    const res = await request.get(MyCommentsUrl());
    setLoading(false);
    if (res.ok) {
      setShowModal(true);
      setData(res.data);
      return true;
    }
    return null;
  };

  const dataSource = data?.data.map((item) => ({
    department: (
      <Link
        href={
          item.en_department === 'event'
            ? WebinarRoute(item.department_id, item.title)
            : CourseRoute(item.department_id, item.title)
        }
      >
        <a>{item.title}</a>
      </Link>
    ),
    title3: item.text,
    status: item.status,
    answer: item.answer?.text,
  }));

  const columns = ['title3', 'department', 'status', 'answer'].map((item) => ({
    title: t(`global.${item}`),
    dataIndex: item,
  }));

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer hover:text-blue-0">
        {t('account.myComments')} <Spin spinning={loading} />
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
          <div className="self-center font-bold text-[18px]">
            {t('account.commentsList')}
          </div>
          <div className="flex flex-col  p-[16px] text-[16px]]">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </div>
        </div>
      </SModal>
    </div>
  );
};

export default MyComments;
