/* eslint-disable react/jsx-no-useless-fragment */
import { Formik } from 'formik';
import React from 'react';

const AppForm = ({ children, onSubmit, validationSchema, initialValues }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {() => <>{children}</>}
  </Formik>
);

export default AppForm;
