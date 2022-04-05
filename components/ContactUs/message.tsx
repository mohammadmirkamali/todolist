import React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { t } from 'i18next';
import AppForm from 'components/Common/appForm';
import FormField, { SubmitForm } from 'components/Common/formField';

export const SSubmitForm = styled(SubmitForm)`
  border-radius: 8px;
  height: 40px;
  font-size: 18px;
  margin: 30px 0;
  width: 100%;
  margin-top: 10px;
`;

const fields = ['nameFamily', 'email', 'number', 'message'];
const Message: React.FC = () => {
  const validationSchema = Yup.object({
    nameFamily: Yup.string(),
    email: Yup.string(),
    number: Yup.number().required(t('account.emptyField')),
    message: Yup.string().required(t('account.emptyField')),
  });
  return (
    <div className="w-[300px] lg:w-[400px]">
      <h2 className="font-bold m-0 mt-[-20px] text-[30px]">{t('contactUs.title')}</h2>
      <h3 className="text-[18px] mb-[20px]">{t('contactUs.subtitle')}</h3>
      <AppForm
        initialValues={{
          nameFamily: '',
          number: '',
          email: '',
          message: '',
          captcha: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values): void => {
          // console.log(values, 22);
          // dispatch(postCheckPhoneAction('phone=09356942668'));
        }}
      >
        {fields.map((field) => (
          <div key={field} className="mb-[20px] w-full">
            <p className="m-0 pr-[10px]">{t(`account.${field}`)}</p>
            <FormField
              name={field}
              type={
                field === 'number' ? 'number' : field === 'message' ? 'textarea' : 'text'
              }
              placeholder={t(`account.${field}`)}
              className={`${(field === 'number' || field === 'email') && 'toRight'} ${
                field === 'message'
                  ? 'pt-[10px] h-[150px] overflow-auto'
                  : 'h-[50px] overflow-hidden '
              } w-full border rounded-[8px] px-[15px] text-[18px]`}
            />
          </div>
        ))}

        <SSubmitForm title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default Message;
