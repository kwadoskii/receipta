import React from "react";
import { useFormikContext } from "formik";

import Error from "./Error";

export default function Input({
  classes,
  isDuplicated,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}) {
  const { handleBlur, handleChange, errors, touched, values } = useFormikContext();

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className={"minput " + classes}
        onBlur={handleBlur(name)}
        onChange={handleChange(name)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={values[name]}
      />
      <Error error={errors[name]} visible={touched[name]} />
      <Error error="You have already submitted a Dream Job" visible={isDuplicated} />
    </div>
  );
}
