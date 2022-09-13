import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  ipAddressSelectors,
  fetchSearchIpAddress,
} from "../../features/ipAddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AxiosJwt from "../../utils/AxiosJwt";
import Message from "../Message";
import Swal from "sweetalert2";

const IPAddress = () => {
  const dispatch = useDispatch();

  const ipAddresses = useSelector(ipAddressSelectors.selectAll);

  const [search, setSearch] = useState({ search: "" });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchSearchIpAddress(search));
  }, []);

  const actionDestroy = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const destroy = await AxiosJwt.delete(`/manage/ip/${id}`);

          if (destroy.data.type == "SUCCESS") {
            dispatch(fetchSearchIpAddress(search));
          }
        }
      });
    } catch (error) {
      if (error.response) {
        setMessages(error.response.data.messages);
      }
    }
  };

  const closeMessage = () => {
    setMessages([]);
  };

  return (
    <AdminLayout>
      <div className="container box mt-5">
        <Link to={"/admin/ip-address/add"} className="button is-primary mb-5">
          Add IP Address
        </Link>
        <Message messages={messages} closeMessage={closeMessage} />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Label/Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ipAddresses.map((ipAddress) => (
              <tr key={ipAddress.id}>
                <td>{ipAddress.ipv4}</td>
                <td>{ipAddress.labels[0].title}</td>
                <td>
                  <Link
                    to={`/admin/ip-address/${ipAddress.id}`}
                    className="button is-info is-email mr-3"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/ip-address/${ipAddress.id}/logs`}
                    className="button is-success is-email mr-3"
                  >
                    Logs
                  </Link>
                  <button
                    onClick={() => actionDestroy(ipAddress.id)}
                    className="button is-danger is-email"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ipAddresses.length < 1 ? (
              <tr>
                <td colSpan="3">Data is empty...</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default IPAddress;
