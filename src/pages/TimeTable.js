import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/config";

const TimeTable = () => {
  const modalRef = useRef(null);
  const [unitTitle, setUnitTitle] = useState("");
  const [code, setCode] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
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

  const handleEdit = (item) => {
    setUnitTitle(item.title);
    setCode(item.code);
    setLecturer(item.lecturer);
    setTime(item.time);
    setDay(item.day);
    setEditItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/class/${id}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setData(data.filter((item) => item.id !== id));
      window.alert("timetable successfully deleted");
      window.location.reload();
    } catch (error) {
      window.alert("an error occurred while deleting the timetable");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        const response = await axios.put(
          `${BASE_URL}/class/${editItem._id}`,
          { title: unitTitle, code, lecturer, time, day },
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        window.alert("timetable successfully updated");
        response && window.location.reload();
        setShowModal(false);
      } else {
        const response = await axios.post(
          `${BASE_URL}/class`,
          { title: unitTitle, code, lecturer, time, day },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        window.alert("timetable successfully created");
        response && window.location.reload();
        setShowModal(false);
      }
    } catch (error) {
      window.alert("please input unique values");
    }
  };
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/class`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setData(response.data);
      } catch (error) {
        window.alert(error.response.data);
      }
    };
    handleFetch();
  }, [user.token]);

  const importFromPortal = async () => {
    try {
      const sampleJson = [
        {
          title: "Introduction to Computer Science",
          code: "CS101",
          lecturer: "Dr. Susan",
          time: "10:00 AM",
          day: "Monday",
        },
        {
          title: "Calculus I",
          code: "MATH101",
          lecturer: "Prof. Kasunguwa",
          time: "11:00 AM",
          day: "Tuesday",
        },
        {
          title: "Operating System",
          code: "OPS201",
          lecturer: "Dr. Kinuthia",
          time: "2:00 PM",
          day: "Thursday",
        },
        {
          title: "Organic Chemistry",
          code: "CHEM301",
          lecturer: "Prof. Top G",
          time: "9:00 AM",
          day: "Wednesday",
        },
        {
          title: "Microeconomics",
          code: "ECO201",
          lecturer: "Dr. Kimanzi",
          time: "3:00 PM",
          day: "Friday",
        },
      ];
      const response = await fetch(`${BASE_URL}/class/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         authorization: `Bearer ${user.token}` 
        },
        body: JSON.stringify(sampleJson),
      });
      const data = await response.json();
      window.alert("timetable successfully imported");
        data && window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6 max-w-4xl xl:max-w-6xl mx-auto">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight text-black">
            Timetable
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div className="flex items-center gap-2">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={importFromPortal}
            >
              Import from Portal
            </button>

            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setShowModal(true)}
            >
              Add Class
            </button>
          </div>
        </div>
      </nav>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              // ref={modalRef}
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="unitTitle"
                    >
                      Unit Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="unitTitle"
                      type="text"
                      placeholder="Enter unit title"
                      value={unitTitle}
                      onChange={(e) => setUnitTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="code"
                    >
                      Code
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="code"
                      type="text"
                      placeholder="Enter code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="lecturer"
                    >
                      Lecturer
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lecturer"
                      type="text"
                      placeholder="Enter lecturer"
                      value={lecturer}
                      onChange={(e) => setLecturer(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="day"
                    >
                      Day
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="day"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="">Select a day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="time"
                    >
                      Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="time"
                      type="text"
                      placeholder="Enter time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit
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
            <th className="border border-blue-500 px-4 py-2">Unit Title</th>
            <th className="border border-blue-500 px-4 py-2">Unit Code</th>
            <th className="border border-blue-500 px-4 py-2">Time</th>
            <th className="border border-blue-500 px-4 py-2">Day</th>
            <th className="border border-blue-500 px-4 py-2">Lecturer</th>
            <th className="w-1/12 border border-blue-500 px-4 py-2">Edit</th>
            <th className="w-1/12 border border-blue-500 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border border-blue-500 px-4 py-2">{item.title}</td>
              <td className="border border-blue-500 px-4 py-2">{item.code}</td>
              <td className="border border-blue-500 px-4 py-2">{item.time}</td>
              <td className="border border-blue-500 px-4 py-2">{item.day}</td>
              <td className="border border-blue-500 px-4 py-2">
                {item.lecturer}
              </td>
              <td className="border border-blue-500 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
              </td>
              <td className="border border-blue-500 px-4 py-2">
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
        <div className="pt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
            type="submit"
          >
            <Link to="/home">Go Back Home</Link>
          </button>
        </div>
      </table>
    </div>
  );
};

export default TimeTable;
