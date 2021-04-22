import React, { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import auth from "../api/auth";
import setTitle from "../helpers/setTitle";

import "../components/styles/login.css";

export default function Login() {
  const [disableLogin, setDisableLogin] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(5).label("Username"),
    password: yup.string().required().min(5).label("Password"),
  });

  const handleLogin = async ({ username, password }) => {
    setDisableLogin(true);

    auth
      .login(username, password)
      .then(() => {
        window.location = "/dashboard";
      })
      .catch((error) => {
        setDisableLogin(false);
        if (error.response) toast.info(error.response.data?.message, { delay: 3000 });
      });
  };

  setTitle("Login");

  return (
    <div className="main my-auto">
      <div className="row mt-5">
        <div className="col-md-7 col-lg-5 mx-auto">
          <div className="title mb-5">
            <h2 className="text-center">Receipt Printer</h2>
            <p>kindly provide your username and password</p>
          </div>

          <Form
            initialValues={{ username: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            <div className="form-row">
              <Input placeholder="amaka1" label="Username" name="username" required />
              <Input
                placeholder="••••••••••"
                name="password"
                label="Password"
                type="password"
                required
              />
            </div>
            <SubmitButton submitting={disableLogin} name="Login" />
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <footer>
            <p className="text-center mt-5">Built by Kwadoskii</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
