import { message, Modal } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import { SSubmitForm } from './style';
import { ForgetPasswordNewUrl } from 'services/routes';
import request from 'services/request';

type EditPasswordType = {
  visible: boolean;
  setIsModalVisible: (e) => void;
};

const fields = ['newPassword', 'repeatNewPassword'];
const EditPassword: React.FC<EditPasswordType> = ({ visible, setIsModalVisible }) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    newPassword: Yup.string().min(8, t('account.min8')).required(t('account.emptyField')),
    repeatNewPassword: Yup.string()
      .min(8, t('account.min8'))
      .oneOf([Yup.ref('newPassword'), null], t('account.notMatch'))
      .required(t('account.emptyField')),
  });

  return (
    <Modal
      centered
      destroyOnClose
      visible={visible}
      onCancel={(): void => setIsModalVisible(0)}
      footer={null}
    >
      <div className=" flex flex-col justify-center items-center">
        <div className="text-[26px] font-bold">{t(`account.changePassword`)}</div>

        <AppForm
          initialValues={{ newPassword: '', repeatNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values): Promise<void> => {
            setLoading(true);
            const body = { password: values.newPassword };
            const res = await request.post(ForgetPasswordNewUrl(), body);
            setLoading(false);
            if (res.ok) {
              setIsModalVisible(false);
              message.success(t('account.successChangePassword'));
            } else {
              message.error(t('global.apiError'));
            }
          }}
        >
          {fields.map((item, index) => (
            <div key={item}>
              <p className="mt-[20px] mb-0 justify-start w-[82%]">
                {t(`account.${item}`)}
              </p>
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
    </Modal>
  );
};

export default EditPassword;
