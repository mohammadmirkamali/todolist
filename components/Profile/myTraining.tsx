import { Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import { SPlyr } from 'components/Lesson';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { MyTrainingUrl } from 'services/routes';
import { faNumber, PLAYER_CONTROLS } from 'utils/common.util';
import Plyr from 'plyr-react';

const MyTraining: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async (): Promise<boolean> => {
    setLoading(true);
    const res = await request.get(MyTrainingUrl());
    setLoading(false);
    if (res.ok) {
      setShowModal(true);
      setData(res.data);
      return true;
    }
    return null;
  };

  const dataSource = data?.data.map((item) => ({
    description: item.description,
    title3: item.title,
    workshopTitle: item.workshop_title,
    lessonTitle: item.lesson_title,
    hasane: faNumber(item.score),
    reviewerComment:
      item.comment_type === 2 ? (
        <SPlyr>
          <Plyr
            source={{ type: 'audio', sources: [{ src: item.comment }] }}
            options={{ controls: PLAYER_CONTROLS }}
          />
        </SPlyr>
      ) : (
        item.comment
      ),
  }));

  const columns = [
    'title3',
    'description',
    'workshopTitle',
    'lessonTitle',
    'hasane',
    'reviewerComment',
  ].map((item) => ({
    title: t(`global.${item}`),
    dataIndex: item,
  }));

  return (
    <div className="mb-[12px]">
      <div onClick={handleClick} className="cursor-pointer hover:text-blue-0">
        {t('account.myTrainings')} <Spin spinning={loading} />
      </div>
      <SModal
        centered
        title={null}
        footer={null}
        width={1400}
        destroyOnClose
        visible={showModal}
        onCancel={(): void => setShowModal(false)}
      >
        <div className="flex flex-col w-full self-start">
          <div className="self-center font-bold text-[18px] mb-[24px]">
            {t('account.trainingList')}
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </SModal>
    </div>
  );
};

export default MyTraining;
