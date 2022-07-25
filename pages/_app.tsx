import React from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import ReduxLayout from 'store/with-redux-store';
import theme from 'components/Common/theme';
import 'public/css/antd-rtl.css';
import 'public/css/public.css';
import 'antd/dist/antd.css';

const EnigmaApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <ReduxLayout>
          <Component {...pageProps} />
        </ReduxLayout>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default EnigmaApp;
