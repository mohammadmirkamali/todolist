import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import ReduxLayout from 'store/with-redux-store';
import request, { requestMonitor } from 'services/request';
import theme from 'services/theme';
import 'public/css/fontiran.css';
import 'public/css/antd-rtl.css';
import 'public/css/public.css';
import 'public/css/icon.css';
import 'antd/dist/antd.css';
import 'services/i18n';

const EnigmaApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  useEffect(() => {
    if (!request.monitors.length) {
      request.addMonitor(requestMonitor);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider direction="rtl">
        <ReduxLayout>
          <Component {...pageProps} />
        </ReduxLayout>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default EnigmaApp;
