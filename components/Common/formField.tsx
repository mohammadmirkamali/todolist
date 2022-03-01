/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'antd';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { inputStyleLtr, inputStyleRtl } from './commonStyle';

export type FieldType = { name: string; className: string };
const FormField = ({
  name,
  type,
  className,
  placeholder,
  direction = 'rtl',
  ...rest
}): ReactElement => {
  const { setFieldTouched, errors, touched, values, handleChange } = useFormikContext();
  const [upLabel, setUpLabel] = useState(false);
  const [widthLegend, setWidthLegend] = useState<number>(70);
  const style = direction === 'rtl' ? inputStyleRtl : inputStyleLtr;

  return (
    <div className="flex flex-col items-start">
      {type !== 'textarea' ? (
        <div className="relative">
          <input
            onBlur={(): void => {
              setFieldTouched(name);
              setUpLabel(values[name]);
            }}
            onFocus={(): void => setUpLabel(true)}
            className={`${className} border-0 input focus:border-blue-1`}
            onChange={handleChange}
            autoComplete="off"
            value={values[name]}
            type={type}
            id={name}
            {...rest}
          />
          <fieldset
            className={`pointer-events-none border-solid border-2 absolute -top-1 right-0 left-0 bottom-0 rounded-md  ${
              touched[name] && errors[name] ? 'border-red-0' : 'border-gray-4'
            }`}
            style={{ borderColor: upLabel && '#1890ff' }}
          >
            <legend
              align={`${direction === 'rtl' ? 'right' : 'left'}`}
              className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}
              style={{ width: `${upLabel ? widthLegend : 0}px` }}
            />
          </fieldset>
          <label
            ref={(node): void => setWidthLegend(node?.clientWidth)}
            className={`${
              upLabel && 'label'
            }  absolute top-4 px-2 cursor-text text-gray-8 `}
          >
            {placeholder}
          </label>
          {/* this style for up Section */}
          <style jsx>{style}</style>
        </div>
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

export default FormField;
