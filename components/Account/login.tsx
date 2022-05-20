import React from 'react';
import { useSelector } from 'react-redux';

import SimpleForm from './simpleForm';
import FillForm from './fillForm';
import { SModal } from './style';

type ModalType = { isVisible: boolean; setIsVisible: (value) => void };
const Login: React.FC<ModalType> = ({ isVisible, setIsVisible }) => {
  const loginData = useSelector((state) => state.account.login);

  return (
    <SModal
      centered
      title={null}
      footer={null}
      width={600}
      destroyOnClose
      visible={isVisible}
      onCancel={(): void => setIsVisible(false)}
    >
      {loginData?.next === 'requiredFields' ? (
        <FillForm loginData={loginData} setIsVisible={setIsVisible} />
      ) : (
        <SimpleForm loginData={loginData} setIsVisible={setIsVisible} />
      )}
    </SModal>
  );
};

export default Login;
