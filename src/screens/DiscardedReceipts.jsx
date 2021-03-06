import React from "react";

import setTitle from "../helpers/setTitle";

export default function DiscardedReceipts() {
  setTitle("Discarded receipts");

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      <div className="row">
        <div className="col-md-12 pt-4 mt-3">
          <h2>Discarded Receipts</h2>
        </div>
      </div>
    </div>
  );
}
