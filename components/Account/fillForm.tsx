import React, { useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { message, Radio, Select } from 'antd';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField from 'components/Common/formField';
import request from 'services/request';
import { FillFormUrl } from 'services/routes';

const { Option } = Select;
const style =
  'w-[250px] md:w-[400px] h-[45px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px]';
type CodeType = { setIsVisible: (num) => void; setStep: (num) => void };
const options = {
  talabe: [1, 2, 3, 4],
  daneshAmooz: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  daneshjo: [1, 2, 3, 4, 5, 6],
};

const FillForm: React.FC<CodeType> = ({ setIsVisible, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState(0);
  const [education, setEducation] = useState('');
  const [level, setLevel] = useState(1);
  const validationSchema = Yup.object({
    name: Yup.string().required(t('account.emptyField')),
    family: Yup.string().required(t('account.emptyField')),
    age: Yup.number().required(t('account.emptyField')),
    password: Yup.string().min(8, t('account.min8')).required(t('account.emptyField')),
    confirm: Yup.string()
      .min(8, t('account.min8'))
      .oneOf([Yup.ref('password'), null], t('account.notMatch'))
      .required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.fillForm')}</div>

      <AppForm
        initialValues={{ name: '', family: '', age: '', password: '', confirm: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ name, family, age, password }): Promise<void> => {
          setLoading(true);
          const body = { name, family, age, password, sex };
          if (education) {
            body[education] = level;
          }
          const res: any = await request.post(FillFormUrl(), body); // eslint-disable-line
          setLoading(false);
          if (res.ok) {
            setStep('number');
            setIsVisible(false);
            message.success(t('account.successForm'));
          } else {
            message.error(t('global.apiError'));
          }
        }}
      >
        <p className="m-0 w-full mr-[15px] mt-[20px]">{t('global.name')}</p>
        <FormField
          name="name"
          type="text"
          placeholder={t('global.name')}
          className={`${style} toLeft`}
        />
        <p className="m-0 w-full mr-[15px] mt-[15px]">{t('global.family')}</p>
        <FormField
          name="family"
          type="text"
          placeholder={t('global.family')}
          className={`${style} toLeft`}
        />
        <p className="m-0 w-full mr-[15px] mt-[15px]">{t('account.birth')}</p>
        <FormField
          name="age"
          type="number"
          placeholder="1374"
          className={`${style} toRight`}
        />
        <div className="w-full mt-[15px]">
          <div className="flex-1">
            <p className="m-0 w-full mr-[5px]">{t('global.sex')}</p>
            <Radio.Group onChange={(e): void => setSex(e.target.value)}>
              <Radio value={1}>{t('global.man')}</Radio>
              <Radio value={2}>{t('global.woman')}</Radio>
            </Radio.Group>
          </div>
          <div className="mt-[15px] flex">
            <div>
              <p className="m-0 w-full mr-[5px]">{t('global.education')}</p>
              <Radio.Group
                onChange={(e): void => (setEducation(e.target.value), setLevel(1))}
              >
                <Radio value="daneshAmooz">{t('global.student')}</Radio>
                <Radio value="daneshjo">{t('global.collage')}</Radio>
                <Radio value="talabe">{t('global.talabe')}</Radio>
              </Radio.Group>
            </div>
            {education && (
              <div>
                <p className="m-0 w-full">{t(`account.${education}Level`)}</p>
                <Select
                  style={{ width: 130 }}
                  onChange={(e): void => setLevel(e)}
                  value={level}
                >
                  {options[education].map((item) => (
                    <Option value={item} key={item}>
                      {education === 'daneshjo' ? t(`account.collage${item}`) : item}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        </div>
        <p className="m-0 w-full mr-[15px] mt-[15px]">{t('account.password')}</p>
        <FormField
          name="password"
          type="password"
          placeholder={t('account.password')}
          className={`${style} toRight`}
        />
        <p className="m-0 w-full mr-[15px] mt-[15px]">{t('account.repeatNewPassword')}</p>
        <FormField
          name="confirm"
          type="password"
          placeholder={t('account.repeatNewPassword')}
          className={`${style} toRight`}
        />

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default FillForm;
