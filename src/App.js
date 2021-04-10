import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import Sidebar from "./components/Sidebar";
import config from "./config.json";
import Dashboard from "./screens/Dashboard";
import Company from "./screens/Company";
import UserManagement from "./screens/UserManagement";
import Login from "./screens/Login";
import auth from "./api/auth";
import Logout from "./components/Logout";
import NewReceipt from "./screens/NewReceipt";
import AllReceipts from "./screens/AllReceipts";
import DiscardedReceipts from "./screens/DiscardedReceipts";

function App() {
  const navs = config.navs;
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = auth.getAuthUser();
    console.log(user);
    setUser(user);
  }, []);

  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            {user?.hasOwnProperty("username") ? (
              <BrowserRouter>
                <Sidebar
                  header="Neulogic Solutions"
                  subHeader={user.username}
                  navs={navs}
                  user={user}
                />
                <Switch>
                  <Route path="/receipt/new" component={NewReceipt} />
                  <Route path="/receipt/all" component={AllReceipts} />
                  <Route path="/receipt/discarded" component={DiscardedReceipts} />
                  <Route path="/settings/company" component={Company} />
                  <Route path="/settings/users" component={UserManagement} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/logout" component={Logout} />
                  <Redirect exact from="/" to="/dashboard" />
                  {/* <Redirect to="/dashboard" /> */}
                </Switch>
              </BrowserRouter>
            ) : (
              <BrowserRouter>
                <Switch>
                  <Route path="/login" exact component={Login} />
                  {/* <Redirect from="/login" to="/login" /> */}
                  <Redirect to="/login" />
                </Switch>
              </BrowserRouter>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
