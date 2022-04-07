import React, { useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import { EmailVerifyUrl, MobileVerifyUrl } from 'services/routes';
import FormField from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import { SSubmitForm } from './style';
import request from 'services/request';
import { postLoginAction } from 'store/account/account.action';

type CodeType = { setStep: (num) => void; mobile: string; step: string };
const EnterCode: React.FC<CodeType> = ({ setStep, mobile, step }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isEmail = step === 'AuthVerifyEmail';
  const url = isEmail ? EmailVerifyUrl() : MobileVerifyUrl();
  const validationSchema = Yup.object({
    number: Yup.number().required(t('account.enterNumber')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">
        {t(`account.${isEmail ? 'addEmailCode' : 'addMobileCode'}`)}
      </div>

      <AppForm
        initialValues={{ number: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values): Promise<void> => {
          setLoading(true);
          const body = { [isEmail ? 'email' : 'mobile']: mobile, code: values.number };
          const res: any = await request.post(url, body); // eslint-disable-line
          setLoading(false);
          if (res.ok) {
            dispatch(postLoginAction(res.data.user));
            setStep('fillForm');
          } else {
            message.error(res.status === 400 ? res.data.error : t('global.apiError'));
          }
        }}
      >
        <FormField
          autoFocus
          name="number"
          type="number"
          placeholder="1234"
          className="w-[250px] md:w-[400px] toRight h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] mt-[60px] "
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default EnterCode;
