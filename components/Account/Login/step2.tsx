import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { postCheckPhoneAction } from 'store/account/account.action';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';

const Step1: React.FC<{ setStep: (num) => void }> = ({ setStep }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.postPhoneLoading);
  const validationSchema = Yup.object({
    number: Yup.string().required(t('account.enterNumber')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.addMobileCode')}</div>

      <AppForm
        initialValues={{ number: '' }}
        validationSchema={validationSchema}
        onSubmit={(values): void => {
          values.number && setStep(2);
          // console.log(values.number);
          dispatch(postCheckPhoneAction('phone=09356942668'));
        }}
      >
        <FormField
          name="number"
          type="number"
          placeholder="1234"
          className="w-[400px] rtl h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] mt-[60px] "
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default Step1;