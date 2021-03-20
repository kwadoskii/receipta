import React from "react";
import { useFormikContext } from "formik";

export default function SubmitButton({ name = "SUBMIT", submitting }) {
  const { handleSubmit } = useFormikContext();

  return (
    <div className="form-group mt-4">
      <button
        className="submit"
        disabled={submitting}
        onClick={handleSubmit}
        type="submit"
      >
        {name}
      </button>
    </div>
  );
}
