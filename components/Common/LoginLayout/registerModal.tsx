import { message, Modal } from 'antd';
import React, { useState } from 'react';
import { CourseType, WebinarType } from 'types/course.type';
import { t } from 'i18next';
import AntButton from 'components/Common/AntButton';
import { faNumber } from 'utils/common.util';
import request from 'services/request';
import { DirectPayUrl, discountUrl, ratePayUrl, walletPayUrl } from 'services/routes';
import { StyledButton } from 'components/Common/commonStyle';
import { getChapterAction, getEventAction } from 'store/course/course.action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

type ModalType = {
  isVisible: boolean;
  setIsVisible: (status) => void;
  data: CourseType | WebinarType;
  url?: string;
};
const RegisterModal: React.FC<ModalType> = ({ isVisible, setIsVisible, data, url }) => {
  const { id } = data;
  const router = useRouter();
  const dispatch = useDispatch();
  const { eventId } = router.query;
  const [code, setCode] = useState('');
  const type = eventId ? 'event' : 'workshop';
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const price = discountPrice || Number(data.price);
  const discountAmount = Number(data.price) - discountPrice;

  const handleDiscount = async (): Promise<void> => {
    const body = { code, for: type, id_for: id };
    setDiscount(code);
    setLoading(true);
    const res: any = await request.post(discountUrl(), body); // eslint-disable-line
    setLoading(false);
    res.data.code ? message.success(res.data.msg) : message.warn(res.data.msg);
    res.data.code && setDiscountPrice(Number(res.data.price));
    res.data.code && url && router.push(url);
  };

  const handlePay = async (method): Promise<void> => {
    const href =
      method === 'rate'
        ? ratePayUrl(id, type)
        : method === 'wallet'
        ? walletPayUrl(id, type)
        : DirectPayUrl(id, type);
    const body = { code: discount };
    const res: any = // eslint-disable-line
      method !== 'rate' ? await request.post(href, body) : await request.get(href);
    res.ok ? message.success(res.data.message) : message.warn(res.data.message);
    res.ok &&
      (dispatch(eventId ? getEventAction(eventId) : getChapterAction(data.id)),
      setIsVisible(false));
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
          {data.title}
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
            loading={loading}
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

        <div className="flex flex-col w-full mt-[60px] text-[16px]">
          <div className="mb-[8px]">{t('course.choosePayMethod')}</div>
          <div>
            {['direct', 'rate', 'wallet'].map((item) => (
              <StyledButton
                type="primary"
                fontSize={18}
                ml="12px"
                height="40px"
                key={item}
                onClick={(): Promise<void> => handlePay(item)}
              >
                {t(`course.${item}Register`)}
              </StyledButton>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
