/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import React from 'react';
import App from 'next/app';

import initializeStore from 'store/store';

// https://spectrum.chat/next-js/general/how-would-you-type-this~662bfdb5-b174-4503-94a6-e6ad83bca204
declare module 'next' {
  export interface NextPageContext {
    reduxStore: any;
  }
}

interface InitialProps {
  initialReduxState?: any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
let reduxStore: {};
export const appStore = (initialState: any = {}): any => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux: NextPage<InitialProps> = ({ initialReduxState, ...props }) => {
    const store = appStore(initialReduxState);
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents');
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async (context) => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      // eslint-disable-next-line no-underscore-dangle
      const _reduxStore = appStore();

      // Provide the store to getInitialProps of pages
      // eslint-disable-next-line no-param-reassign
      (context as any).reduxStore = _reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: _reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};

// eslint-disable-next-line react/jsx-no-useless-fragment
const ReduxLayout: React.FC = ({ children }) => <>{children}</>;

export default withRedux(ReduxLayout);
