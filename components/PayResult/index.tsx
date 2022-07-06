import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import request from 'services/request';
import {
  CourseRoute,
  ExamInfoRoute,
  PayResultUrl,
  ProfileRoute,
  WebinarRoute,
} from 'services/routes';
import { getUserAction } from 'store/account/account.action';

const PayResult: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const { Authority, Status } = router.query;

    const sendData = async (): Promise<void> => {
      const res: any = await request.post(PayResultUrl(), { Authority, Status }); // eslint-disable-line
      res?.data?.type === 'exam' && router.push(ExamInfoRoute(res.data.product_id));
      res?.data?.type === 'wallet' &&
        router.push(ProfileRoute('user', t('global.profile')));
      res?.data?.type === 'workshop' &&
        router.push(CourseRoute(res.data.product_id, t('global.course')));
      res?.data?.type === 'event' &&
        router.push(WebinarRoute(res.data.product_id, t('global.event')));
      dispatch(getUserAction());
    };
    if (Status) {
      setStatus(Status === 'OK');
      sendData();
    }
  }, [router]);
  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-70px)] bg-blue-7">
      <div className="w-screen mx-[24px] relative min-h-[400px] md:w-[800px] mt-[60px] mb-[40px] md:mt-[40px] shadow-lg rounded-[8px] bg-white flex flex-col items-center p-[25px] md:p-[40px]">
        {status && (
          <div className="text-[72px] text-green-5">
            <CheckCircleOutlined />
          </div>
        )}
        {status && (
          <div className="text-[24px] md:text-[32px] text-center mt-[16px] text-green-5">
            {t('global.successPay')}
          </div>
        )}

        {!status && (
          <div className="text-[72px] text-red-0">
            <CloseCircleOutlined />
          </div>
        )}
        {!status && (
          <div className="text-[24px] md:text-[32px] text-center mt-[16px] text-red-0">
            {t('global.failedPay')}
          </div>
        )}

        <div className="text-[16px] mt-[72px] md:text-[20px] text-center mt-[16px]">
          {t('global.redirectToSite')} <Spin />
        </div>
      </div>
    </div>
  );
};

export default PayResult;
