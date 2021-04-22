import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import auth from "../api/auth";
import Sidebar from "./Sidebar";
import config from "../config.json";

export default function Auth({ children, org }) {
  const [user, setUser] = useState({});

  const history = useHistory();
  const navs = config.navs;

  useEffect(() => {
    const jwt = auth.getJwt();
    if (!jwt) return history.push("/login");

    const user = auth.getAuthUser();
    setUser(user);
  }, []);

  return !user.hasOwnProperty("username") ? (
    <></>
  ) : (
    <>
      <Sidebar header={org.name} subHeader={user?.username} navs={navs} user={user} />
      {children}
    </>
  );
}
