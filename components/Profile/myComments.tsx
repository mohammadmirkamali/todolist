import { Spin } from 'antd';
import { SModal } from 'components/Account/style';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { MyCommentsUrl, MyTransactionsUrl } from 'services/routes';
import { faNumber } from 'utils/common.util';

const MyComments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    const res = await request.get(MyCommentsUrl());
    setLoading(false);
    setShowModal(true);
    setData(res.data);
  };

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer hover:text-blue-0">
        {t('account.myComments')} <Spin spinning={loading} />
      </div>
      <SModal
        centered
        title={null}
        footer={null}
        width={600}
        destroyOnClose
        visible={showModal}
        onCancel={(): void => setShowModal(false)}
      >
        <div className="flex flex-col w-full ">
          <div className="self-center font-bold text-[18px]">
            {t('account.commentsList')}
          </div>
          <div className="flex flex-col  p-[16px] text-[16px]]">
            {data?.data.map((item, index) => (
              <div key={item.trackingCode} className="mb-[4px]">
                {faNumber(index + 1)}.{item.description} {item.title} (
                {faNumber(item.price.toLocaleString())})
              </div>
            ))}
          </div>
        </div>
      </SModal>
    </div>
  );
};

export default MyComments;
