import { Modal } from 'antd';
import { t } from 'i18next';
import React from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import { SSubmitForm } from './style';

type EditPasswordType = {
  visible: boolean;
  setIsModalVisible: (e) => void;
};

const fields = ['currentPassword', 'newPassword', 'repeatNewPassword'];
const EditPassword: React.FC<EditPasswordType> = ({ visible, setIsModalVisible }) => {
  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(8, t('account.min8'))
      .required(t('account.emptyField')),
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
          initialValues={{ currentPassword: '', newPassword: '', repeatNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values): void => {
            // console.log(values, 22);
            // dispatch(postCheckPhoneAction('phone=09356942668'));
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

          <SSubmitForm title={t('account.approved')} />
        </AppForm>
      </div>
    </Modal>
  );
};

export default EditPassword;
