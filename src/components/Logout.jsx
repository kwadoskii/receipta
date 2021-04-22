import { useEffect } from "react";

import auth from "../api/auth";
import Loading from "../Loading";

export default function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/login";
  }, []);

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      <div className="row">
        <div className="col-md-12 pt-4 mt-3">
          <Loading message="Logging out" />
        </div>
      </div>
    </div>
  );
}
