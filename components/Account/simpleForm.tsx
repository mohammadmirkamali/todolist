import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FormField from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import { getUserAction, postLoginAction } from 'store/account/account.action';
import {
  CheckAuthEmailUrl,
  CheckAuthPhoneUrl,
  EmailVerifyUrl,
  LoginUrl,
  MobileVerifyUrl,
} from 'services/routes';
import { SSubmitForm } from './style';
import { ArrowLeftOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormType = { loginData: any; setIsVisible: (value) => void };
const SimpleForm: React.FC<FormType> = ({ loginData, setIsVisible }) => {
  const [step, setStep] = useState(loginData?.next || 'enterNumber');
  const loading = useSelector((state) => state.account.loginLoading);
  const dispatch = useDispatch();
  const rawData = {
    data: {
      next: step === 'enterEmail' ? 'enterNumber' : 'enterEmail',
    },
    ok: true,
  };
  let data = []; // [title,subtitle,url,input type, placeholder]
  let body = (value): object => ({ value });
  let yup = null;

  useEffect(() => {
    loginData && setStep(loginData?.next);
  }, [loginData]);

  switch (step) {
    case 'enterNumber':
      data = ['signIn', 'signInInfo', CheckAuthPhoneUrl(), 'number', 'number'];
      body = (value): object => ({ phone: `0${value}` });
      yup = Yup.number()
        .required(t('account.emptyField'))
        .min(11, t('account.wrongNumber'));
      break;

    case 'loginUsingPassword':
      data = ['enterPassword', null, LoginUrl(), 'password', 'password'];
      body = (value): object => ({ mobile: loginData.mobile, password: value });
      yup = Yup.string().required(t('account.emptyField'));
      break;

    case 'enterEmail':
      data = ['signIn', 'signInInfoEmail', CheckAuthEmailUrl(), 'email', 'email'];
      body = (value): object => ({ email: value });
      yup = Yup.string().email(t('account.validEmail')).required(t('account.emptyField'));
      break;

    case 'VerifyEmail':
      data = ['addEmailCode', null, EmailVerifyUrl(), 'number', 'code'];
      body = (value): object => ({ email: loginData.email, code: value });
      yup = Yup.string().email(t('account.validEmail')).required(t('account.emptyField'));
      break;

    case 'verifyCode':
      data = ['addMobileCode', null, MobileVerifyUrl(), 'number', 'code'];
      body = (value): object => ({ email: loginData.mobile, code: value.toString() });
      yup = Yup.number().required(t('account.emptyField'));
      break;

    default:
      break;
  }

  const validationSchema = Yup.object({ value: yup });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[26px] font-bold">{t(`account.${data[0]}`)}</div>
      {data[1] && <div className="text-[18px] mt-[15px]">{t(`account.${data[1]}`)}</div>}

      {step === 'VerifyEmail' ? (
        <div className="absolute right-[24px] top-[16px] text-gray-14">
          <ArrowLeftOutlined
            className="text-[25px] cursor-pointer"
            onClick={(): void => setStep(`enterEmail`)}
          />
        </div>
      ) : (
        step === 'verifyCode' && (
          <div className="absolute right-[24px] top-[16px] text-gray-14">
            <ArrowLeftOutlined
              className="text-[25px] cursor-pointer"
              onClick={(): void => setStep(`enterNumber`)}
            />
          </div>
        )
      )}

      <AppForm
        initialValues={{ value: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }): Promise<void> => {
          const result = await dispatch(
            postLoginAction(step, data[2], body(values.value)),
          );
          result === null && (setIsVisible(false), dispatch(getUserAction()));
          result && resetForm();
        }}
      >
        <FormField
          autoFocus
          name="value"
          type={data[3]}
          placeholder={t(`account.${data[4]}`)}
          className="w-[250px] md:w-[400px] toRight h-[50px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px] mt-[50px]"
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>

      {step === 'enterNumber' ? (
        <div
          aria-hidden="true"
          className="text-[16px] mt-[10px] link"
          onClick={(): void => {
            dispatch(postLoginAction(step, null, rawData));
          }}
        >
          {t('account.loginEmail')}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="text-[16px] mt-[10px] link"
          onClick={(): void => {
            dispatch(postLoginAction(step, null, rawData));
          }}
        >
          {t('account.loginMobile')}
        </div>
      )}
    </div>
  );
};

export default SimpleForm;
