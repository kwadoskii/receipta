import React, { useEffect, useState } from "react";
import { FaTrash, FaFilePdf } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import receiptApi from "../api/receipt";
import useUser from "../hooks/useUser";
import Loading from "../Loading";
import setTitle from "../helpers/setTitle";
import { paginate } from "../helpers/paginate";

export default function AllReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [LoadingMessage, setLoadingMessage] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const user = useUser();
  setTitle("All receipts");

  const handlePageChange = ({ selected }) => setCurrentPage(selected);
  const handleOpenPdf = async (receiptNumber) => {
    setLoadingMessage("Generating pdf");
    setLoading(true);
    try {
      const { data } = await receiptApi.getOne(receiptNumber, { responseType: "blob" });

      const blob = new Blob([data], { type: "application/pdf" });

      const pdfUrl = URL.createObjectURL(blob);
      setLoading(false);
      window.open(pdfUrl);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getPageData = () => paginate(receipts, currentPage + 1, pageSize); //may handle search and sorting here too

  useEffect(() => {
    const getAllReceipts = async () => {
      setLoading(true);
      const { data: receipts } = await receiptApi.getAll();
      setReceipts(receipts);
      setLoading(false);
    };

    getAllReceipts();
  }, []);

  const paginatedReceipts = getPageData();

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading message={LoadingMessage} />
      ) : (
        <div className="row">
          <div className="col-md-12 pt-1 mt-1">
            <h4>All Receipts</h4>

            <div className="table-responsive">
              <table className="table table-striped mt-3 table-borderless">
                <thead className="thead-dark">
                  <tr className="py-2">
                    <th>Receipt No</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Total Amount</th>
                    <th>Issuer</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="table-light">
                  {paginatedReceipts.map((pr) => (
                    <tr key={pr.receiptNumber}>
                      <td>{pr.receiptNumber}</td>
                      <td>{pr.customerName}</td>
                      <td>{pr.phone}</td>
                      <td>
                        N{pr.items.reduce((acc, i) => acc + i.quantity * i.unitCost, 0)}
                      </td>
                      <td>{pr.issuer?.username}</td>
                      <td>
                        <FaFilePdf
                          className="mx-2"
                          color="#c33351"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenPdf(pr.receiptNumber)}
                        />
                        {user._id === pr.issuer?._id && <FaTrash color="tomato" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {Math.ceil(receipts.length / pageSize) > 1 && (
            <div className="col-md-12">
              <ReactPaginate
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                pageCount={Math.ceil(receipts.length / pageSize)}
                pageRangeDisplayed={3}
                onPageChange={(page) => handlePageChange(page)}
                marginPagesDisplayed={1}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
