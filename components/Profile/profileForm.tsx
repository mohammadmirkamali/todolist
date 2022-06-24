import React from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FormField from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import { postProfileAction } from 'store/account/account.action';
import { ForgetPasswordCodedUrl } from 'services/routes';
import { SSubmitForm } from './style';

type FormType = {
  profileData: any; // eslint-disable-line
  // nextAction: { type: string; id: number[] };
  setIsVisible: (value) => void;
};
const ProfileForm: React.FC<FormType> = ({ profileData, setIsVisible }) => {
  const step = profileData?.next || 'enterNumber';
  const loading = useSelector((state) => state.account.profileLoading);
  const dispatch = useDispatch();

  let data = []; // [title ,subtitle,url,input type, placeholder]
  let body = (value): object => ({ value });
  let yup = null;

  switch (step) {
    case 'ForgetPassword_step1':
      data = ['forgotPassword', null, ForgetPasswordCodedUrl(), 'number', 'code'];
      body = (value): object => ({
        auth: '09356942668',
        code: value.toString(),
        AuthType: 'mobile',
      });
      yup = Yup.number().required(t('account.emptyField'));
      break;

    default:
      break;
  }

  const validationSchema = Yup.object({ value: yup });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[26px] font-bold">{t(`account.${data[0]}`)}</div>

      <AppForm
        initialValues={{ value: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }): Promise<void> => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = await dispatch(
            postProfileAction(data[2], body(values.value)),
          );
          //   if (result.data.next === 'login') {
          //     dispatch(getUserAction());
          //     setIsVisible(false);
          //     dispatch(
          //       postProfileAction(null, { data: { next: 'enterNumber' }, ok: true }),
          //     );
          //   }
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
    </div>
  );
};

export default ProfileForm;
