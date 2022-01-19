import React from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { wrapper } from 'store/store';
import theme from 'services/theme';
import 'public/css/fontiran.css';
import 'public/css/antd-rtl.css';
import 'public/css/public.css';
import 'public/css/icon.css';
import 'antd/dist/antd.css';
import 'services/i18n';

const EnigmaApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <ConfigProvider direction="rtl">
      <Component {...pageProps} />
    </ConfigProvider>
  </ThemeProvider>
);

export default wrapper.withRedux(EnigmaApp);
