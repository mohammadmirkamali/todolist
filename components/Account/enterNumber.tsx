import React, { useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { SSubmitForm } from './style';
import FormField from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import request from 'services/request';
import { CheckAuthEmailUrl, CheckAuthPhoneUrl } from 'services/routes';

type NumberType = { setStep: (item) => void; setMobile: (item) => void };

const EnterNumber: React.FC<NumberType> = ({ setStep, setMobile }) => {
  const [loading, setLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const url = isEmail ? CheckAuthEmailUrl() : CheckAuthPhoneUrl();
  const validationSchema = Yup.object({
    number: isEmail
      ? Yup.string().email(t('account.validEmail')).required(t('account.emptyField'))
      : Yup.number().required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[26px] font-bold">{t('account.signIn')}</div>
      <div className="text-[18px] mt-[15px]">
        {t(`account.signInInfo${isEmail ? 'Email' : ''}`)}
      </div>

      {isEmail && (
        <div
          onClick={(): void => setIsEmail(false)}
          aria-hidden="true"
          className="absolute top-[10px] right-[25px] link text-[20px]"
        >
          <ArrowRightOutlined />
        </div>
      )}

      <AppForm
        initialValues={{ number: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values): Promise<void> => {
          setLoading(true);
          const body = isEmail
            ? { email: values.number }
            : { phone: `0${values.number}` };
          const res: any = await request.post(url, body); // eslint-disable-line
          setLoading(false);
          if (res.ok) {
            setStep(res.data.next);
            setMobile(isEmail ? values.number : res.data.mobile);
            res.data.next !== 'loginUsingPassword' &&
              message.success(t(isEmail ? 'account.emailCode' : 'account.messageCode'));
          } else {
            message.error(t('global.apiError'));
          }
        }}
      >
        <FormField
          name="number"
          type={isEmail ? 'email' : 'number'}
          placeholder={t(`account.${isEmail ? 'email' : 'number'}`)}
          className="w-[250px] md:w-[400px] toRight h-[50px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px] mt-[50px]"
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
      {!isEmail && (
        <div
          onClick={(): void => setIsEmail(true)}
          className="text-[16px] mt-[10px] link"
          aria-hidden="true"
        >
          {t('account.loginEmail')}
        </div>
      )}
    </div>
  );
};

export default EnterNumber;
