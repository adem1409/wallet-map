"use client";

import AddContractModal from "@/components/app/debt-manager/AddContractModal";
import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

export default function ContractsList({ contracts }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AddContractModal
        hide={() => {
          setShowModal(false);
        }}
        show={showModal}
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-3">
          <h2 className="text-lg font-semibold">Contracts</h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className={`flex items-center gap-1 py-1 pl-6 pr-8 rounded bg-green-800 hover:bg-green-900 text-white text-[15px] duration-200`}
            href="/auth/login"
          >
            <PlusIcon className="size-5" />
            <span>Create New</span>
          </button>
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
            {contracts?.length ? (
              contracts.map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
                  <td className="py-3 flex items-center gap-2">
                    <div className="text-blue-500">📄 {/* Replace with a real icon in a production app */}</div>
                    {doc.name}
                  </td>
                  <td className="py-3 text-gray-600">
                    {doc.currency} <br />
                  </td>
                  <td>
                    {new Date(doc.creationDate).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      // hour: "2-digit",
                      // minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 flex gap-4 justify-end">
                    <button className="text-gray-500 hover:text-blue-500 transition">👁️ {/* View Icon */}</button>
                    <button className="text-gray-500 hover:text-red-500 transition">🗑️ {/* Delete Icon */}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-10 text-center text-slate-600 font-semibold " colSpan="4">
                  You have no contracts yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
