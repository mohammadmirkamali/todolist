import React from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import ReduxLayout from 'store/with-redux-store';
import theme from 'services/theme';
import 'video-react/dist/video-react.css';
import 'public/css/fontiran.css';
import 'public/css/antd-rtl.css';
import 'public/css/public.css';
import 'public/css/icon.css';
import 'antd/dist/antd.css';
import 'services/i18n';

const EnigmaApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <ConfigProvider direction="rtl">
      <ReduxLayout>
        <Component {...pageProps} />
      </ReduxLayout>
    </ConfigProvider>
  </ThemeProvider>
);

export default EnigmaApp;
