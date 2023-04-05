import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tesseract from "tesseract.js";

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);

  const types = ["image/jpeg", "image/png"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else if (selectedFile && selectedFile.type === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        const pdf = { name: selectedFile.name, data: fileReader.result };
        const storedPdfFiles =
          JSON.parse(localStorage.getItem("pdfFiles")) || [];
        localStorage.setItem(
          "pdfFiles",
          JSON.stringify([...storedPdfFiles, pdf])
        );
        setPdfFiles([...pdfFiles, pdf]);
      };
      setError("");
    } else {
      setFile(null);
      setPdfFiles([]);
      setError("Please select a JPEG, PNG, or PDF file");
    }
  };

  useEffect(() => {
    const storedPdfFiles = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    setPdfFiles(storedPdfFiles);
  }, []);

  const handleDelete = (index) => {
    const newPdfFiles = [...pdfFiles];
    newPdfFiles.splice(index, 1);
    localStorage.setItem("pdfFiles", JSON.stringify(newPdfFiles));
    setPdfFiles(newPdfFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file || pdfFiles.length > 0) {
      const files = pdfFiles.length > 0 ? pdfFiles : [file];
      const texts = await Promise.all(
        files.map(async (f) => {
          const {
            data: { text },
          } = await Tesseract.recognize(f);
          return text;
        })
      );
      setText(texts.join("\n\n"));
    } else {
      setError("Please select an image or PDF to upload");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Choose image || upload a pdf
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="file"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
          />
          <div className="text-red-500">{error}</div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Extract Text || upload a pdf
          </button>
        </div>
      </form>
      {text && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-lg font-bold mb-4">Extracted Text</h2>
          <p className="whitespace-pre-line w-[100%]">{text}</p>
        </div>
      )}

      {pdfFiles.length > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-lg font-bold mb-4">Uploaded PDF Files</h2>
          <ul>
            {pdfFiles.map((pdf, i) => (
              <li key={i}>
                {pdf.name}{" "}
                <a href={pdf.data} className="text-blue-600" download>
                  Download
                </a>{" "}
                <button onClick={() => handleDelete(i) } className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center"
        type="submit"
      >
        <Link to="/home">Go Back Home</Link>
      </button>
    </div>
  );
}

export default ImageUploadForm;
