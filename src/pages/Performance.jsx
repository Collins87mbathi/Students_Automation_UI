import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { Link } from "react-router-dom";


const Performance = () => {
  const [performance, setPerformance] = useState([]);
  const user = useSelector((state) => state?.user.user);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/performance`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setPerformance(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [user.token]);

  const importFromPortal = async () => {
    try {
      const sampleJson = [
        {
          unitCode: "CS101",
          unitTitle: "Introduction to Computer Science",
          grade: "A",
          year: 2,
          semester: 1,
        },
        {
          unitCode: "MATH101",
          unitTitle: "Calculus I",
          grade: "B",
          year: 2,
          semester: 1,
        },
        {
          unitCode: "OPS201",
          unitTitle: "Operating System",
          grade: "B",
          year: 2,
          semester: 1,
        },
        {
          unitCode: "CHEM301",
          unitTitle: "Organic Chemistry",
          grade: "A",
          year: 2,
          semester: 2,
        },
        {
          unitCode: "ECO201",
          unitTitle: "Microeconomics",
          grade: "C",
          year: 1,
          semester: 1,
        },
      ];
      
      const response = await fetch(`${BASE_URL}/performance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         authorization: `Bearer ${user.token}` 
        },
        body: JSON.stringify(sampleJson),
      });
      const data = await response.json();
      window.alert("performance successfully imported");
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
            Performance
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div className="flex items-center gap-2">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={importFromPortal}
            >
              Import from Portal
            </button>
          </div>
        </div>
      </nav>
      <table className="table-auto w-full mt-5 max-w-4xl xl:max-w-6xl mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Unit Code</th>
            <th className="px-4 py-2">Unit Title</th>
            <th className="px-4 py-2">Grade</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Semester</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p.unitCode}</td>
              <td className="border px-4 py-2">{p.unitTitle}</td>
              <td className="border px-4 py-2">{p.grade}</td>
              <td className="border px-4 py-2">{p.year}</td>
              <td className="border px-4 py-2">{p.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-8 max-w-4xl xl:max-w-6xl mx-auto">
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

export default Performance;
