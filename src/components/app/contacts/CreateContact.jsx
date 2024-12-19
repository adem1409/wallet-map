"use client";
import axios from "@/config/axios";
import { useForm } from "react-hook-form";
import { RingLoader } from "@/components/Loaders";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

function CreateContact({ fetchContacts }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await axios.post(`/api/contacts`, data);
      reset();
      fetchContacts();
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message;
      setError("apiError", { type: "manual", message: msg });
    }
  }
  return (
    <div className="max-w-3xl mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
      <h2 className="text-lg font-semibold">Add Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="text-sm mt-4">
        <div className="">
          <label className="font-medium text-gray" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200 disabled:bg-slate-100 disabled:text-slate-600"
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="relative flex justify-center items-center gap-3 w-full h-9 mt-6 px-4 py-2 rounded-lg bg-green hover:bg-green-dark text-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed duration-200"
        >
          {isSubmitting ? (
            <RingLoader className=" !size-4 !border-[2px]" />
          ) : (
            <>
              <span>Add Contact</span>
              <PencilSquareIcon className="size-3.5" />
            </>
          )}
        </button>
        {errors.apiError?.message && <p className="mt-1 text-red-500 text-center">{errors.apiError?.message}</p>}
      </form>
    </div>
  );
}

export default CreateContact;
