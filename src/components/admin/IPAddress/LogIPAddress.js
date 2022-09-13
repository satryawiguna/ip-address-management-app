import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ipAddressSelectors,
  fetchSearchIpAddress,
} from "../../../features/ipAddressSlice";

const LogIPAddress = () => {
  const [search, setSearch] = useState({ search: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const ipAddress = useSelector((state) =>
    ipAddressSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(fetchSearchIpAddress(search));
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="container box mt-5">
        <Link to={"/admin/ip-address"} className="button is-primary mb-5">
          Back to List IP Address
        </Link>
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
            {ipAddress.audit_logs.map((log) => (
              <tr key={log.id}>
                <td>{log.level}</td>
                <td>{log.logged_at}</td>
                <td>{log.message}</td>
                <td>{log.context}</td>
              </tr>
            ))}
            {ipAddress.audit_logs.length < 1 ? (
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

export default LogIPAddress;
