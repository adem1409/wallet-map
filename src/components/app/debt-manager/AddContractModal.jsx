"use client";

import ContactSelect from "@/components/app/debt-manager/ContactSelect";
import CurrencySelect from "@/components/app/debt-manager/CurrencySelect";
import UserSelect from "@/components/app/debt-manager/UserSelect";
import CustomToast from "@/components/CustomToast";
import Modal from "@/components/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z
  .object({
    contractName: z.string().min(1, "Contract name is required"),
    currency: z.string().min(1, "Currency is required"),
    isShared: z.enum(["true", "false"], "IsShared is required").transform((val) => val === "true"),
    user: z.number().optional(),
    contact: z.number().optional(),
    contactName: z.string().optional(),
  })
  .refine(
    (data) => (data.isShared ? data.user > 0 : data.contact > 0 || data.contactName),
    (data) => ({
      message: data.isShared ? "User is required" : "Contact is required",
      path: data.isShared ? ["user"] : ["contact"], // Highlights the correct field
    })
  );

export default function AddContractModal({ show, hide, afterLeave = () => {}, fetchContracts = () => {} }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      contractName: "",
      isShared: "false",
      currency: "TND",
      user: 0,
      contact: 0,
      newContact: "false",
      contactName: "",
    },
    resolver: zodResolver(schema),
  });

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const formValues = watch();
  const { isShared, currency, newContact, contact, contactName } = formValues;

  useEffect(() => {
    console.log("-------------------- selectedUser --------------------");
    console.log(selectedUser, contactName, selectedContact, currency);
    if (selectedContact) {
      setValue("contractName", selectedContact.label + " - " + currency + " - " + new Date().toLocaleDateString("en-UK", { month: "2-digit", day: "2-digit" }));
    } else if (selectedUser) {
      setValue("contractName", selectedUser.username + " - " + currency + " - " + new Date().toLocaleDateString("en-UK", { month: "2-digit", day: "2-digit" }));
    } else if (contactName) {
      setValue("contractName", contactName + " - " + currency + " - " + new Date().toLocaleDateString("en-UK", { month: "2-digit", day: "2-digit" }));
    }
  }, [selectedContact, contactName, selectedUser, currency]);

  useEffect(() => {
    if (newContact === "true") {
      setValue("contact", 0);
      setSelectedContact(null);
    } else {
      setValue("contactName", "");
    }
  }, [newContact]);

  const inputRef = useRef(null);

  async function onSubmit(data) {
    console.log("-------------------- data --------------------");
    console.log(data);

    try {
      await axios.post("/api/contracts", data);
      toast.custom((t) => <CustomToast t={t} message={"Contract added successfully"} />);
      fetchContracts();
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
      <div className="flex justify-between pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Add Contract</h3>
        <button type="button" onClick={hide}>
          <XMarkIcon className="size-7 text-slate-600 hover:text-black duration-200" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="font-medium text-sm text-gray" htmlFor="currency">
            Type
          </label>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="is-shared-false"
              className={`flex flex-1 gap-2 items-center px-2 py-1 rounded-full border !ring-slate-400 text-[13px] font-medium cursor-pointer has-[:focus-visible]:ring-1 ${
                isShared === "false" ? "border-green-600" : "border-slate-300 text-slate-400"
              }`}
            >
              <input type="radio" id="is-shared-false" value="false" className="sr-only" {...register("isShared")} />
              <div className={`w-4 h-4 rounded-full ${isShared === "false" ? "bg-green-600" : "bg-slate-300"}`}></div>
              <span className="mx-auto">Local</span>
            </label>
            <label
              htmlFor="is-shared-true"
              className={`flex flex-1 gap-2 items-center px-2 py-1 rounded-full border !ring-slate-400 text-[13px] font-medium cursor-pointer has-[:focus-visible]:ring-1 ${
                isShared === "true" ? "border-orange-600" : "border-slate-300 text-slate-400"
              }`}
            >
              <input type="radio" id="is-shared-true" value="true" className="sr-only" {...register("isShared")} />
              <div className={`w-4 h-4 rounded-full ${isShared === "true" ? "bg-orange-600" : "bg-slate-300"}`}></div>
              <span className="mx-auto">Shared</span>
            </label>
          </div>
          {errors.isShared?.message && <p className="text-red-500 text-sm">{errors.isShared?.message}</p>}
        </div>
        {isShared === "true" ? (
          <div className="mt-2">
            <label className="font-medium text-sm text-gray" htmlFor="currency">
              User (search by ID or Email)
            </label>
            <UserSelect
              onChange={(option) => {
                setValue("user", option.value);
                setSelectedUser(option);
              }}
            />
            {errors.user?.message && <p className="text-red-500 text-sm">{errors.user?.message}</p>}
          </div>
        ) : (
          <div className="mt-2">
            <label className="font-medium text-sm text-gray" htmlFor="currency">
              Contact
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <input className="!ring-slate-600" type="radio" id="new-contact-false" value="false" {...register("newContact")} />
                <label htmlFor="new-contact-false" className="text-sm text-gray">
                  Existing
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <input className="!ring-slate-600" type="radio" id="new-contact-true" value="true" {...register("newContact")} />
                <label htmlFor="new-contact-true" className="text-sm text-gray">
                  New
                </label>
              </div>
            </div>
            {newContact === "true" ? (
              <div className="mt-2">
                <input
                  id="contactName"
                  placeholder="John Doe"
                  className="block w-full px-2 py-1 rounded-lg border border-slate-200 !ring-slate-400 text-sm duration-200"
                  {...register("contactName")}
                />
                {errors.contactName?.message && <p className="text-red-500 text-sm">{errors.contactName?.message}</p>}
              </div>
            ) : (
              <div className="mt-2">
                <ContactSelect
                  onChange={(option) => {
                    setValue("contact", option.value);
                    setSelectedContact(option);
                  }}
                  inputRef={inputRef}
                />
              </div>
            )}
            {errors.contact?.message && <p className="text-red-500 text-sm">{errors.contact?.message}</p>}
          </div>
        )}
        <div className="mt-2">
          <label className="font-medium text-sm text-gray" htmlFor="currency">
            Currency
          </label>
          <CurrencySelect
            onChange={(option) => {
              setValue("currency", option.value);
            }}
            value={currency}
          />
          {errors.currency?.message && <p className="text-red-500 text-sm">{errors.currency?.message}</p>}
        </div>

        <div className="mt-2">
          <label className="font-medium text-sm text-gray" htmlFor="contract-name">
            Contract Name
          </label>
          <input
            id="contractName"
            placeholder="John Doe - USD"
            className="block w-full px-2 py-1 rounded-lg border border-slate-200 !ring-slate-400 text-sm duration-200"
            {...register("contractName")}
          />
          {errors.contractName?.message && <p className="text-red-500 text-sm">{errors.contractName?.message}</p>}
        </div>
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
