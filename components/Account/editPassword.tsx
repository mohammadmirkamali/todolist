import { message } from 'antd';
import { t } from 'i18next';
import React from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import { SSubmitForm } from 'components/Profile/style';
import { ForgetPasswordNewUrl } from 'services/routes';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginAction } from 'store/account/account.action';

type EditPasswordType = { setIsVisible: (e) => void };
const fields = ['newPassword', 'repeatNewPassword'];
const EditPassword: React.FC<EditPasswordType> = ({ setIsVisible }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.loginLoading);
  const validationSchema = Yup.object({
    newPassword: Yup.string().min(8, t('account.min8')).required(t('account.emptyField')),
    repeatNewPassword: Yup.string()
      .min(8, t('account.min8'))
      .oneOf([Yup.ref('newPassword'), null], t('account.notMatch'))
      .required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[26px] font-bold">{t(`account.changePassword`)}</div>

      <AppForm
        initialValues={{ newPassword: '', repeatNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values): Promise<void> => {
          const body = { password: values.newPassword };
          const res: any = await dispatch(postLoginAction(ForgetPasswordNewUrl(), body)); // eslint-disable-line
          if (res.ok) {
            setIsVisible(false);
            message.success(t('account.successChangePassword'));
          }
        }}
      >
        {fields.map((item, index) => (
          <div key={item}>
            <p className="mt-[20px] mb-0 justify-start w-[82%]">{t(`account.${item}`)}</p>
            <FormField
              name={item}
              autoFocus={!index}
              type="password"
              placeholder={t(`account.${item}`)}
              className="w-[400px] h-[50px] toRight border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px]"
            />
          </div>
        ))}

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default EditPassword;
