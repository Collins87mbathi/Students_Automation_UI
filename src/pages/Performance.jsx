import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

const Performance = () => {
  const [previousPerformance, setPreviousPerformance] = useState([]);
  const [latestPerformance, setLatestPerformance] = useState(null);
  const user = useSelector((state) => state?.user.user);

  // Fetch previous performance on component mount
  useEffect(() => {
    const fetchPreviousPerformance = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/performance`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setPreviousPerformance(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPreviousPerformance();
  }, [user.token]);

  // Handle file upload
  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('performance', acceptedFiles[0]);
    try {
      const response = await axios.post(`${BASE_URL}/performance`, formData, {
        headers: {
          authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLatestPerformance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-4xl xl:max-w-6xl mx-auto px-4 mt-8'>
      {latestPerformance && (
        <div>
          <h2>Latest Performance:</h2>
          <p>Date: {latestPerformance.date}</p>
          <p>Score: {latestPerformance.score}</p>
          <p>
            File:{' '}
            <a href={`${BASE_URL}/${latestPerformance.filePath}`}>
              {latestPerformance.fileName}
            </a>
          </p>
        </div>
      )}
      <h2>Upload Performance:</h2>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="border-dashed border-2 p-10">
            <input {...getInputProps()} />
            <p>Drag and drop your performance PDF file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
      <h2>Previous Performances:</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {previousPerformance.map((performance) => (
            <tr key={performance._id}>
              <td>{performance.date}</td>
              <td>{performance.score}</td>
              <td>
                <a href={`${BASE_URL}/${performance.filePath}`}>{performance.fileName}</a>
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

export default Performance;
