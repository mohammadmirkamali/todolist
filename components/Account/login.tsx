import React, { ReactElement, useState } from 'react';
import ForgotPasswordCode from './forgotPasswordCode';
import ForgotPasswordNew from './forgotPasswordNew';
import EnterPassword from './enterPassword';
import EnterNumber from './enterNumber';
import EnterCode from './enterCode';
import FillForm from './fillForm';
import { SModal } from './style';

type ModalType = { isVisible: boolean; setIsVisible: (value) => void };
const Login: React.FC<ModalType> = ({ isVisible, setIsVisible }) => {
  const [step, setStep] = useState('number');
  const [mobile, setMobile] = useState('');

  // eslint-disable-next-line react/no-unstable-nested-components
  const Step = (): ReactElement => {
    switch (step) {
      case 'number':
        return <EnterNumber setStep={setStep} setMobile={setMobile} />;
      case 'VerifyMobile' || 'AuthVerifyEmail':
        return <EnterCode setStep={setStep} mobile={mobile} step={step} />;
      case 'loginUsingPassword':
        return <EnterPassword setStep={setStep} auth={mobile} visible={setIsVisible} />;
      case 'forgotPasswordCode':
        return <ForgotPasswordCode setStep={setStep} auth={mobile} />;
      case 'forgotPasswordNew':
        return <ForgotPasswordNew setIsVisible={setIsVisible} setStep={setStep} />;
      case 'fillForm':
        return <FillForm setIsVisible={setIsVisible} setStep={setStep} />;

      default:
        return <EnterNumber setStep={setStep} setMobile={setMobile} />;
    }
  };

  return (
    <SModal
      centered
      title={null}
      footer={null}
      width={600}
      destroyOnClose
      visible={isVisible}
      onCancel={(): void => (setIsVisible(false), setStep('number'))}
    >
      <Step />
    </SModal>
  );
};

export default Login;
