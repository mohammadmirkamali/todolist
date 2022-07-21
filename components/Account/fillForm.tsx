import React, { useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { SSubmitForm } from './style';
import AppForm from 'components/Common/appForm';
import FormField, { RadioForm } from 'components/Common/formField';
import { FillFormUrl } from 'services/routes';
import { getUserAction, postLoginAction } from 'store/account/account.action';

type FormType = { loginData: any; setIsVisible: (item) => void }; // eslint-disable-line
const { Option } = Select;
const style =
  'w-[250px] md:w-[400px] h-[45px] border overflow-hidden rounded-[8px] pt-[3px] px-[15px] text-[18px]';
const options = {
  talabe: [1, 2, 3, 4],
  daneshAmooz: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  daneshjoo: [1, 2, 3, 4, 5, 6],
};

const FillForm: React.FC<FormType> = ({ loginData, setIsVisible }) => {
  const loading = useSelector((state) => state.account.loginLoading);
  const dispatch = useDispatch();
  const [education, setEducation] = useState('');
  const [level, setLevel] = useState(1);

  const validationSchema = Yup.object({
    name: loginData.name && Yup.string().required(t('account.emptyField')),
    family: loginData.family && Yup.string().required(t('account.emptyField')),
    age: loginData.birthYear && Yup.number().required(t('account.emptyField')),
    password:
      loginData.password &&
      Yup.string().min(8, t('account.min8')).required(t('account.emptyField')),
    confirm:
      loginData.password &&
      Yup.string()
        .min(8, t('account.min8'))
        .oneOf([Yup.ref('password'), null], t('account.notMatch'))
        .required(t('account.emptyField')),
  });

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="text-[30px] font-bold">{t('account.fillForm')}</div>

      <AppForm
        initialValues={{
          name: '',
          family: '',
          age: '',
          password: '',
          confirm: '',
          sex: '',
          formEducation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (props): Promise<void> => {
          const { name, family, age, password, sex } = props;
          const body = { name, family, age, password, sex };
          if (education) {
            body[education] = level;
          }
          const result = dispatch(postLoginAction(FillFormUrl(), body));
          result && (setIsVisible(false), dispatch(getUserAction()));
        }}
      >
        {loginData.name && (
          <>
            <p className="m-0 w-full mr-[15px] mt-[20px]">{t('global.name')}</p>
            <FormField
              autoFocus
              name="name"
              type="text"
              placeholder={t('global.name')}
              className={`${style} toLeft`}
            />
          </>
        )}
        {loginData.family && (
          <>
            <p className="m-0 w-full mr-[15px] mt-[15px]">{t('global.family')}</p>
            <FormField
              name="family"
              type="text"
              placeholder={t('global.family')}
              className={`${style} toLeft`}
            />
          </>
        )}
        {loginData.birthYear && (
          <>
            <p className="m-0 w-full mr-[15px] mt-[15px]">{t('account.birth')}</p>
            <FormField
              name="age"
              type="number"
              placeholder="1374"
              className={`${style} toRight`}
            />
          </>
        )}

        <div className="w-full mt-[15px]">
          {!loginData.sex && (
            <div className="flex-1">
              <p className="m-0 w-full mr-[5px]">{t('global.sex')}</p>
              <RadioForm
                items={[
                  { title: t('global.man'), value: '1' },
                  { title: t('global.woman'), value: '2' },
                ]}
                name="sex"
              />
            </div>
          )}
          {!loginData.daneshAmooz && !loginData.daneshjoo && !loginData.talabe && (
            <div className="mt-[15px] flex">
              <div>
                <p className="m-0 w-full mr-[5px]">{t('global.education')}</p>
                <RadioForm
                  onClick={(item): void => (setEducation(item), setLevel(1))}
                  items={[
                    { title: t('global.daneshAmooz'), value: 'daneshAmooz' },
                    { title: t('global.daneshjoo'), value: 'daneshjoo' },
                    { title: t('global.talabe'), value: 'talabe' },
                  ]}
                  name="formEducation"
                />
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
                        {education === 'daneshjoo' ? t(`account.collage${item}`) : item}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
        {loginData.password && (
          <>
            <p className="m-0 w-full mr-[15px] mt-[15px]">{t('account.password')}</p>
            <FormField
              name="password"
              type="password"
              placeholder={t('account.password')}
              className={`${style} toRight`}
            />
            <p className="m-0 w-full mr-[15px] mt-[15px]">
              {t('account.repeatNewPassword')}
            </p>
            <FormField
              name="confirm"
              type="password"
              placeholder={t('account.repeatNewPassword')}
              className={`${style} toRight`}
            />
          </>
        )}

        <SSubmitForm loading={loading} title={t('account.approved')} />
      </AppForm>
    </div>
  );
};

export default FillForm;
