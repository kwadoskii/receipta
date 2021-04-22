import React from "react";
import { FaTrash } from "react-icons/fa";
import { useFormikContext } from "formik";
import styled from "styled-components";

export default function Item({ index, onRemoveItem }) {
  const { handleBlur, handleChange, values } = useFormikContext();

  return (
    <Container>
      <Quantity
        placeholder="Qty"
        type="number"
        name={`items.${index}.quantity`}
        onChange={handleChange(`items.${index}.quantity`)}
        onBlur={handleBlur(`items.${index}.quantity`)}
        value={values[`items.${index}.quantity`]}
        required
      />
      <Description
        required
        onBlur={handleBlur(`items.${index}.name`)}
        placeholder="Item name"
        name={`items.${index}.name`}
        onChange={handleChange(`items.${index}.name`)}
        value={values[`items.${index}.name`]}
      />
      <UnitCost
        required
        placeholder="Unit cost"
        type="number"
        onBlur={handleBlur(`items.${index}.unitCost`)}
        name={`items.${index}.unitCost`}
        onChange={handleChange(`items.${index}.unitCost`)}
        value={values[`items.${index}.unitCost`]}
      />
      <IconHolder onClick={onRemoveItem}>
        <FaTrash />
      </IconHolder>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  background-color: #e6f0f4;
  padding: 15px 20px;
  border-radius: 5px;
  color: black;
`;

const Quantity = styled.input`
  flex: 0.1;
  min-width: 65px;
  box-sizing: border-box;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  :focus {
    outline: none;
  }
`;
const Description = styled.input`
  flex: 0.7;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  :focus {
    outline: none;
  }
`;
const UnitCost = styled.input`
  flex: 0.1;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;
const IconHolder = styled.div`
  color: tomato;
  font-size: 18px;
  cursor: pointer;
  :hover {
    color: darkred;
  }
`;
