import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCaptchaAction } from 'store/account/account.action';
import { StyledLanding } from './style';

const Landing = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { captcha } = useSelector((store) => store.account);

  useEffect(() => {
    dispatch(getCaptchaAction());
  }, [dispatch]);

  return (
    <StyledLanding>
      dddd
      {t('landing.start')}
      {captcha?.header[0]}
    </StyledLanding>
  );
};

export default Landing;
