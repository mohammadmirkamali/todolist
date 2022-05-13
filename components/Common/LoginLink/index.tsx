import Login from 'components/Account/login';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const LoginLink: React.FC<{ href: string }> = ({ children, href }) => {
  const user = useSelector((state) => state.account.user);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const handleClick = (): void => {
    setLoginModalVisible(true);
  };
  return (
    <div>
      {user ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <div onClick={handleClick} aria-hidden="true">
          {children}
        </div>
      )}
      <Login isVisible={loginModalVisible} setIsVisible={setLoginModalVisible} />
    </div>
  );
};

export default LoginLink;
