import React, { Component, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosJwt from "../../../utils/AxiosJwt";
import Message from "../../Message";
import CreatableSelect from "react-select/creatable";
import { labelSelectors, fetchLabel } from "../../../features/labelSlice";
import { useSelector, useDispatch } from "react-redux";

const AddIPAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const labels = useSelector(labelSelectors.selectAll);

  const [ipv4, setIpv4] = useState("");
  const [label, setLabel] = useState([]);

  const [options, setOptions] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchLabel());

    let labelOptions = [];

    labels.map((label) => {
      labelOptions.push({
        value: { id: label.id, title: label.title },
        label: label.title,
      });
    });

    setOptions(labelOptions);
  }, []);

  const handleChange = (newValue, actionMeta) => {
    if (newValue != null) {
      if (typeof newValue.value === "string") {
        let oldValue = newValue.value;

        newValue.value = { id: 0, title: oldValue };
      }

      setLabel([newValue.value]);
    } else {
      setLabel([newValue]);
    }
  };

  const actionStore = async (e) => {
    e.preventDefault();

    const data = {
      ipv4: ipv4,
      label: label,
    };

    try {
      const store = await AxiosJwt.post("/manage/ip", data);

      if (store.data.type == "SUCCESS") {
        navigate("/admin/ip-address");
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
            <label className="label">IPv4</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="IPv4"
                value={ipv4}
                onChange={(e) => setIpv4(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Label/Comment</label>
            <div className="controls">
              <CreatableSelect
                options={options}
                isClearable
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field mt-5">
            <Link to={"/admin/ip-address"} className="button is-danger mr-3">
              Cancel
            </Link>
            <button className="button is-success">Save</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddIPAddress;
