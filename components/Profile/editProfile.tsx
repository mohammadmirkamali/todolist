import { Modal } from 'antd';
import { t } from 'i18next';
import React from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import { SSubmitForm } from './style';

type EditProfilType = {
  visible: boolean;
  setIsModalVisible: (e) => void;
  type: string;
  input: string;
};

const types = {
  name: {
    type: 'text',
    validation: Yup.string().required(t('account.emptyField')),
  },
  number: {
    type: 'number',
    validation: Yup.number().required(t('account.emptyField')),
  },
  birth: {
    type: 'number',
    validation: Yup.number(),
  },
  email: {
    type: 'email',
    validation: Yup.string()
      .email(t('account.validEmail'))
      .required(t('account.emptyField')),
  },
};

const EditProfile: React.FC<EditProfilType> = (props) => {
  const { visible, setIsModalVisible, type, input } = props;
  const validationSchema = Yup.object({
    value: types[type]?.validation,
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
        <div className="text-[26px] font-bold">{t(`account.${type}`)}</div>

        <AppForm
          initialValues={{ value: input }}
          validationSchema={validationSchema}
          onSubmit={(values): void => {
            // console.log(values, 22);
            // dispatch(postCheckPhoneAction('phone=09356942668'));
          }}
        >
          <FormField
            name="value"
            autoFocus
            type={types[type]?.type}
            placeholder={t(`account.${type}`)}
            className={`${
              type !== 'name' && 'toRight'
            } w-[400px] h-[50px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px] mt-[30px]`}
          />

          <SSubmitForm title={t('account.approved')} />
        </AppForm>
      </div>
    </Modal>
  );
};

export default EditProfile;
