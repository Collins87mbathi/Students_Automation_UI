import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";

const Assignment = () => {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state?.user.user);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this assignment?");
      if (!confirmed) {
        return;
      }
  
      await axios.delete(`${BASE_URL}/assignment/${id}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setData(data.filter((item) => item._id !== id));
      toast.success('Assignment successfully deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEdit = (id) => {
    const item = data.find((item) => item._id === id);
    setTitle(item.title);
    setDatetime(moment(item.date).format("YYYY-MM-DDTHH:mm"));
    setDescription(item.description);
    setShowModal(true);
    setEditMode(item._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !datetime || !description) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    if (/\d/.test(title)) {
      setErrorMessage("Title should not contain any numbers");
      return;
    }
    try {
      const selectedDate = moment(datetime, "YYYY-MM-DDTHH:mm").toDate();
      if (selectedDate < new Date()) {
        toast.error('Please select a future date and time', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      let response;
      if (editMode) {
        const confirmed = window.confirm("Are you sure you want to update this assignment?");
      if (!confirmed) {
        return;
      }
        response = await axios.put(
          `${BASE_URL}/assignment/${editMode}`,
          { title, date: selectedDate, description },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/assignment`,
          { title, date: selectedDate, description },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      }
      response && toast.success('Assignment successfully created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setShowModal(false);
      setTimeout(() => {
        response && window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/assignment`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [user.token]);

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6 max-w-4xl xl:max-w-6xl mx-auto">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight text-black">
            Assignment
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setShowModal(true)}
            >
              Add Assignment
            </button>
          </div>
        </div>
      </nav>
      {showModal && (
        <div className="mx-auto fixed z-10 inset-0 overflow-y-auto max-w-4xl xl:max-w-6xl">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="datetime"
                      type="datetime-local"
                      placeholder="Enter date and time"
                      value={datetime}
                      onChange={(e) => setDatetime(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    <button
                      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className="mt-8 table-auto border-collapse w-full max-w-4xl xl:max-w-6xl mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{moment(item.date).format("YYYY-MM-DD HH:mm")}</td>
              <td>{item.description}</td>
              <td className="flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-10 px-36">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
          type="submit"
        >
          <Link to="/home">Go Back Home</Link>
        </button>
      </div>
    </div>
  );
};

export default Assignment;
