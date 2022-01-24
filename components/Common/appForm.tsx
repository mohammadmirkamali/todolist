/* eslint-disable react/jsx-no-useless-fragment */
import { Formik } from 'formik';
import React, { ReactElement } from 'react';

const AppForm = (props): ReactElement => {
  const { children, onSubmit, validationSchema, initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(): ReactElement => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
