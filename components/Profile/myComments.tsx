import { Skeleton, Spin, Table } from 'antd';
import { SModal } from 'components/Account/style';
import AntButton from 'components/Common/AntButton';
import { t } from 'i18next';
import Link from 'next/link';
import React, { useState } from 'react';
import request from 'services/request';
import { CourseRoute, MyCommentsUrl, WebinarRoute } from 'services/routes';

const MyComments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const handleClick = async (): Promise<boolean> => {
    setLoading(true);
    const res: any = await request.get(MyCommentsUrl()); // eslint-disable-line
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
    const res: any = await request.get(MyCommentsUrl(page + 1)); // eslint-disable-line
    setPageLoading(false);
    setPage(page + 1);
    res.ok && setList([...list, ...res.data.data]);
  };

  const dataSource = list.map((item) => ({
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
    answer: item.answer?.text,
  }));

  const columns = ['title3', 'department', 'answer'].map((item) => ({
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

export default MyComments;
