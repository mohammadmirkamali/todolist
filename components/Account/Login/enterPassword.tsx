import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import * as Yup from 'yup';
import { message } from 'antd';
import { postLoginAction } from 'store/account/account.action';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import request from 'services/request';
import { ForgetPasswordUrl } from 'services/routes';

type PasswordType = { auth: string; setStep: (item) => void };
const EnterPassword: React.FC<PasswordType> = ({ auth, setStep }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.userLoading);
  const validationSchema = Yup.object({
    password: Yup.string().required(t('account.emptyField')),
  });

  const onForgot = async (): Promise<void> => {
    const body = { auth, AuthType: 'mobile' };
    const res = await request.post(ForgetPasswordUrl(), body);
    if (res.ok) {
      setStep('forgotPasswordCode');
    } else {
      message.error(t('global.apiError'));
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.enterPassword')}</div>

      <AppForm
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values): void => {
          const body = { auth, AuthType: 'mobile', password: values.password };
          dispatch(postLoginAction(body));
        }}
      >
        <FormField
          name="password"
          type="password"
          placeholder={t('account.password')}
          className="w-[250px] md:w-[400px] rtl h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] mt-[60px] "
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />

        <div onClick={onForgot} className="link mt-[10px] text-[16px]" aria-hidden="true">
          {t('account.forgotPassword')}
        </div>
      </AppForm>
    </div>
  );
};

export default EnterPassword;
