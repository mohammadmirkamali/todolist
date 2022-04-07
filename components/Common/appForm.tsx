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
      {({ handleSubmit }): ReactElement => (
        <form onSubmit={handleSubmit}>{children}</form>
      )}
    </Formik>
  );
};

export default AppForm;
