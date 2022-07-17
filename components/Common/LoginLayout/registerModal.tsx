import { message, Modal, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { CourseType, TermSettingType, TermType, WebinarType } from 'types/course.type';
import { t } from 'i18next';
import AntButton from 'components/Common/AntButton';
import { faNumber } from 'utils/common.util';
import request from 'services/request';
import { DirectPayUrl, discountUrl, walletPayUrl } from 'services/routes';
import { StyledButton } from 'components/Common/commonStyle';
import {
  getChapterAction,
  getEventAction,
  getExamInfoAction,
  getTermAction,
} from 'store/course/course.action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getUserAction } from 'store/account/account.action';

type ModalType = {
  isVisible: boolean;
  setIsVisible: (status) => void;
  data:
    | CourseType
    | WebinarType
    | TermType
    | { price: number; registered: boolean; id: string; title: string };
  url?: string;
  termData?: TermSettingType;
};
const RegisterModal: React.FC<ModalType> = (props) => {
  const { isVisible, setIsVisible, data, url, termData } = props;
  const id = data?.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const { eventId, termId, examId } = router.query;
  const [code, setCode] = useState('');
  const type = eventId ? 'event' : examId ? 'exam' : termId ? 'term' : 'workshop';
  const [loading, setLoading] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const price = discountPrice || Number(data?.price);
  const user = useSelector((state) => state.account.user);
  const discountAmount = Number(data?.price) - discountPrice;

  const handleDiscount = async (): Promise<void> => {
    const body = { code, for: type, id_for: id }; // eslint-disable-line
    setLoading('discount');
    const res: any = await request.post(discountUrl(), body); // eslint-disable-line
    setLoading(null);
    res.data.code ? message.success(res.data.msg) : message.warn(res.data.msg);
    res.data.code && setDiscountPrice(Number(res.data.price));
    res.data.code && url && router.push(url);
  };

  const handlePay = async (method): Promise<void> => {
    const href = method === 'wallet' ? walletPayUrl(id, type) : DirectPayUrl(id, type);

    let body: any = { code }; // eslint-disable-line
    body = termData ? { ...body, term_type: termData.term_type } : body; // eslint-disable-line
    setLoading(method);
    const res: any = await request.post(href, body); // eslint-disable-line
    setLoading(null);
    if (!res.ok) return;
    if (method === 'direct') {
      window.location.assign(res.data.link);
    } else {
      res.ok && message.success(res.data.message);
      res.ok &&
        (dispatch(
          termId
            ? getTermAction(termId)
            : examId
            ? getExamInfoAction(examId)
            : eventId
            ? getEventAction(eventId)
            : getChapterAction(data.id, !!user),
        ),
        dispatch(getUserAction()), // we need to get new user with this new course on it's workshop
        setIsVisible(false));
    }
  };

  return (
    <Modal
      title={null}
      footer={null}
      width={600}
      destroyOnClose
      visible={isVisible}
      onCancel={(): void => setIsVisible(false)}
    >
      <div className="center flex-col ">
        <div className="font-bold text-[24px] border-b border-b-gray-1 w-full text-center pb-[15px]">
          {data?.title} {termData ? `(${termData.name})` : ''}
        </div>

        <div className="my-[20px] flex w-full">
          <input
            className="border border-gray-1 text-[18px] toRight p-[5px] ml-[12px] focus:border-gray-2 rounded-[6px]"
            onChange={(e): void => setCode(e.target.value)}
            placeholder={t('global.discount')}
            value={code}
            type="text"
          />
          <AntButton
            width="120px"
            height="40px"
            fontSize={18}
            loading={loading === 'discount'}
            onClick={handleDiscount}
            disabled={!code.length}
          >
            {t('global.apply')}
          </AntButton>
        </div>

        <div className="flex w-full text-[18px]">
          {t('course.payAmount')} : {faNumber(price.toLocaleString())}{' '}
          {t('global.simpleTooman')}
        </div>
        {discountPrice && (
          <div className="flex w-full text-[16px] mt-[8px] text-green-3">
            {t('course.discountAmount')} {faNumber(discountAmount.toLocaleString())}
            {t('global.simpleTooman')}
          </div>
        )}

        <div className="flex w-full text-[16px] mt-[24px]">
          {t('global.walletCredit')} : {faNumber(Number(user?.price).toLocaleString())}
        </div>

        <div className="flex flex-col w-full mt-[16px] text-[16px]">
          <div className="mb-[8px]">{t('course.choosePayMethod')}</div>
          <div>
            <StyledButton
              type="primary"
              fontSize={16}
              ml="12px"
              height="40px"
              loading={loading === 'direct'}
              borderRadius="8px"
              onClick={(): Promise<void> => handlePay('direct')}
            >
              {t(`course.directRegister`)}
            </StyledButton>
            {['wallet'].map((item) => (
              <Popconfirm
                title={t('global.areYouSure')}
                onConfirm={(): Promise<void> => handlePay(item)}
                okText={t('global.yes')}
                showCancel={false}
                key={item}
              >
                <StyledButton
                  type="primary"
                  fontSize={16}
                  loading={loading === item}
                  ml="12px"
                  height="40px"
                  borderRadius="8px"
                >
                  {t(`course.${item}Register`)}
                </StyledButton>
              </Popconfirm>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
