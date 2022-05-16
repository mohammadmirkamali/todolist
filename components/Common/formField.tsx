import styled from '@emotion/styled';
import { Field, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useRef } from 'react';
import AntButton from './AntButton';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SubmitForm: React.FC<any> = ({ title, loading, ...rest }) => {
  const { handleSubmit, dirty } = useFormikContext();

  return (
    <AntButton
      onClick={(): void => handleSubmit()}
      loading={loading}
      disabled={!dirty}
      {...rest}
    >
      {title}
    </AntButton>
  );
};

const SField = styled(Field)`
  color: ${({ theme }): string => theme.colors.red[0]};
`;

type RadioType = { items: { title: string; value: string }[]; name: string };
export const RadioForm: React.FC<RadioType> = ({ items, name }) => {
  const { errors, touched } = useFormikContext();
  const hasError = touched[name] && errors[name];
  return (
    <div>
      <div role="group" className="flex">
        {items.map((item) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            className="text-[16px] cursor-pointer flex items-center ml-[12px]"
            key={item.title}
          >
            <SField
              type="radio"
              name={name}
              value={item.value}
              className="w-[16px] h-[16px] ml-[6px]"
            />
            {item.title}
          </label>
        ))}
      </div>
      {hasError && (
        <div className="text-red-0 text-[12px] text-right">{errors[name]}</div>
      )}
    </div>
  );
};

export default FormField;
