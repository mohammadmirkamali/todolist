import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import { SModal } from './style';

type ModalType = { isVisible: boolean; setIsVisible: (value) => void };
const Login: React.FC<ModalType> = ({ isVisible, setIsVisible }) => {
  const [step, setStep] = useState(1);

  return (
    <SModal
      centered
      title={null}
      footer={null}
      width={600}
      visible={isVisible}
      onCancel={(): void => setIsVisible(false)}
    >
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} />}
    </SModal>
  );
};

export default Login;
