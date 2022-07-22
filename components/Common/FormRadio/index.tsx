import React from 'react';
import { StyledDiv, StyledLabel } from 'components/Common/commonStyle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormRadio: React.FC<any> = (props) => {
  const { items, register, required } = props;
  return (
    <StyledDiv my="8px" display="flex" justifyContent="space-between">
      {items.map((item) => (
        <StyledDiv key={item.value} fontSize={16}>
          <StyledLabel htmlFor={item.value} key={item.value} cursor="pointer">
            <input
              {...register(item.label)}
              type="radio"
              value={item.value}
              required={required}
              id={item.value}
            />
            {item.title}
          </StyledLabel>
        </StyledDiv>
      ))}
    </StyledDiv>
  );
};

export default FormRadio;
