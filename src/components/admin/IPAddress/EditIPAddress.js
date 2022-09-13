import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ipAddressSelectors,
  fetchSearchIpAddress,
} from "../../../features/ipAddressSlice";
import { labelSelectors, fetchLabel } from "../../../features/labelSlice";
import CreatableSelect from "react-select/creatable";
import Message from "../../Message";
import AxiosJwt from "../../../utils/AxiosJwt";

const EditIPAddress = () => {
  const [ipv4, setIpv4] = useState("");
  const [label, setLabel] = useState([]);

  const [search, setSearch] = useState({ search: "" });
  const [options, setOptions] = useState([]);
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const ipAddress = useSelector((state) =>
    ipAddressSelectors.selectById(state, id)
  );

  const labels = useSelector(labelSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchSearchIpAddress(search));
  }, [dispatch]);

  useEffect(() => {
    if (ipAddress) {
      setIpv4(ipAddress.ipv4);
      setLabel([
        { id: ipAddress.labels[0].id, title: ipAddress.labels[0].title },
      ]);
    }
  }, [ipAddress]);

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

  const actionUpdate = async (e) => {
    e.preventDefault();

    const data = {
      ipv4: ipv4,
      label: label,
    };

    try {
      const update = await AxiosJwt.put(`/manage/ip/${id}`, data);

      if (update.data.type == "SUCCESS") {
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
        <form onSubmit={actionUpdate}>
          <div className="field mt-3">
            <label className="label">IPv4</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="IPv4"
                value={ipv4}
                onChange={(e) => setIpv4(e.target.value)}
                disabled
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
                defaultValue={{
                  value: ipAddress.labels[0].title,
                  label: ipAddress.labels[0].title,
                }}
              />
            </div>
          </div>
          <div className="field mt-5">
            <Link to={"/admin/ip-address"} className="button is-danger mr-3">
              Cancel
            </Link>
            <button className="button is-success">Update</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditIPAddress;
