/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Button, Skeleton } from 'antd';
import { SkeletonProps } from 'antd/lib/skeleton';
import { t } from 'i18next';
import { StyledWrapper, StyledSkeletonContainer } from './style';

type LoadingType = SkeletonProps & {
  data?: any; // eslint-disable-line
  error?: boolean;
  reload?: () => void;
};

/**
 * LoadingBox will render a loading svg on api call or a reload button with error message on api error.
 * @param {any} data to specify data exist or not
 * @param {boolean} error: has error status
 * @param {Element} children
 * @param {() => void} reload: a function to reload children component
 * @param {number} space: margin amount around reload button
 * @param rest
 * @returns {Element}
 */

const LoadingBox: React.FC<LoadingType> = (props) => {
  const { data, reload, error, children, ...rest } = props;
  return (
    <>
      {data ? (
        children
      ) : error ? (
        <StyledWrapper>
          <Button type="primary" onClick={reload}>
            {t('global.retry')}
          </Button>
        </StyledWrapper>
      ) : (
        <StyledSkeletonContainer>
          <Skeleton active {...rest} />
        </StyledSkeletonContainer>
      )}
    </>
  );
};

export default LoadingBox;
