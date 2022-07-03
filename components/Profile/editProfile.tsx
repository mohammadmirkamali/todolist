import { message, Modal } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';
import * as Yup from 'yup';
import AppForm from 'components/Common/appForm';
import FormField, { RadioForm } from 'components/Common/formField';
import { SSubmitForm } from './style';
import request from 'services/request';
import { UpdateUserInfoUrl } from 'services/routes';
import { UserType } from 'types/account.type';
import { useDispatch } from 'react-redux';
import { getUserAction } from 'store/account/account.action';

type EditProfileType = {
  visible: boolean;
  setIsModalVisible: (e) => void;
  user: UserType;
};

const style = `w-[250px] md:w-[400px] h-[50px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px]`;

const EditProfile: React.FC<EditProfileType> = (props) => {
  const { visible, setIsModalVisible, user } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    nickname: Yup.string().required(t('account.emptyField')),
    name: Yup.string().required(t('account.emptyField')),
    family: Yup.string().required(t('account.emptyField')),
    sex: Yup.string().required(t('account.emptyField')),
    birthYear: Yup.number().required(t('account.emptyField')),
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
        <div className="text-[24px] font-bold">{t(`account.editInfo`)}</div>

        <AppForm
          initialValues={{
            nickname: user?.nickname || '',
            name: user?.name || '',
            family: user?.family || '',
            sex: '1',
            birthYear: user?.info?.birthYear,
          }}
          validationSchema={validationSchema}
          onSubmit={async ({ nickname, sex, birthYear, name, family }): Promise<void> => {
            setLoading(true);
            const body = { nickname, sex, birthYear, name, family };
            const res: any = await request.post(UpdateUserInfoUrl(), body); // eslint-disable-line
            if (res.ok) {
              await dispatch(getUserAction());
              setLoading(false);
              setIsModalVisible(2);
              message.success(res.data.message);
            } else {
              setLoading(false);
              message.error(res.data.message || t('global.apiError'));
            }
          }}
        >
          <div className="flex flex-col w-[250px] md:w-[400px]">
            <p className="m-0 text-[12px] mr-[6px] mt-[20px]">{t('global.name')}</p>
            <FormField
              name="name"
              type="text"
              placeholder={t(`global.name`)}
              className={style}
            />
            <p className="m-0 text-[12px] mr-[6px] mt-[20px]">{t('global.family')}</p>
            <FormField
              name="family"
              type="text"
              placeholder={t(`global.family`)}
              className={style}
            />
            <p className="m-0 text-[12px] mr-[6px] mt-[20px]">{t('account.nickname')}</p>
            <FormField
              name="nickname"
              autoFocus
              type="text"
              placeholder={t(`account.nameFamily`)}
              className={style}
            />

            <p className="m-0 text-[12px] mr-[6px] mt-[20px]">{t('account.birth')}</p>
            <FormField
              name="birthYear"
              type="number"
              placeholder="1374"
              className={`toRight ${style}`}
            />

            <div className="flex-1 mt-[20px]">
              <p className="m-0 w-full mr-[5px]">{t('global.sex')}</p>
              <RadioForm
                items={[
                  { title: t('global.man'), value: '1' },
                  { title: t('global.woman'), value: '2' },
                ]}
                name="sex"
              />
            </div>

            <SSubmitForm loading={loading} title={t('account.approved')} />
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

export default EditProfile;
