import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config/config";

const Assignment = () => {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/assignment`,
        { title, date, description },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.alert("timetable successfully created");
      response && window.location.reload();
      setShowModal(false);
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
                      id="date"
                      type="date"
                      placeholder="Enter date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
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
    {data.map((assignment) => (
      <tr key={data._id}>
        <td className="border px-4 py-2">{assignment.title}</td>
        <td className="border px-4 py-2">{new Date(assignment.date).toLocaleDateString('en-GB')}</td>
        <td className="border px-4 py-2">{assignment.description}</td>
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
