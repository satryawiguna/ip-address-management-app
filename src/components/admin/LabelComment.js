import React, { useState, useEffect } from "react";
import Message from "../Message";
import AdminLayout from "../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchLabel, labelSelectors } from "../../features/labelSlice";
import Swal from "sweetalert2";
import AxiosJwt from "../../utils/AxiosJwt";
import { Link } from "react-router-dom";

const LabelComment = () => {
  const dispatch = useDispatch();

  const labels = useSelector(labelSelectors.selectAll);

  const [search, setSearch] = useState({ search: "" });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchSearchLabel(search));
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
          const destroy = await AxiosJwt.delete(`/manage/label/${id}`);

          if (destroy.data.type == "SUCCESS") {
            dispatch(fetchSearchLabel(search));
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
        <Link to={"/admin/label/add"} className="button is-primary mb-5">
          Add Label/Comment
        </Link>
        <Message messages={messages} closeMessage={closeMessage} />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label) => (
              <tr key={label.id}>
                <td>{label.title}</td>
                <td>
                  <Link
                    to={`/admin/label/${label.id}`}
                    className="button is-info is-email mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => actionDestroy(label.id)}
                    className="button is-danger is-email"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {labels.length < 1 ? (
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

export default LabelComment;
