import React from "react";

export default function ContractsList({ contracts }) {
  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-3">
        <h2 className="text-lg font-semibold">Contracts</h2>
        <a href="#" className="text-blue-500 hover:underline">
          View All
        </a>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className="border-b [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
            <th className="pb-2">Contact</th>
            <th className="pb-2">Currency</th>
            <th className="pb-2">Last Updated</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((doc, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
              <td className="py-3 flex items-center gap-2">
                <div className="text-blue-500">📄 {/* Replace with a real icon in a production app */}</div>
                {doc.name}
              </td>
              <td className="py-3 text-gray-600">
                {doc.date} <br />
                <span className="text-sm">{doc.time}</span>
              </td>
              <td></td>
              <td className="py-3 flex gap-4 justify-end">
                <button className="text-gray-500 hover:text-blue-500 transition">👁️ {/* View Icon */}</button>
                <button className="text-gray-500 hover:text-red-500 transition">🗑️ {/* Delete Icon */}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
