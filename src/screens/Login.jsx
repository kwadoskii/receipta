import React, { useState } from "react";
import * as yup from "yup";

import Form from "../components/form/Form";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";

import "../components/styles/login.css";

export default function Login() {
  const validationSchema = yup.object().shape({
    username: yup.string().required().min(5).label("Username"),
    password: yup.string().required().min(5).label("Password"),
  });

  const handleSubmit = ({ username, password }, { resetForm }) => {
    // if (currentUsers.filter((u) => u.email === email).length) {
    //   setIsDuplicated(true);
    //   setErrorClass("errorBorder");
    //   setTimeout(() => setIsDuplicated(false), 5000);
    //   return;
    // }

    console.log({ username, password });

    // resetForm();
  };

  const [loading, setLoading] = useState(true);
  // const [isDuplicated, setIsDuplicated] = useState(false);
  const [errorClass, setErrorClass] = useState("");

  return (
    <div className="main">
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <div className="title mb-5">
            <h2 className="text-center">Receipt Printer</h2>
            <p>kindly provide your username and password</p>
          </div>

          <Form
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Input
              classes={errorClass}
              placeholder="amaka1"
              label="Username"
              name="username"
              required
            />
            <Input
              classes={errorClass}
              placeholder="••••••••••"
              name="password"
              label="Password"
              type="password"
              required
            />

            <SubmitButton submitting={loading} />
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <footer>
            <p>Built by Kwadoskii</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
