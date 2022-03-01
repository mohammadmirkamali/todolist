import { PhoneFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { t } from 'i18next';
import React from 'react';

import FormField, { SubmitForm } from 'components/Common/formField';
import AppForm from 'components/Common/appForm';
import { TelNumber } from 'services/routes';
import { faNumber } from 'utils/common.util';

const SSubmitForm = styled(SubmitForm)`
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  width: 70px;
  margin-right: 10px;
  background-color: ${({ theme }): string => theme.colors.green[1]};
  border: none;
`;

const AskUs: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email(t('landing.addValidEmail')),
  });
  return (
    <div className="bg-gray-1 w-full h-[220px] md:h-[100px] center flex-col md:flex-row">
      <a
        href={`tel:${TelNumber().replace('0', '+98').replaceAll(' ', '')}`}
        className="flex justify-start items-center md:border-0 mb-[20px] pb-[20px] md:pb-0 md:mb-0 border-b border-b-gray-6 md:ml-[30%] w-[280px] md:w-[400px]"
      >
        <div className="text-white h-[50px] ml-5 bg-green-1 rounded-[8px] center w-[50px]">
          <PhoneFilled className="text-[25px]" />
        </div>
        <div className="text-blue-9 font-bold center flex-col text-[20px]">
          {t('landing.askUs')}{' '}
          <div className="toRight text-[16px]">{faNumber(TelNumber())}</div>
        </div>
      </a>
      <div>
        <p className="text-blue-9 font-bold m-0 text-[16px]">{t('landing.addNews')}</p>
        <AppForm
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={(values): void => {
            values;
            // console.log(values.email);
          }}
        >
          <div className="flex mt-4">
            <FormField
              name="email"
              type="email"
              placeholder={t('landing.addEmail')}
              className="w-[200px] h-[40px] overflow-hidden px-[5px] text-[14px]"
            />

            <SSubmitForm title={t('global.approve')} />
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default AskUs;
