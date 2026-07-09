"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Loading from "./Loading";
import Papa from "papaparse";
import API from "../../services/api";
import ResultTable from "./ResultTable";
import toast from "react-hot-toast";

export default function CSVUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles) => {
    const csv = acceptedFiles[0];

    if (!csv) return;

    setFile(csv);
    setResult(null);

    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreview(results.data);
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const handleConfirmImport = async () => {
    if (!file) {
      toast.error("Please upload a CSV first.");
      return;
    }

    try {
      setLoading(true);
      setProgress(10);
      setLoadingText("📤 Uploading CSV...");
      setProgress(25);

      const formData = new FormData();

      // Must match upload.single("csv")
      formData.append("file", file);

      const response = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProgress(60);
      setLoadingText("🤖 Processing with Gemini AI...");
      setProgress(80);

      setLoadingText("📊 Preparing Results...");
setProgress(100);

await new Promise(resolve => setTimeout(resolve, 500));

setResult(response.data);

toast.success("CSV imported successfully!");
setLoadingText("✅ Import Completed");
    } catch (error) {
      console.error(error);
    
      if (error.response) {
        toast.error(
          error.response.data.message ||
          "Backend Error while processing CSV."
        );
      } else {
        toast.error("Unable to connect to backend.");
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };
  const handleReset = () => {
    setFile(null);
    setPreview([]);
    setResult(null);
    setLoading(false);
    setLoadingText("");
    setProgress(0);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      {/* Header */}

      <div className="text-center mb-12">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

          GrowEasy AI Importer

        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">

          Upload any CRM CSV and let Gemini AI intelligently detect,
          map and convert your data into GrowEasy CRM format.

        </p>

      </div>

      {/* Upload Box */}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 shadow-lg
        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-blue-400 bg-white hover:shadow-xl"
        }`}
      >

        <input {...getInputProps()} />

        {!file ? (
          <>
            <div className="text-6xl mb-6">
              📁
            </div>

            <h2 className="text-3xl font-bold">
              Drag & Drop CSV
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              or click to browse
            </p>

            <p className="mt-6 text-sm text-gray-400">
              Supports Facebook Leads, Google Ads, CRM Exports,
              Excel Sheets, Marketing CSVs and more.
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl">
              ✅
            </div>

            <h2 className="text-3xl font-bold mt-4">
              {file.name}
            </h2>

            <p className="text-green-600 font-semibold mt-3">
              Ready to Import
            </p>

            <p className="text-gray-500 mt-2">
              {preview.length} records detected
            </p>
          </>
        )}
      </div>

      {/* CSV Preview */}

      {preview.length > 0 && (
        <>
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-5">
              CSV Preview
            </h2>

            <div className="overflow-auto max-h-[500px] rounded-xl border shadow bg-white">

              <table className="min-w-full">

                <thead className="sticky top-0 bg-slate-100">

                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th
                        key={key}
                        className="border p-3 text-left font-semibold"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>

                </thead>

                <tbody>

                  {preview.slice(0, 15).map((row, index) => (

                    <tr
                      key={index}
                      className="hover:bg-slate-50"
                    >

                      {Object.values(row).map((value, i) => (

                        <td
                          key={i}
                          className="border p-3"
                        >
                          {String(value)}
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Confirm Button */}

          <div className="flex justify-end mt-8">

          <button
  onClick={handleConfirmImport}
  disabled={loading}
  className={`px-10 py-4 rounded-xl font-bold text-white shadow-lg transition-all
  ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
  }`}
>
  🚀 Import with Gemini AI
</button>
          </div>
          <Loading
  loading={loading}
  loadingText={loadingText}
  progress={progress}
/>
        </>
      )}

      {/* Result */}

{result && (
  <>
    <div className="flex justify-end mt-8">

      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
      >
        🔄 Upload Another CSV
      </button>

    </div>

    <ResultTable result={result} />
  </>
)}

      {/* Footer */}

      <footer className="mt-20 text-center text-gray-500">

        Built with ❤️ using

        <span className="font-semibold"> Next.js </span>

        •

        <span className="font-semibold"> Express </span>

        •

        <span className="font-semibold"> Gemini AI </span>

      </footer>

    </div>
  );
}