import React, { ReactElement } from 'react';
import { t } from 'i18next';
import PageLoading from 'components/Common/pageLoading';
import AntButton from 'components/Common/AntButton';

type BoxType = { data: any; component: ReactElement; error: boolean }; // eslint-disable-line
export const LoadingBox: React.FC<BoxType> = ({ data, component, error }) =>
  error ? (
    <div className="pt-[70px] center w-full h-full">
      <AntButton>{t('global.retry')}</AntButton>
    </div>
  ) : data ? (
    component
  ) : (
    <PageLoading />
  );
