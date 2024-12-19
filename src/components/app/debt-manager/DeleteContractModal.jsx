"use client";

import CustomToast from "@/components/CustomToast";
import Modal from "@/components/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "@/config/axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteContractModal({ show, hide, afterLeave = () => {}, fetchContracts = () => {}, toDelete }) {
  const [sending, setSending] = useState({ delete: false });
  const inputRef = useRef(null);

  async function handleDelete() {
    if (sending?.delete) return;

    setSending((prev) => ({ ...prev, delete: true }));
    try {
      await axios.delete(`/api/contracts/${toDelete?.id}`);
      toast.custom((t) => <CustomToast t={t} message={"Contract deleted successfully"} />);
      fetchContracts();
      hide();
    } catch (err) {
      console.log(err);
      toast.custom((t) => <CustomToast t={t} message={"An error occurred while deleting the appointment"} type="error" />);
    } finally {
      setSending((prev) => ({ ...prev, delete: false }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    handleDelete();
  }

  return (
    <Modal
      show={show}
      hide={hide}
      dialogClassName="w-full md:max-w-[500px] h-fit my-auto py-6 px-4 rounded-lg mx-2"
      afterLeave={() => {
        afterLeave();
      }}
      initialFocusRef={inputRef}
    >
      <div className="flex justify-between bg-gray-50 px-2">
        <h3 className="text-lg font-medium text-gray-900">Delete contract</h3>
        <button type="button" onClick={hide}>
          <XMarkIcon className="size-7 text-slate-600 hover:text-black duration-200" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="mt-2 text-sm text-slate-600">Do you want to delete the contract:</p>
        <p className="text-sm font-medium">* {toDelete?.name}</p>
        <div className="flex items-center gap-2 justify-end mt-4">
          {sending?.delete && (
            <div className="flex">
              <div className="ring-loader"></div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              hide();
            }}
            className="relative inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-slate-950 border border-slate-950 hover:bg-slate-100 shadow-md duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="relative inline-block rounded px-10 pb-2 pt-2.5 text-xs font-medium uppercase text-white bg-slate-950 hover:bg-slate-800 border border-slate-950 shadow-md duration-200"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
