import React from 'react';
import { StyledDiv, StyledInput, StyledTextArea } from 'components/Common/commonStyle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInput: React.FC<any> = (props) => {
  const { label, placeholder, register, required, errors, textArea } = props;
  return (
    <StyledDiv my="8px">
      {textArea ? (
        <StyledTextArea
          width="100%"
          minHeight="120px"
          fontSize={18}
          mb="-6px"
          border={errors?.[label] ? 1 : 0}
          placeholder={placeholder}
          {...register(label, { required })}
        />
      ) : (
        <StyledInput
          width="100%"
          fontSize={18}
          border={errors?.[label] ? 1 : 0}
          placeholder={placeholder}
          {...register(label, { required })}
        />
      )}
      {errors?.[label] && <StyledDiv color="rose80">This field is required</StyledDiv>}
    </StyledDiv>
  );
};

export default FormInput;
