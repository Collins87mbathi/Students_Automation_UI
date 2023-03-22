import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tesseract from "tesseract.js";

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const types = ["image/jpeg", "image/png"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a JPEG or PNG image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const { data: { text } } = await Tesseract.recognize(file);
      setText(text);
    } else {
      setError("Please select an image to upload");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-12">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Choose image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="file"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
          />
          <div className="text-red-500">{error}</div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Extract Text
          </button>
        </div>
      </form>
      {text && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-lg font-bold mb-4">Extracted Text</h2>
          <p className="whitespace-pre-line">{text}</p>
        </div>
      )}

<button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
          type="submit"
        >
            <Link to='/'>
            Go Back Home
            </Link>
        </button>
    </div>
  );
}

export default ImageUploadForm;
