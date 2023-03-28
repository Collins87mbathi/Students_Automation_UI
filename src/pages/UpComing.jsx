import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import { Link } from 'react-router-dom';

const UpComing = () => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const user = useSelector((state) => state?.user.user);
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/class/coming`,
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setUpcomingClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [user.token]);

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(weekdays[today]);
  }, []);

  const filteredClasses = upcomingClasses.filter((classItem) => classItem.day === currentDay);

  return (
    <div className="flex flex-col items-center mx-auto max-w-4xl xl:max-w-6xl">
      <h1 className="text-4xl font-bold mt-8 mb-4">Happy {currentDay}!</h1>
      <div className="bg-gray-100 w-2/3 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Today's Classes:</h2>
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <div key={classItem._id} className="flex justify-between mb-2">
              <p>{classItem.title}</p>
              <p>{classItem.time}</p>
            </div>
          ))
        ) : (
          <p>No classes today.</p>
        )}
      </div>
      <div className="pt-10 px-36 flex flex-row gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
            type="submit"
          >
            <Link to="/home">Go Back Home</Link>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
            type="submit"
          >
            <Link to="/timetable">View TimeTable</Link>
          </button>
        </div>
    </div>
  );
};

export default UpComing;
