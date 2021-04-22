import React from "react";
import { useFormikContext, FieldArray } from "formik";

import Error from "./form/Error";
import Item from "./Item";

export default function ItemAdder({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const items = values[name];

  const handleOnChange = (e, id) => {
    setFieldValue(
      name,
      items.map((item) =>
        item.id === id ? (item[e.target.name] = e.target.value) : null
      )
    );
  };

  const getError = (index) => {
    let errorMessage = "";
    if (errors.hasOwnProperty("items") && errors["items"][index] !== undefined) {
      let errArray = Object.values(errors["items"][index]);

      errorMessage = errArray[0];
    }

    return errorMessage;
  };

  const getTouched = (index) => {
    let isTouched = false;

    if (touched.hasOwnProperty("items") && touched["items"][index] !== undefined) {
      isTouched = true;
    }

    return isTouched;
  };

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <>
          <div className="col-md-12 p-0 mt-3">
            <button
              type="button"
              onClick={() => push({ name: "", unitCost: "", quantity: "" })}
              className="btn btn-primary mx-auto"
            >
              add item
            </button>
          </div>

          <div className="mb-5">
            {items.length > 0 &&
              items.map((_, index) => (
                <div key={index}>
                  <Item
                    index={index}
                    onChange={handleOnChange}
                    onRemoveItem={() => remove(index)}
                  />
                  <Error error={getError(index)} visible={getTouched(index)} />
                </div>
              ))}
          </div>
        </>
      )}
    </FieldArray>
  );
}
