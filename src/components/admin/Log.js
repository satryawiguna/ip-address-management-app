import React, { useState, useEffect } from "react";
import Message from "../Message";
import AdminLayout from "../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchLog, logSelectors } from "../../features/logSlice";
import Swal from "sweetalert2";
import AxiosJwt from "../../utils/AxiosJwt";
import { Link } from "react-router-dom";

const Log = () => {
  const dispatch = useDispatch();

  const logs = useSelector(logSelectors.selectAll);

  const [search, setSearch] = useState({ search: "" });

  useEffect(() => {
    dispatch(fetchSearchLog(search));
  }, []);

  return (
    <AdminLayout>
      <div className="container box mt-5">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Level</th>
              <th>Logged At</th>
              <th>Message</th>
              <th>Context</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.level}</td>
                <td>{log.logged_at}</td>
                <td>{log.message}</td>
                <td>{log.context}</td>
              </tr>
            ))}
            {logs.length < 1 ? (
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

export default Log;
