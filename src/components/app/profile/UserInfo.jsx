"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { RingLoader } from "@/components/Loaders";
import { useAuthContext } from "@/contexts/AuthProvider";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

const schema = z
  .object({
    username: z.string().min(1, "Username is required").min(6, "Username must be at least 6 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New Password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm New Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

function UserInfo() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { user } = useAuthContext();

  async function onSubmit(data) {
    console.log(data);

    try {
      const res = await axios.post(`/api/users/edit`, data);
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message;
      setError("apiError", { type: "manual", message: msg });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 text-sm mt-4">
      <div className="">
        <label className="font-medium text-gray" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          value={user.email}
          disabled
          className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200 disabled:bg-slate-100 disabled:text-slate-600"
        />
        {errors.email?.message && <p className="mt-1 text-red-500">{errors.email?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="username">
          Username
        </label>
        <input
          {...register("username")}
          id="username"
          defaultValue={user.username}
          className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200 disabled:opacity-50"
        />
        {errors.username?.message && <p className="mt-1 text-red-500">{errors.username?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            id="password"
            placeholder="Enter Old Password"
            type={showPassword ? "text" : "password"}
            className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
          </button>
        </div>
        {errors.password?.message && <p className="mt-1 text-red-500">{errors.password?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="newPassword">
          New Password
        </label>
        <div className="relative">
          <input
            {...register("newPassword")}
            id="newPassword"
            placeholder="Enter New Password"
            type={showNewPassword ? "text" : "password"}
            className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
          />
          <button
            type="button"
            onClick={() => {
              setShowNewPassword((prev) => !prev);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showNewPassword ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
          </button>
        </div>
        {errors.newPassword?.message && <p className="mt-1 text-red-500">{errors.newPassword?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="confirmNewPassword">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            {...register("confirmNewPassword")}
            id="confirmNewPassword"
            placeholder="Retype New Password"
            type={showNewPassword ? "text" : "password"}
            className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
          />
        </div>
        {errors.confirmNewPassword?.message && <p className="mt-1 text-red-500">{errors.confirmNewPassword?.message}</p>}
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
            <span>Edit</span>
            <PencilSquareIcon className="size-3.5" />
          </>
        )}
      </button>
      {errors.apiError?.message && <p className="mt-1 text-red-500 text-center">{errors.apiError?.message}</p>}
    </form>
  );
}

export default UserInfo;
