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
  margin-top: 40px;
`;

const Track: React.FC = () => {
  const validationSchema = Yup.object({
    value: Yup.string().required(t('account.emptyField')),
  });
  return (
    <div className="w-[300px] lg:w-[400px] pr-[40px]">
      <h2 className="font-bold m-0 mt-[20px] md:mt-[-20px] text-[30px] mb-[20px]">
        {t('contactUs.messageTitle')}
      </h2>

      <AppForm
        initialValues={{ value: '' }}
        validationSchema={validationSchema}
        onSubmit={(values): void => {
          // console.log(values, 22);
          // dispatch(postCheckPhoneAction('phone=09356942668'));
        }}
      >
        <p className="m-0 pr-[10px]">{t(`contactUs.messageInfo`)}</p>
        <FormField
          name="value"
          autoFocus
          contenteditable
          type="text"
          placeholder={t(`contactUs.messageInfo`)}
          className="w-full border h-[40px] rounded-[8px] px-[15px] text-[18px]"
        />

        <SSubmitForm title={t('account.approved')} />
      </AppForm>
    </div>
  );
};
export default Track;
