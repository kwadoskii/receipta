import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Loading from "../Loading";
import setTitle from "../helpers/setTitle";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import organisationApi from "../api/organisation";

export default function Company() {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    state: "",
    country: "",
    rcNumber: "",
    email: "",
    website: "",
    motto: "",
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).label("Name"),
    phone: yup
      .string()
      .max(14)
      .required()
      .label("Phone")
      .matches(/^[+0-9\-().\s]{8,14}$/, "Phone must be in valid phone number"),
    line1: yup.string().max(25).required().label("Line 1"),
    line2: yup.string().max(25).required().label("Line 2"),
    state: yup.string().max(30).required().label("State"),
    country: yup.string().max(30).required().label("Country"),
    rcNumber: yup.string().max(10).label("RC number"),
    email: yup.string().email().label("Email"),
    website: yup.string().max(255).label("Website"),
    motto: yup.string().max(100).label("Motto"),
  });

  const handleSubmit = async ({ ...fields }) => {
    mapToFields(fields);

    try {
      setLoading(true);
      await organisationApi.editOrganisation(fields);
      getOrgDetails();
      setLoading(false);

      toast.success("Company details saved");
    } catch (error) {}
  };

  const getOrgDetails = async () => {
    setLoading(true);
    let { data } = await organisationApi.getDetails();

    setFields(mapToView(data));
    setLoading(false);
  };

  const mapToFields = (fields) => {
    fields.address = {
      line1: fields.line1,
      line2: fields.line2,
      state: fields.state,
      country: fields.country,
    };

    delete fields.line1;
    delete fields.line2;
    delete fields.state;
    delete fields.country;

    return fields;
  };

  const mapToView = (data) => {
    data = { ...data, ...data.address };
    delete data.address;
    delete data._id;
    delete data.logo;

    return data;
  };

  setTitle("Company details");

  useEffect(() => {
    getOrgDetails();

    return function cleanup() {};
  }, []);

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-md-12 pt-4 mt-3">
            <div className="p-0">
              <h4>Company Details</h4>

              <Form
                initialValues={fields}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                <div className="form-row">
                  <Input name="name" label="Name" size="col-md-6" />
                  <Input name="rcNumber" label="RC number" size="col-md-6" />
                </div>

                <div className="form-row">
                  <Input name="line1" size="col-md-3" label="Address Line 1" />
                  <Input name="line2" size="col-md-3" label="Address Line 2" />
                  <Input name="state" size="col-md-3" label="State" />
                  <Input name="country" size="col-md-3" label="Country" />
                </div>

                <div className="form-row">
                  <Input name="email" size="col-md-6" type="email" label="Email" />
                  <Input name="phone" size="col-md-6" label="Phone" />
                </div>

                <div className="form-row">
                  <Input name="website" size="col-md-6" label="Website" />
                  <Input name="motto" size="col-md-6" label="Motto" />
                </div>

                <SubmitButton name="Save changes" />
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
