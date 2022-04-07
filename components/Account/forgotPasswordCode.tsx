import React, { useState } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { t } from 'i18next';
import * as Yup from 'yup';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import request from 'services/request';
import { ForgetPasswordCodedUrl } from 'services/routes';
import { postLoginAction } from 'store/account/account.action';

type ForgotType = { setStep: (num) => void; auth: string };
const ForgotPasswordCode: React.FC<ForgotType> = ({ setStep, auth }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    number: Yup.number().required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.forgotPassword')}</div>

      <AppForm
        initialValues={{ number: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values): Promise<void> => {
          setLoading(true);
          const body = { auth, AuthType: 'mobile', code: values.number };
          const res: any = await request.post(ForgetPasswordCodedUrl(), body); // eslint-disable-line
          setLoading(false);
          if (res.ok) {
            if (res.data.error) {
              message.error(res.data.error);
            } else {
              dispatch(postLoginAction(res.data.user));
              setStep('forgotPasswordNew');
            }
          } else {
            message.error(t('global.apiError'));
          }
        }}
      >
        <p className="w-full m-0 mt-[60px] ">{t('account.code')}</p>
        <FormField
          autoFocus
          name="number"
          type="number"
          placeholder="1234"
          className="w-[250px] md:w-[400px] toRight h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] "
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default ForgotPasswordCode;
