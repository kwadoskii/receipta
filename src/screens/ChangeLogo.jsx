import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Loading from "../Loading";
import setTitle from "../helpers/setTitle";
import orgApi from "../api/organisation";
import { toast } from "react-toastify";

export default function ChangeLogo() {
  const [loading, setLoading] = useState(false);
  const [logoStr, setLogoStr] = useState("");

  //for upload
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  let rawStr = "data:image/png;charset=utf-8;base64,";

  const handleOnChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isFilePicked) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("logo", selectedFile);

    setLoading(true);
    orgApi
      .changeLogo(formData)
      .then((res) => {
        rawStr += Buffer.from(res.data.data).toString("base64");

        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((_) => toast.error("Unable to change logo"));

    setLoading(false);
  };

  setTitle("Change Logo");

  useEffect(() => {
    setLoading(true);

    orgApi
      .getLogo()
      .then((res) => {
        rawStr += Buffer.from(res.data.logo.data).toString("base64");
        setLogoStr(rawStr);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading message="Loading logo" />
      ) : (
        <div className="row">
          <div className="col-md-12 mx-auto pt-4 mt-3 row">
            <h4>Change Logo</h4>

            <div className="col-md-12 mt-3">
              <div className="col-md-8 mx-auto py-5 text-center">
                <ImageHolder
                  className="w-100 mb-5 imageholder"
                  style={{ background: `url(${logoStr})` }}
                >
                  {/* <img height={150} src={logoStr} alt="company logo" /> */}
                </ImageHolder>

                <form action="">
                  <div className="actions d-flex flex-wrap justify-content-between">
                    <input
                      className="mb-2"
                      type="file"
                      name="logo"
                      id="logo"
                      onChange={handleOnChange}
                    />

                    <button
                      type="submit"
                      onClick={(e) => handleUpload(e)}
                      className="btn btn-primary mb-2"
                    >
                      Change logo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ImageHolder = styled.div`
  background-size: contain !important;
  background-repeat: no-repeat !important;
  width: 100%;
  height: 150px;
`;
