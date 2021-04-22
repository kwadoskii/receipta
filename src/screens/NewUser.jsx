import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import Select from "../components/form/Select";
import userApi from "../api/user";
import setTitle from "../helpers/setTitle";
import Loading from "../Loading";

export default function NewUser({ match, history }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required().min(5).max(20).label("Username"),
    password: yup.string().required().min(5).max(20).label("Password"),
    firstname: yup.string().required().min(5).max(20).label("Firstname"),
    lastname: yup.string().required().min(5).max(20).label("Lastname"),
    isAdmin: yup.bool().required().label("User Type"),
    email: yup.string().required().email().label("Email"),
  });

  const [fields, setFields] = useState({
    username: "",
    firstname: "",
    lastname: "",
    isAdmin: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const userId = match.params.id;

  const handleSubmit = async ({ ...userDetails }, { resetForm }) => {
    setLoading(true);
    try {
      if (userId === "new") {
        await userApi.addUser(userDetails);
      } else {
        await userApi.editUser(userDetails);
      }
      history.push("/settings/users");
      toast.success("User saved");

      resetForm();
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data.message);
      setFields(userDetails);
      setLoading(false);
    }
  };

  const populateUser = async () => {
    try {
      if (userId === "new") {
        setTitle("New user");
        return;
      }

      setTitle("Edit user");
      const { data } = await userApi.getUser(userId);
      setFields(mapToView(data));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        history.push("/settings/users");
        toast.error(error.response.data.message);
      }
    }
  };

  const mapToView = (user) => {
    return {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin ? "1" : "0",
      email: user.email,
      password: "123456", //default value not really parsed
    };
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await populateUser();
      setLoading(false);
    })();
  }, []);

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-md-12 pt-4 mt-3">
            <h4>New User</h4>

            <div className="mt-2 pb-4">
              <Form
                initialValues={fields}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                <div className="col-md-12 mx-auto">
                  <div className="form-row">
                    <Input
                      size="col-md-6"
                      placeholder=""
                      label="Username"
                      name="username"
                      required
                    />
                    <Select
                      size="col-md-6"
                      label="User Type"
                      name="isAdmin"
                      required
                      options={[
                        { name: 1, value: "Admin" },
                        { name: 0, value: "Issuer" },
                      ]}
                    />
                  </div>

                  <div className="form-row">
                    <Input
                      placeholder=""
                      label="Firstname"
                      name="firstname"
                      required
                      size="col-md-6"
                    />
                    <Input
                      placeholder=""
                      label="Lastname"
                      name="lastname"
                      required
                      size="col-md-6"
                    />
                  </div>

                  <div className="form-row">
                    <Input
                      placeholder=""
                      label="Email"
                      name="email"
                      required
                      size="col-md-6"
                    />
                    {userId === "new" && (
                      <Input
                        placeholder=""
                        label="Password"
                        name="password"
                        type="password"
                        required
                        size="col-md-6"
                      />
                    )}
                  </div>
                  <SubmitButton name="Save" />
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
