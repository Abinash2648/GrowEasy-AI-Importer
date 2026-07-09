"use client";

import { useState, useMemo } from "react";
import * as XLSX from "xlsx";

import {
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  TrendingUp,
  Search,
  Download,
} from "lucide-react";

export default function ResultTable({ result }) {
  if (!result || !result.data) return null;

  const stats = result.statistics;
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [sortBy, setSortBy] = useState("name");
const [ascending, setAscending] = useState(true);

const filteredData = useMemo(() => {
  if (!result?.data) return [];

  const keyword = search.trim().toLowerCase();

  const filtered = result.data.filter((lead) => {
    return (
      (lead.name || "").toLowerCase().includes(keyword) ||
      (lead.email || "").toLowerCase().includes(keyword) ||
      (lead.company || "").toLowerCase().includes(keyword) ||
      (lead.city || "").toLowerCase().includes(keyword) ||
      (lead.crm_status || "").toLowerCase().includes(keyword)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const first = (a[sortBy] || "").toString().toLowerCase();
    const second = (b[sortBy] || "").toString().toLowerCase();

    return ascending
      ? first.localeCompare(second)
      : second.localeCompare(first);
  });

  return sorted;

}, [search, result.data, sortBy, ascending]);
  const [currentPage, setCurrentPage] = useState(1);

const rowsPerPage = 10;

const totalPages = Math.ceil(filteredData.length / rowsPerPage);

const currentRows = filteredData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
const downloadJSON = () => {
  const blob = new Blob(
    [JSON.stringify(filteredData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "crm-records.json";

  a.click();

  URL.revokeObjectURL(url);
};
const downloadCSV = () => {
  if (!filteredData.length) return;

  const headers = Object.keys(filteredData[0]);

  const csv = [
    headers.join(","),
    ...filteredData.map((row) =>
      headers
        .map((field) => `"${row[field] ?? ""}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "crm-records.csv";

  a.click();

  URL.revokeObjectURL(url);
};
const downloadExcel = () => {
  if (!filteredData.length) return;

  const worksheet = XLSX.utils.json_to_sheet(filteredData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "CRM Records"
  );

  XLSX.writeFile(workbook, "crm-records.xlsx");
};

  const getStatusBadge = (status) => {
    switch (status) {
      case "SALE_DONE":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
            💰 Sale Done
          </span>
        );

      case "BAD_LEAD":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
            🔴 Bad Lead
          </span>
        );

      case "DID_NOT_CONNECT":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
            🟡 Didn't Connect
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            🟢 Follow Up
          </span>
        );
    }
  };

  return (
    <div className="mt-10">
  
      {/* Summary */}
  
      <h2 className="text-4xl font-bold mb-8">
        Import Summary
      </h2>
  
      <div className="grid md:grid-cols-5 gap-6 mb-10">
  
        {/* Imported */}
  
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Imported</p>
              <h1 className="text-4xl font-bold">{stats.imported}</h1>
            </div>
            <CheckCircle2 size={45} />
          </div>
        </div>
  
        {/* Skipped */}
  
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Skipped</p>
              <h1 className="text-4xl font-bold">{stats.skipped}</h1>
            </div>
            <XCircle size={45} />
          </div>
        </div>
  
        {/* Total */}
  
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Records</p>
              <h1 className="text-4xl font-bold">{stats.totalRows}</h1>
            </div>
            <FileSpreadsheet size={45} />
          </div>
        </div>
  
        {/* Success */}
  
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Success Rate</p>
              <h1 className="text-4xl font-bold">{stats.successRate}</h1>
            </div>
            <TrendingUp size={45} />
          </div>
        </div>
  
        {/* Duplicates */}
  
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Duplicates</p>
              <h1 className="text-4xl font-bold">
                {result.duplicates?.length || 0}
              </h1>
            </div>
            <FileSpreadsheet size={45} />
          </div>
        </div>
  
      </div>
  
      {/* Search */}
  
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
  
        <div className="relative w-full md:w-96">
  
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
  
          <input
            type="text"
            placeholder="Search by Name, Email, Company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          />
  
        </div>
  
        <div className="flex gap-3 items-center">
        <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border rounded-lg px-4 py-2"
>
  <option value="name">Name</option>
  <option value="company">Company</option>
  <option value="city">City</option>
  <option value="crm_status">Status</option>
</select>
<button
  onClick={() => setAscending(!ascending)}
  className="px-4 py-2 border rounded-lg"
>
  {ascending ? "⬆" : "⬇"}
</button>
  
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            <Download size={18} />
            CSV
          </button>
  
          <button
            onClick={downloadJSON}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Download size={18} />
            JSON
          </button>
          <button
  onClick={downloadExcel}
  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl"
>
  <Download size={18} />
  Excel
</button>
  
        </div>
  
      </div>
  
      <h2 className="text-4xl font-bold mb-6">
        Parsed CRM Records
      </h2>
  
      {/* Your existing table remains exactly as it is */}
  
      <div className="overflow-x-auto rounded-xl shadow border bg-white">

  <table className="min-w-full">

    <thead className="bg-slate-100">

      <tr>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Phone</th>
        <th className="p-4 text-left">Company</th>
        <th className="p-4 text-left">City</th>
        <th className="p-4 text-left">Status</th>
      </tr>

    </thead>

    <tbody>

      {filteredData.length > 0 ? (

currentRows.map((lead, index) => (
  <tr
    key={index}
    onClick={() => setSelectedLead(lead)}
    className="border-t hover:bg-slate-50 transition cursor-pointer"
  >

            <td className="p-4">
              {lead.name || "-"}
            </td>

            <td className="p-4">
              {lead.email || "-"}
            </td>

            <td className="p-4">
              {lead.country_code
                ? `+${lead.country_code} ${lead.mobile_without_country_code || ""}`
                : lead.mobile_without_country_code || "-"}
            </td>

            <td className="p-4">
              {lead.company || "-"}
            </td>

            <td className="p-4">
              {lead.city || "-"}
            </td>

            <td className="p-4">
              {getStatusBadge(lead.crm_status)}
            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan="6"
            className="text-center py-10 text-gray-500"
          >
            No matching records found.
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>
{/* Pagination */}

<div className="mt-6 flex items-center justify-center gap-2">

  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 border rounded-lg disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-4 py-2 border rounded-lg ${
        currentPage === i + 1
          ? "bg-blue-600 text-white"
          : "bg-white"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
    className="px-4 py-2 border rounded-lg disabled:opacity-50"
  >
    Next
  </button>
  </div>
  
      {/* Duplicate Table */}
  
      {result.duplicates?.length > 0 && (
  
        <div className="mt-12">
  
          <h2 className="text-3xl font-bold mb-4">
            Duplicate Records
          </h2>
  
          <div className="overflow-x-auto rounded-xl shadow border bg-white">
  
            <table className="min-w-full">
  
              <thead className="bg-orange-100">
  
                <tr>
  
                  <th className="p-4 text-left">Row</th>
  
                  <th className="p-4 text-left">Reason</th>
  
                  <th className="p-4 text-left">Email</th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {result.duplicates.map((d, index) => (
  
                  <tr key={index} className="border-t">
  
                    <td className="p-4">{d.row}</td>
  
                    <td className="p-4 text-red-600 font-semibold">
                      {d.reason}
                    </td>
  
                    <td className="p-4">
                      {d.record?.email || "-"}
                    </td>
  
                  </tr>
  
                ))}
  
              </tbody>
  
            </table>
  
          </div>
          </div>
          )}
          {/* Lead Details Modal */}

{selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-[95%] p-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Lead Details
        </h2>

        <button
          onClick={() => setSelectedLead(null)}
          className="text-red-600 text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div><b>Name:</b> {selectedLead.name || "-"}</div>
        <div><b>Email:</b> {selectedLead.email || "-"}</div>

        <div>
          <b>Phone:</b>{" "}
          {selectedLead.country_code
            ? `+${selectedLead.country_code} ${selectedLead.mobile_without_country_code}`
            : "-"}
        </div>

        <div><b>Company:</b> {selectedLead.company || "-"}</div>

        <div><b>City:</b> {selectedLead.city || "-"}</div>

        <div><b>State:</b> {selectedLead.state || "-"}</div>

        <div><b>Country:</b> {selectedLead.country || "-"}</div>

        <div><b>Status:</b> {selectedLead.crm_status || "-"}</div>

        <div><b>Lead Owner:</b> {selectedLead.lead_owner || "-"}</div>

        <div><b>Data Source:</b> {selectedLead.data_source || "-"}</div>

        <div><b>Created At:</b> {selectedLead.created_at || "-"}</div>

        <div><b>Session Time:</b> {selectedLead.possession_time || "-"}</div>

      </div>

      <div className="mt-6">
        <b>CRM Note</b>
        <p className="mt-2 p-3 bg-gray-100 rounded-lg">
          {selectedLead.crm_note || "-"}
        </p>
      </div>

      <div className="mt-6">
        <b>Description</b>
        <p className="mt-2 p-3 bg-gray-100 rounded-lg">
          {selectedLead.description || "-"}
        </p>
      </div>

    </div>
  </div>
)}
          </div>
  );
                }