import React from "react";
import { Formik } from "formik";

export default function Form({ children, initialValues, onSubmit, validationSchema }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="contact-form">{children}</div>
    </Formik>
  );
}
