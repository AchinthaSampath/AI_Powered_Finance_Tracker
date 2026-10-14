import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fileUpload } from "../services/transactionService";
import { Sparkles, X, FileSpreadsheet, Check } from "lucide-react";

const FileUpload = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); //set the first file outputs an array
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("statement", file);

    try {
      await fileUpload(formData);
      onClose();
      navigate("/transactions");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-slate-800">
        {/* Header */}
        <div className="flex justify-between">
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-500 dark:bg-indigo-900/50">
            <Sparkles />
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-gray-100 dark:bg-slate-700 dark:text-white"
          >
            <X className="mx-auto" size={18} />
          </button>
        </div>

        {/* Text */}
        <p className="mt-4 text-xs font-semibold tracking-widest text-indigo-500">
          AI-POWERED IMPORT
        </p>
        <h4 className="mt-2 text-2xl font-semibold dark:text-white">
          Bring in your bank statement
        </h4>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Upload a CSV and ClearMoney will identify, categorize, and organize
          each transaction for you.
        </p>

        {/* Button 1: choose the file */}
        <label className="mt-6 flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 py-10 dark:border-indigo-400/40 dark:bg-indigo-950/50">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <FileSpreadsheet className="text-indigo-500" />
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
            {file ? file.name : "Choose a CSV file"}
          </span>
          <span className="text-xs text-slate-400">
            click to browse · CSV up to 10 MB
          </span>
        </label>

        {/* Selected file row */}
        {file && (
          <div className="mt-4 flex items-center justify-between text-sm text-emerald-500">
            <span className="flex items-center gap-2">
              <Check size={16} /> {file.name}
            </span>
            <button onClick={() => setFile(null)}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* Button 2: upload / analyze */}
        <button
          onClick={handleUpload}
          disabled={!file}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Sparkles size={16} /> Analyze statement
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          Your data stays private and is never shared.
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
