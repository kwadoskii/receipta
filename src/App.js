import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, Bounce as Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import Dashboard from "./screens/Dashboard";
import Company from "./screens/Company";
import UserManagement from "./screens/UserManagement";
import Login from "./screens/Login";
import Logout from "./components/Logout";
import NewReceipt from "./screens/NewReceipt";
import AllReceipts from "./screens/AllReceipts";
import DiscardedReceipts from "./screens/DiscardedReceipts";
import Auth from "./components/Auth";
import organisationApi from "./api/organisation";
import NewUser from "./screens/NewUser";
import ChangePassword from "./screens/ChangePassword";
import ChangeLogo from "./screens/ChangeLogo";

function App() {
  const [org, setOrg] = useState({});

  useEffect(() => {
    const getOrganisation = async () => {
      const { data } = await organisationApi.getDetails();
      setOrg(data);
    };

    getOrganisation();
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={3500}
        closeOnClick={true}
        draggable
        hideProgressBar={false}
        limit={3}
        newestOnTop
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
        rtl={false}
        transition={Flip}
      />
      <div className="App">
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Auth org={org}>
                  <Route path="/receipt/new" exact component={NewReceipt} />
                  <Route path="/receipt/all" component={AllReceipts} />
                  <Route path="/receipt/discarded" component={DiscardedReceipts} />
                  <Route path="/settings/company" component={Company} />
                  <Route path="/settings/users" exact component={UserManagement} />
                  <Route path="/settings/users/:id" component={NewUser} />
                  <Route path="/settings/logo" component={ChangeLogo} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/changepassword" component={ChangePassword} />
                  <Route path="/logout" component={Logout} />
                  <Route component={Dashboard} />
                </Auth>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
