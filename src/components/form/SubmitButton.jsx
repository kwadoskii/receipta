import React from "react";
import { useFormikContext } from "formik";

export default function SubmitButton({ name = "Submit", submitting }) {
  const { handleSubmit } = useFormikContext();

  return (
    <div className="form-group mt-3 mr-auto w-50">
      <button
        className="btn btn-primary form-control"
        disabled={submitting}
        onClick={handleSubmit}
        type="submit"
      >
        {name}
      </button>
    </div>
  );
}
