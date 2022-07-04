import React from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FormField from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import { getUserAction, postProfileAction } from 'store/account/account.action';
import {
  ChangeMobileUrl,
  ChargeWalletUrl,
  ConfirmMobileUrl,
  ForgetPasswordCodedUrl,
} from 'services/routes';
import { SSubmitForm } from './style';
import { faNumber } from 'utils/common.util';
import { message } from 'antd';
import request from 'services/request';

type FormType = {
  profileData: any; // eslint-disable-line
  // nextAction: { type: string; id: number[] };
  setIsVisible: (value) => void;
};
const ProfileForm: React.FC<FormType> = ({ profileData, setIsVisible }) => {
  const step =
    profileData?.next === 'login' ? 'newMobile' : profileData?.next || 'newMobile'; // after change password next is login
  const user = useSelector((state) => state.account.user);
  const loading = useSelector((state) => state.account.profileLoading);
  const dispatch = useDispatch();

  let data = []; // [title ,subtitle,url,input type, placeholder]
  let body = (value): object => ({ value });
  let yup = null;

  switch (step) {
    case 'ForgetPassword_step1':
      data = ['addMobileCode', null, ForgetPasswordCodedUrl(), 'number', 'code'];
      body = (value): object => ({
        auth: user.mobile,
        code: value.toString(),
        AuthType: 'mobile',
      });
      yup = Yup.number().required(t('account.emptyField'));
      break;

    case 'newMobile':
      data = ['newMobile', null, ChangeMobileUrl(), 'number', 'number'];
      body = (value): object => ({ type: 'mobile', new: value.toString() });
      yup = Yup.number().required(t('account.emptyField'));
      break;

    case 'chargeWallet':
      data = ['chargeWallet', null, null, 'number', 'payInTooman'];
      yup = Yup.number().required(t('account.emptyField'));
      break;

    case 'confirm-MobileOrEmail':
      data = ['addMobileCode', null, ConfirmMobileUrl(), 'number', 'code'];
      body = (value): object => ({
        type: 'mobile',
        code: value.toString(),
        new: profileData.new,
      });
      yup = Yup.number().required(t('account.emptyField'));
      break;

    default:
      break;
  }

  const validationSchema = Yup.object({ value: yup });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[18px] md:text-[26px] font-bold text-center">
        {t(`account.${data[0]}`)}
      </div>
      {step === 'confirm-MobileOrEmail' && (
        <div className="text-[16px] mt-[8px]">
          {t(`account.mobileCode`, { number: faNumber(profileData.new) })}
        </div>
      )}

      <AppForm
        initialValues={{ value: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }): Promise<boolean> => {
          if (step === 'chargeWallet') {
            const res: any = await request.post(ChargeWalletUrl(values.value)); // eslint-disable-line
            if (res.ok) {
              await window.location.assign(res.data.link);
              setIsVisible(false);
              dispatch(postProfileAction(null, { data: { next: null }, ok: true }));
            }
          } else {
            if (step === 'newMobile' && `0${values.value}` === user.mobile) {
              message.warn(t('account.sameMobile'));
              return false;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await dispatch(
              postProfileAction(data[2], body(values.value)),
            );
            if (result.data.success && !result.data.next) {
              dispatch(getUserAction());
              setIsVisible(false);
              message.success(result.data.message);
            }
            result && resetForm();
          }
          return true;
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
    </div>
  );
};

export default ProfileForm;
