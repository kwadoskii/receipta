import React from "react";

export default function Dashboard() {
  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      <div className="row">
        <div className="col-md-12 pt-4 mt-3">
          <h2>Dashboard</h2>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-7">
          <ul className="buttonwrapper">
            <li
              id="today"
              className="active"
              // onclick="setLinkActive(this, 'date')"
            >
              <label id="11">TODAY</label>
            </li>
            <li
              id="month"
              // onclick="setLinkActive(this, 'date')"
            >
              <label id="12">MONTH</label>
            </li>
            <li
              id="year"
              // onclick="setLinkActive(this, 'date')"
            >
              <label id="13">YEAR</label>
            </li>
          </ul>
        </div>
        <div className="col-md-5 text-right date-indicator" id="date">
          March 2021
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-primary mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Primary card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content. Some quick example text to build on the card title and
                make up the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-info mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Info card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content. Some quick example text to build on the card title and
                make up the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-warning mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Warning card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content. Some quick example text to build on the card title and
                make up the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-danger mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Danger card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-success mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Success card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-4">
          <div className="card text-white bg-secondary mb-4">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Secondary card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 pb-3">
          <p className="small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quia.
            Voluptates ab debitis quos repellendus in exercitationem voluptate aspernatur,
            possimus quidem, molestias vitae qui, provident necessitatibus.
          </p>
        </div>
      </div>
    </div>
  );
}
