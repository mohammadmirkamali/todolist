import React, { useState } from 'react';
import { message } from 'antd';
import { t } from 'i18next';
import * as Yup from 'yup';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import request from 'services/request';
import { ForgetPasswordNewUrl } from 'services/routes';

type ForgotType = { setIsVisible: (num) => void; setStep: (num) => void };
const ForgotPasswordNew: React.FC<ForgotType> = ({ setIsVisible, setStep }) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    value: Yup.string().min(8, t('account.min8')).required(t('account.emptyField')),
    confirm: Yup.string()
      .min(8, t('account.min8'))
      .oneOf([Yup.ref('value'), null], t('account.notMatch'))
      .required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold text-center">
        {t('account.chooseNewPassword')}
      </div>

      <AppForm
        initialValues={{ value: '', confirm: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values): Promise<void> => {
          setLoading(true);
          const body = { password: values.value };
          const res = await request.post(ForgetPasswordNewUrl(), body);
          setLoading(false);
          if (res.ok) {
            setIsVisible(false);
            setStep('number');
            message.success(t('account.successChangePassword'));
          } else {
            message.error(t('global.apiError'));
          }
        }}
      >
        <p className="w-full m-0 mt-[60px] ">{t('account.newPassword')}</p>
        <FormField
          autoFocus
          name="value"
          type="password"
          placeholder={t('account.newPassword')}
          className="w-[250px] md:w-[400px] rtl h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] "
        />
        <p className="w-full m-0 mt-[30px] ">{t('account.repeatNewPassword')}</p>
        <FormField
          name="confirm"
          type="password"
          placeholder={t('account.repeatNewPassword')}
          className="w-[250px] md:w-[400px] rtl h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] "
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default ForgotPasswordNew;
