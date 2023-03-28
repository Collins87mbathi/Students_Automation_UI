import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const SetUp = () => {
  return (
    <>
    <Navbar/>
    <div className="m-auto px-4 py-12 max-w-4xl xl:max-w-6xl">
      <div className="flex flex-row gap-10 justify-center align-middle items-center pt-24">
        <div className="border h-40 w-40 shadow-lg rounded-lg hover:scale-105 duration-300">
          <Link to="/home">
            <div className="flex gap-1 flex-col p-2">
              <h3 className="font-bold text-center pt-14">Productivity</h3>
            </div>
          </Link>
        </div>
        <div className="border h-40 w-40 shadow-lg rounded-lg hover:scale-105 duration-300">
          <Link to="/performance">
            <div className="flex gap-1 flex-col p-2">
              <h3 className="font-bold text-center pt-14">Performance</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default SetUp;
