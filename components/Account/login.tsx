import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SimpleForm from './simpleForm';
import FillForm from './fillForm';
import { SModal } from './style';
import EditPassword from './editPassword';
import { postLoginAction } from 'store/account/account.action';

type ModalType = {
  isVisible: boolean;
  setIsVisible: (value) => void;
};
const Login: React.FC<ModalType> = ({ isVisible, setIsVisible }) => {
  const loginData = useSelector((state) => state.account.login);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();

  useEffect(() => {
    !user && dispatch(postLoginAction(null, { data: 'enterNumber', ok: true }));
  }, [user]);

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
      ) : loginData?.next === 'ForgetPassword_step2' ? (
        <EditPassword setIsVisible={setIsVisible} />
      ) : (
        <SimpleForm loginData={loginData} setIsVisible={setIsVisible} />
      )}
    </SModal>
  );
};

export default Login;
