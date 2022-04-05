import { message, Modal } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import { SSubmitForm } from './style';
import request from 'services/request';
import { ConfirmMobileUrl } from 'services/routes';

type EditProfilType = {
  visible: boolean;
  setIsModalVisible: (e) => void;
  type: string;
  input: string;
  auth: string; // mobile or email
  authType: string; // mobile or email
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
    validation: Yup.number().required(t('account.emptyField')),
  },
  changePassword: {
    type: 'number',
    validation: Yup.number().required(t('account.emptyField')),
  },
  email: {
    type: 'email',
    validation: Yup.string()
      .email(t('account.validEmail'))
      .required(t('account.emptyField')),
  },
};

const EditProfile: React.FC<EditProfilType> = (props) => {
  const { visible, setIsModalVisible, type, input, auth, authType } = props;
  const [loading, setLoading] = useState(false);
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
          onSubmit={async (values): Promise<void> => {
            if (type === 'changePassword') {
              setLoading(true);
              const body = { new: auth, code: values.value, type: authType };
              const res: any = await request.post(ConfirmMobileUrl(), body); // eslint-disable-line
              setLoading(false);
              if (res.ok) {
                res.data.success ? setIsModalVisible(2) : message.error(res.data.message);
              } else {
                message.error(t('global.apiError'));
              }
            }
          }}
        >
          <FormField
            name="value"
            autoFocus
            type={types[type]?.type}
            placeholder={t(`account.${type}Placeholder`)}
            className={`${
              type !== 'name' && 'toRight'
            } w-[400px] h-[50px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px] mt-[30px]`}
          />

          <SSubmitForm loading={loading} title={t('account.approved')} />
        </AppForm>
      </div>
    </Modal>
  );
};

export default EditProfile;
