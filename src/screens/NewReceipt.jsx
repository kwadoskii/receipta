import React, { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import authUser from "../hooks/useUser";
import ItemAdder from "../components/ItemAdder";
import receiptApi from "../api/receipt";
import Loading from "../Loading";
import setTitle from "../helpers/setTitle";

export default function NewReceipt({ history }) {
  const [fields] = useState({
    customerName: "",
    phone: "",
    line1: "",
    line2: "",
    state: "Lagos",
    country: "Nigeria",
    items: [{ name: "", unitCost: "", quantity: "" }],
  });

  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    customerName: yup.string().required().max(50).label("Customer Name"),
    phone: yup
      .string()
      .required()
      .max(14)
      .label("Phone number")
      .matches(/^[+0-9\-().\s]{8,14}$/, "Phone must be in valid phone number"),
    line1: yup.string().max(25).required().label("Line 1"),
    line2: yup.string().max(25).required().label("Line 2"),
    state: yup.string().max(30).required().label("State"),
    country: yup.string().max(30).required().label("Country"),
    items: yup.array().of(
      yup.object().shape({
        name: yup.string().required().label("Item name"),
        unitCost: yup.number().min(1).max(99999999).required().label("Unit cost"),
        quantity: yup.number().min(1).max(9999).required().label("Quantity"),
      })
    ),
  });

  const handleSubmit = async ({ ...fields }, { resetForm }) => {
    mapToFields(fields);

    try {
      setLoading(true);
      const { data } = await receiptApi.addNew(fields, { responseType: "blob" });

      const blob = new Blob([data], { type: "application/pdf" });
      // saveAs(blob, `${fields.customerName}.pdf`);

      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl);

      toast.success("Receipt saved", { pauseOnFocusLoss: false });

      setLoading(false);
      resetForm();
      history.push("/receipt/all");
    } catch (error) {
      console.log(error);
    }
  };

  const mapToFields = (fields) => {
    const issuer = authUser()._id;
    const address = {
      line1: fields.line1,
      line2: fields.line2,
      state: fields.state,
      country: fields.country,
    };

    fields.address = address;
    fields.issuer = issuer;

    delete fields.line1;
    delete fields.line2;
    delete fields.state;
    delete fields.country;

    return fields;
  };

  setTitle("New receipt");

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      <div className="row">
        {loading ? (
          <Loading message="Generating receipt" />
        ) : (
          <div className="col-md-12 pt-1 mt-1">
            <h2>New Receipt</h2>

            <Form
              enableReinitialize={true}
              initialValues={fields}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <div className="form-row">
                <Input name="customerName" label="Customer Name" size="col-md-6" />
                <Input name="phone" label="Phone number" size="col-md-6" />
              </div>

              <div className="form-row">
                <Input name="line1" label="Address line 1" size="col-md-3" />
                <Input name="line2" label="Address line 2" size="col-md-3" />
                <Input name="state" label="State" size="col-md-3" />
                <Input name="country" label="Country" size="col-md-3" />
              </div>

              <div className="form-group">
                <ItemAdder name="items" />
              </div>

              <SubmitButton name="Generate receipt" />
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
