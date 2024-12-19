"use client";

import CustomToast from "@/components/CustomToast";
import { RingLoader } from "@/components/Loaders";
import { DateTimePicker } from "@/components/app/debt-manager/[id]/DateTimePicker";
import { useAuthContext } from "@/contexts/AuthProvider";
import { ArrowsRightLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/axios";
import Image from "next/image";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{0,2})?$/, "Amount must be a valid number with up to 2 decimal places.")
    .transform((val) => parseFloat(val)),
  label: z.string().min(1, "Label is required"),
  date: z.date(),
  sideAIsLender: z.boolean(),
});

export default function AddTransaction({ transactions, contract, userSide, otherUserSide }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      sideAIsLender: true,
      amount: "",
      label: "Transaction #1000",
      date: new Date(),
    },
    resolver: zodResolver(schema),
  });
  const { user } = useAuthContext();

  const otherUser = useMemo(() => contract[otherUserSide], [otherUserSide]);

  const formValues = watch();
  const { sideAIsLender, date } = formValues;

  const onInput = (e) => {
    // Only allow digits and a single optional decimal point with up to 2 decimal places
    e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-dot characters
    const match = e.target.value.match(/^\d+(\.\d{0,2})?/); // Match valid pattern
    e.target.value = match ? match[0] : ""; // Update value to valid portion
  };

  async function onSubmit(_data) {
    const data = { ..._data };

    if (!sideAIsLender) {
      data.amount = -data.amount;
    }

    data.contract = contract.id;

    try {
      await axios.post("/api/transactions", data);
      toast.custom((t) => <CustomToast t={t} message={"Transaction added successfully"} />);
      reset();
      // fetchContracts();
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while submitting the form");
    }
    // fetchAppointments();
  }

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-lg py-2 px-3">
      <h2 className="text-lg font-semibold">New Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-fit">
        <label className="block w-fit mt-2 p-2 rounded-lg hover:bg-slate-200/75 has-[:focus-visible]:bg-slate-200/75 duration-200 cursor-pointer group">
          <input type="checkbox" className="sr-only" {...register("sideAIsLender")} />
          <div className="w-fit py-0.5 px-1.5 mb-[-10px] mx-auto rounded-lg bg-slate-200/85 group-hover:bg-slate-300 group-hover:scale-110 group-has-[:focus-visible]:bg-slate-300 group-has-[:focus-visible]:scale-110 duration-200">
            <ArrowsRightLeftIcon className="size-[18px] text-slate-700 group-hover:text-black group-has-[:focus-visible]:text-black duration-200" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-[52px] aspect-square rounded-full border-2 border-slate-400 overflow-hidden">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${user?.picture || ""}`} fill className="" sizes="100px" alt="" />
              </div>
              <p className="font-medium text-sm text-slate-700">You</p>
            </div>
            <div>
              <div className={`flex items-center ${sideAIsLender ? "" : "[transform:rotateY(180deg)]"} duration-500`}>
                <div className={`w-[150px] h-[2.5px] ml-2 rounded ${sideAIsLender ? "bg-green-700" : "bg-red-500"}`}></div>
                <ChevronRightIcon className={`size-7 ml-[-17px] ${sideAIsLender ? "text-green-700" : "text-red-500"}`} />
              </div>
              {/* <p className="-mt-1 font-medium text-[15px] text-green-700 text-center">Lend</p> */}

              {/*  ---------------------------- FLIP CARD ---------------------------- */}
              {/*  ---------------------------- FLIP CARD ---------------------------- */}
              <div className={`[perspective:1000px] w-40 h-6 mx-auto ${sideAIsLender ? "text-green-700" : "text-red-500"}`}>
                <div className={`h-full w-full preserve-3d ${sideAIsLender ? "" : "rotate-y-180"} relative duration-500 font-medium`}>
                  <div className="backface-hidden absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
                    <h2>Lend</h2>
                  </div>
                  <div className="backface-hidden rotate-y-180 absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
                    <h2>Borrowed From</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-[52px] aspect-square rounded-full border-2 border-slate-400 overflow-hidden">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${otherUser?.picture || ""}`} fill className="" sizes="100px" alt="" />
              </div>
              <p className="font-medium text-sm text-slate-700">{otherUser?.username}</p>
            </div>
          </div>
        </label>
        <div className="">
          <label className="font-medium text-sm text-gray" htmlFor="amount">
            Amount
          </label>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden focus-within:custom-outline !ring-slate-400">
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="1,234.56"
              className="block w-full px-2 py-1 text-sm duration-200 no-outline"
              {...register("amount")}
              onInput={onInput}
            />
            <div className="flex items-center border-l bg-slate-200 px-1">
              <p className="text-sm font-medium text-gray">{contract.currency}</p>
            </div>
          </div>
          {errors.amount?.message && <p className="text-red-500 text-sm">{errors.amount?.message}</p>}
        </div>
        <div className="mt-2">
          <label className="font-medium text-sm text-gray" htmlFor="label">
            Label
          </label>
          <input
            id="label"
            placeholder="Taxi fare (London Trip)"
            className="block w-full px-2 py-1 rounded-lg border border-slate-200 !ring-slate-400 text-sm duration-200"
            {...register("label")}
          />
          {errors.label?.message && <p className="text-red-500 text-sm">{errors.label?.message}</p>}
        </div>
        <div className="mt-2">
          <label className="font-medium text-sm text-gray" htmlFor="label">
            Date
          </label>
          {/* <input
            id="date"
            type="date"
            placeholder="Taxi fare (London Trip)"
            className="block w-full px-2 py-1 rounded-lg border border-slate-200 !ring-slate-400 text-sm duration-200"
            {...register("date")}
          /> */}
          <div>
            <DateTimePicker
              date={date}
              setDate={(value) => {
                setValue("date", value);
              }}
            />
          </div>
          {errors.date?.message && <p className="text-red-500 text-sm">{errors.date?.message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="relative flex justify-center items-center gap-2 w-full h-[30px] mt-2 px-4 py-1 rounded-lg bg-green hover:bg-green-dark text-white text-sm shadow-md disabled:opacity-75 disabled:cursor-not-allowed duration-200"
        >
          {isSubmitting ? (
            <RingLoader className=" !size-4 !border-[2px]" />
          ) : (
            <>
              <span>Add</span>
              <PlusIcon className="size-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
