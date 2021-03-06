import React from "react";
import { useFormikContext } from "formik";

import Error from "./Error";

export default function Input({
  classes = "",
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  size = "col-md-12",
}) {
  const { handleBlur, handleChange, errors, touched, values } = useFormikContext();

  return (
    <div className={"form-group " + size}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className={"form-control " + classes}
        onBlur={handleBlur(name)}
        onChange={handleChange(name)}
        placeholder={placeholder}
        required={required}
        type={type}
        id={name}
        value={values[name]}
      />

      <Error error={errors[name]} visible={touched[name]} />
    </div>
  );
}
