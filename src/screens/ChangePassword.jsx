import React, { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import useUser from "../hooks/useUser";
import userApi from "../api/user";
import Loading from "../Loading";
import setTitle from "../helpers/setTitle";

export default function ChangePassword({ history }) {
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const userId = useUser()._id;

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required().label("Current password"),
    newPassword: yup.string().required().min(6).label("New password"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords should match")
      .required()
      .label("Confirm password"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    values.userId = userId;
    delete values.confirmNewPassword;

    try {
      const { data } = await userApi.changePassword(values);
      toast.success(data.message);
      resetForm();

      history.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      values.confirmNewPassword = values.newPassword;
      setFields(values);
    }

    setLoading(false);
  };

  setTitle("Change password");

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-md-12 pt-4 mt-3 row m-0">
            <div className="p-0 col-md-6">
              <h4>Change Password</h4>
            </div>

            <div className="col-md-12">
              <Form
                initialValues={fields}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                <div className="form-row">
                  <Input
                    label="Current password"
                    name="currentPassword"
                    type="password"
                  />
                  <Input label="New password" name="newPassword" type="password" />
                  <Input
                    label="Confirm password"
                    name="confirmNewPassword"
                    type="password"
                  />
                </div>
                <SubmitButton name="Change" />
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
