import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as React from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { postCheckPhoneAction } from 'store/account/account.action';
import { SButton } from './style';

const Step2 = ({ setStep }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.postPhoneLoading);
  const validationSchema = Yup.object({
    number: Yup.string()
      .min(10, t('account.wrongNumber'))
      .max(10, t('account.wrongNumber'))
      .required(t('account.enterNumber')),
  });
  const formik = useFormik({
    initialValues: { number: '' },
    validationSchema,
    onSubmit: (values) => {
      values.number && setStep(2);
      // console.log(values.number);
      dispatch(postCheckPhoneAction('phone=09356942668'));
    },
  });

  const { touched, handleChange, values, handleSubmit } = formik;
  const error = formik.errors.number;

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.signIn')}</div>
      <div className="text-[22px] mt-[15px]">{t('account.signInInfo')}</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          id="number"
          type="number"
          placeholder={t('account.phoneNumber')}
          className={`w-[400px] rtl h-[60px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[24px] mt-[60px] ${
            touched.number && error ? 'border-red-0' : 'border-gray-5'
          }`}
          onChange={handleChange}
          value={values.number}
        />
        {touched.number && error && <div className="text-red-0">{error}</div>}

        <SButton
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={!formik.dirty}
        >
          {t('account.approved')}
        </SButton>
      </form>
    </div>
  );
};

export default Step2;
