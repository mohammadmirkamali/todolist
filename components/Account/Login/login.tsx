import { t } from 'i18next';
import React from 'react';
import { SModal } from './style';

type ModalType = { isVisible: boolean; setIsVisible: (value) => void };
const Login: React.FC<ModalType> = ({ isVisible, setIsVisible }) => (
  <SModal
    centered
    title={null}
    footer={null}
    width={600}
    visible={isVisible}
    onCancel={() => setIsVisible(false)}
  >
    <div>{t('account.signIn')}</div>
  </SModal>
);

export default Login;
