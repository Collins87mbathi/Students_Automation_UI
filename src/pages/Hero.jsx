import React from 'react'
import img from "../assests/settings.png"
import img1 from "../assests/website.png";
import img2 from "../assests/notes.png";
import img3 from "../assests/next-week.png";
import img4 from "../assests/rating.png";
import img5 from "../assests/timetable.png";
import img6 from "../assests/performance.png"
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className="m-auto px-4 py-12 max-w-4xl xl:max-w-6xl">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 xl:grid-cols-4">
         <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
          <Link to='/assignment'>
      <div className="h-25 m-4">
        <img
          src={img}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>

      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Due Assignment</h3>
        </div>
        </Link>
    </div>

   <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
     <Link to='/classes'>
      <div className="h-25 m-4">
        <img
          src={img3}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>
      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Upcoming classes</h3>
        </div>
        </Link>
    </div>
   
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <Link to='/timetable'>
      <div className="h-25 m-4">
        <img
          src={img5}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>

      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Timetable</h3>
        </div>
        </Link>
    </div>
   
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <div className="h-25 m-4">
        <img
          src={img4}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>

      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Recommendations</h3>
        </div>
    </div>
   
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <Link to="/notes">
      <div className="h-25 m-4">
        <img
          src={img2}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>

      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Notes</h3>
        </div>
        </Link>
    </div>
    
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <Link to='https://masomo.mut.ac.ke/'>
      <div className="h-25 m-4">
        <img
          src={img1}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>
     
      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">Masomo portal</h3>
        </div>
        </Link>
    </div>
    
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <Link to='/performance'>
      <div className="h-25 m-4">
        <img
          src={img6}
          className="w-full h-full object-contain"
          alt="png"
        />
      </div>

      <div className="flex gap-1 flex-col p-2">
        <h3 className="font-bold text-center">upload performance</h3>
        </div>
        </Link>
    </div>      
    </div>
    </div>
  )
}

export default Hero