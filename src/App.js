import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import Sidebar from "./components/Sidebar";
import config from "./config.json";
import Dashboard from "./screens/Dashboard";
import Cost from "./screens/Cost";
import Appliances from "./screens/Appliances";
import Company from "./screens/Company";
import UserManagement from "./screens/UserManagement";
import Login from "./screens/Login";

function App() {
  const navs = config.navs;

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <Sidebar header="Neulogic Solutions" subHeader="Wale Adigun" navs={navs} />
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/cost" component={Cost} />
              <Route path="/appliances" component={Appliances} />
              <Route path="/settings/company" component={Company} />
              <Route path="/settings/users" component={UserManagement} />
              <Route path="/demos/company" component={Cost} />
              {/* <Redirect exact from="/" to="/dashboard" /> */}
              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
