import { Button } from 'antd';
import { useFormikContext } from 'formik';
import React, { ReactElement } from 'react';

export type FieldType = { name: string; className: string };
const FormField = ({ name, className, ...rest }): ReactElement => {
  const { setFieldTouched, errors, touched, values, handleChange } = useFormikContext();
  return (
    <div className="flex flex-col items-start">
      <input
        onBlur={(): void => setFieldTouched(name)}
        className={`${className}  ${
          touched[name] && errors[name] ? 'border-red-0' : 'border-gray-5'
        }`}
        onChange={handleChange}
        value={values[name]}
        id={name}
        {...rest}
      />
      {touched[name] && errors[name] && (
        <div className="text-red-0 text-[12px] text-left">{errors[name]}</div>
      )}
    </div>
  );
};

type SubmitType = { title: string; loading: boolean };
export const SubmitForm: React.FC<SubmitType> = ({ title, loading, ...rest }) => {
  const { handleSubmit, dirty } = useFormikContext();
  return (
    <Button
      type="primary"
      onSubmit={handleSubmit}
      loading={loading}
      disabled={!dirty}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default FormField;
