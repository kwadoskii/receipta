import React from "react";
import { Formik } from "formik";

export default function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...otherProps}
    >
      <div className="my-3">
        <form>{children}</form>
      </div>
    </Formik>
  );
}
