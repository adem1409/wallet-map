"use client";

import ContactSelect from "@/components/app/debt-manager/ContactSelect";
import CurrencySelect from "@/components/app/debt-manager/CurrencySelect";
import CustomToast from "@/components/CustomToast";
import Modal from "@/components/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function AddContractModal({ show, hide, afterLeave = () => {} }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const inputRef = useRef(null);

  async function onSubmit(data) {
    try {
      await axios.post("/api/appointments/create", data);
      toast.custom((t) => <CustomToast t={t} message={"Appointment added successfully"} />);
      hide();
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while submitting the form");
    }
    // fetchAppointments();
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
      <div className="flex justify-between bg-gray-50 pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Add Contact</h3>
        <button type="button" onClick={hide}>
          <XMarkIcon className="size-7 text-slate-600 hover:text-black duration-200" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="font-medium text-sm text-gray" htmlFor="email">
            Contact Name
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="John Doe"
            className="block w-full px-2 py-1 rounded-lg border border-slate-200 !ring-slate-400 text-sm duration-200"
          />
          {errors.email?.message && <p className="mt-1 text-red-500">{errors.email?.message}</p>}
        </div>
        <div className="">
          <label className="font-medium text-sm text-gray" htmlFor="email">
            Currency
          </label>
          <CurrencySelect inputRef={inputRef} onChange={() => {}} />
          {errors.email?.message && <p className="mt-1 text-red-500">{errors.email?.message}</p>}
        </div>
        {/* <div className="">
          <label htmlFor="patient" className="block text-sm font-medium">
            Contact <span className="text-red-500">*</span>
          </label>
          <ContactSelect
            inputRef={inputRef}
            value={{}}
            onChange={(option) => {
              setInput((prev) => ({ ...prev, patient: option.value }));
              // setErrors((prevErrors) => ({ ...prevErrors, patient: null }));
            }}
          />
          {errors.patient && <p className="text-red-500 text-sm">{errors.patient}</p>}
        </div> */}
        <div className="flex items-center gap-2 justify-end mt-4">
          {isSubmitting && (
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
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
