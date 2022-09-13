import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import AxiosJwt from "../../../utils/AxiosJwt";
import Message from "../../Message";

const AddLabelComment = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [messages, setMessages] = useState([]);

  const actionStore = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
    };

    try {
      const store = await AxiosJwt.post("/manage/label", data);

      if (store.data.type == "SUCCESS") {
        navigate("/admin/label");
      }
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
        <Message messages={messages} closeMessage={closeMessage} />
        <form onSubmit={actionStore}>
          <div className="field mt-3">
            <label className="label">Title</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-5">
            <Link to={"/admin/label"} className="button is-danger mr-3">
              Cancel
            </Link>
            <button className="button is-success">Save</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddLabelComment;
