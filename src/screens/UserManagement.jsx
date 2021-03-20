import React, { useEffect, useState } from "react";

import Loading from "../Loading";

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 2000);

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      <div className="row">
        <div className="col-md-12 pt-4 mt-3">
          {loading ? <Loading /> : <h2>User Management</h2>}
        </div>
      </div>
    </div>
  );
}
