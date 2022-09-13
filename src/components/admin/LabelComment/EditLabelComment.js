import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSearchLabel, labelSelectors } from "../../../features/labelSlice";
import AxiosJwt from "../../../utils/AxiosJwt";
import Message from "../../Message";

const EditLabelComment = () => {
  const [title, setTitle] = useState("");

  const [search, setSearch] = useState({ search: "" });
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const label = useSelector((state) => labelSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(fetchSearchLabel(search));
  }, [dispatch]);

  useEffect(() => {
    if (label) {
      setTitle(label.title);
    }
  }, [label]);

  const actionUpdate = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
    };

    try {
      const update = await AxiosJwt.put(`/manage/label/${id}`, data);

      if (update.data.type == "SUCCESS") {
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
        <form onSubmit={actionUpdate}>
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
            <button className="button is-success">Update</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditLabelComment;
