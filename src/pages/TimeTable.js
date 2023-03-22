import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/config';

const TimeTable = () => {
    const [unitTitle, setUnitTitle] = useState("");
    const [code, setCode] = useState("");
    const [lecturer, setLecturer] = useState("");
    const [time, setTime] = useState("");
  
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/class'`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title:unitTitle, code, lecturer, time })
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
        window.alert("timetable successfully created");
        console.log({ unitTitle, code, lecturer, time });
      };


  return (
    <div className="w-full max-w-xs mx-auto mt-8">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="code">
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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lecturer">
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
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
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
      </div>
    </form>
    <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
          type="submit"
        >
            <Link to='/'>
            Go Back Home
            </Link>
        </button>

  </div>
  )
}

export default TimeTable