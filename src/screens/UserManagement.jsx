import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPen, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import _ from "lodash";
import ReactPaginate from "react-paginate";

import Loading from "../Loading";
import userApi from "../api/user";
import setTitle from "../helpers/setTitle";
import { paginate } from "../helpers/paginate";

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const deleteUser = async (id) => {
    const oldUsers = users;
    try {
      setUsers(users.filter((u) => u._id !== id));
      await userApi.deleteUser(id);
      toast.success("User deleted");
    } catch (error) {
      setUsers(oldUsers);
      toast.error("Could not delete user");
    }
  };
  const handlePageChange = ({ selected }) => setCurrentPage(selected);
  const getPageData = () => paginate(users, currentPage + 1, pageSize);

  setTitle("User management");

  useEffect(() => {
    let mounted = true;
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const { data } = await userApi.getAll();
        setUsers(_.sortBy(data, ["username"]));
        setLoading(false);
      } catch (error) {}
    };

    if (mounted) {
      getAllUsers();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const paginatedUsers = getPageData();

  return (
    <div id="content-body" className="col-12 col-md-9 col-xl-10 pl-4 pr-4 bd-content">
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col-md-12 pt-4 mt-3 row m-0">
            <div className="p-0 col-md-6">
              <h4>User Management</h4>
            </div>

            <div className="p-0 col-md-6">
              <div className="text-right">
                <Link className="btn btn-primary" to={"/settings/users/new"}>
                  <FaPlus />
                </Link>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped mt-3 table-borderless ">
                <thead className="thead-dark">
                  <tr className="py-2">
                    <th>S/N</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>User type</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-light">
                  {paginatedUsers.map((u, i) => (
                    <tr className="py-2" key={u._id.toString()}>
                      <td>{i + 1}</td>
                      <td>{u.username}</td>
                      <td>{`${u.firstname} ${u.lastname}`}</td>
                      <td>{u.isAdmin ? "Admin" : "Issuer"}</td>
                      <td>{u.email}</td>
                      <td>
                        <Link to={`/settings/users/${u._id}`}>
                          <FaPen
                            className="mx-2"
                            color="black"
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                        <FaTrash
                          style={{ cursor: "pointer" }}
                          color="tomato"
                          onClick={() => deleteUser(u._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {Math.ceil(users.length / pageSize) > 1 && (
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
                pageCount={Math.ceil(users.length / pageSize)}
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
