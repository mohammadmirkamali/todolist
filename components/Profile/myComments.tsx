import { Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { MyCommentsUrl } from 'services/routes';

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
    department: item.department,
    title3: item.text,
    status: item.status,
  }));

  const columns = ['title3', 'department', 'status'].map((item) => ({
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

            {/* {data?.data.map((item, index) => (
              <div key={item.trackingCode} className="mb-[4px]">
                {faNumber(index + 1)}.{item.description} {item.title} (
                {faNumber(item.price.toLocaleString())})
              </div>
            ))} */}
          </div>
        </div>
      </SModal>
    </div>
  );
};

export default MyComments;
