import { Button } from 'antd';
import { Field, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useRef } from 'react';

const FormField = (props): ReactElement => {
  const ref = useRef(null);
  const { name, type, autoFocus = false, className, ...rest } = props;
  const { setFieldTouched, errors, touched, values, handleChange } = useFormikContext();
  useEffect(() => {
    autoFocus && ref?.current?.focus(); // autoFocus just work in this way in production
  }, [autoFocus]);

  return (
    <div className="flex flex-col items-start">
      {type !== 'textarea' ? (
        <input
          ref={ref}
          onBlur={(): void => setFieldTouched(name)}
          className={`${className}  ${
            touched[name] && errors[name] ? 'border-red-0' : 'border-gray-5'
          }`}
          onChange={handleChange}
          value={values[name]}
          type={type}
          id={name}
          {...rest}
        />
      ) : (
        <textarea
          onBlur={(): void => setFieldTouched(name)}
          className={`${className} ${
            touched[name] && errors[name] ? 'border-red-0' : 'border-gray-5'
          }`}
          onChange={handleChange}
          value={values[name]}
          id={name}
          {...rest}
        />
      )}
      {touched[name] && errors[name] && (
        <div className="text-red-0 text-[12px] text-left">{errors[name]}</div>
      )}
    </div>
  );
};

type SubmitType = { title: string; loading?: boolean };
export const SubmitForm: React.FC<SubmitType> = ({ title, loading, ...rest }) => {
  const { handleSubmit, dirty } = useFormikContext();
  return (
    <Button
      type="primary"
      onClick={(): void => handleSubmit()}
      loading={loading}
      disabled={!dirty}
      {...rest}
    >
      {title}
    </Button>
  );
};

type RadioType = { title: string; name: string; value: string };
export const RadioForm: React.FC<RadioType> = ({ title, name, value }) => (
  <label className="text-[16px] cursor-pointer flex items-center ml-[12px]" htmlFor="1">
    <Field
      type="radio"
      name={name}
      value={value}
      className="w-[16px] h-[16px] ml-[6px]"
    />
    {title}
  </label>
);

export default FormField;
