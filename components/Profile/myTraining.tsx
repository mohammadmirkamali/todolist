import { Skeleton, Spin } from 'antd';
import { SModal } from 'components/Account/style';
import { SPlyr } from 'components/Lesson';
import { t } from 'i18next';
import React, { useState } from 'react';
import request from 'services/request';
import { CourseRoute, LessonRoute, MyTrainingUrl } from 'services/routes';
import { faNumber } from 'utils/common.util';
import Plyr from 'plyr-react';
import AntButton from 'components/Common/AntButton';
import Link from 'next/link';

const MyTraining: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const handleLoadMore = async (): Promise<void> => {
    setPageLoading(true);
    const res: any = await request.get(MyTrainingUrl(page + 1)); // eslint-disable-line
    setPageLoading(false);
    setPage(page + 1);
    res.ok && setList([...list, ...res.data.data]);
  };

  const handleClick = async (): Promise<boolean> => {
    setLoading(true);
    const res: any = await request.get(MyTrainingUrl()); // eslint-disable-line
    setLoading(false);
    if (res.ok) {
      setShowModal(true);
      setList(res.data.data);
      setPage(1);
      res.data.meta.c;
      return true;
    }
    return null;
  };

  return (
    <div className="mb-[12px]">
      <div onClick={handleClick} className="cursor-pointer hover:text-blue-0">
        {t('account.myTrainings')} <Spin spinning={loading} />
      </div>
      <SModal
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

          <div className="flex flex-wrap gap-[16px] justify-center">
            {list.map((item) => (
              <div
                className="w-[300px] border border-gray-5 rounded-[8px] p-[12px]"
                key={item.title}
              >
                <div>{`${t('global.title3')}: ${item?.title}`}</div>
                <div>{`${t('global.description')}: ${item?.description}`}</div>
                <div>
                  {`${t('global.workshopTitle')}:`}{' '}
                  <Link href={CourseRoute(item.workshop_id, item?.workshop_title)}>
                    <a>{item?.workshop_title}</a>
                  </Link>
                </div>
                <div>
                  {`${t('global.lessonTitle')}:`}{' '}
                  <Link
                    href={LessonRoute(
                      item.workshop_id,
                      item.lesson_id,
                      item?.lesson_title,
                    )}
                  >
                    <a>{item?.lesson_title}</a>
                  </Link>
                </div>
                <div>{`${t('global.hasane')}: ${faNumber(item?.score)}`}</div>
                <div>
                  {`${t('global.reviewerComment')}:`}{' '}
                  <span>
                    {!item.comment ? (
                      t('global.waitingForReviewer')
                    ) : item?.comment_type === 2 ? (
                      <SPlyr>
                        <Plyr
                          source={{ type: 'audio', sources: [{ src: item?.comment }] }}
                        />
                      </SPlyr>
                    ) : (
                      item?.comment
                    )}
                  </span>{' '}
                </div>
              </div>
            ))}
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

export default MyTraining;
