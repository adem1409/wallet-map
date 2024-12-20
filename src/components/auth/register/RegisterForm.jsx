"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "@/config/axios";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { RingLoader } from "@/components/Loaders";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";

const schema = z
  .object({
    username: z.string().min(1, "Username is required").min(6, "Username must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const { fetchUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data) {
    try {
      const res = await axios.post("/api/users", data);

      fetchUser();
      router.push("/app/debt-manager");
    } catch (err) {
      const msg = err?.response?.data?.message;
      console.log(err);
      if (msg === "EmailAlreadyExists") {
        setError("apiError", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        setError("apiError", { type: "manual", message: msg });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 text-sm">
      <div className="">
        <label className="font-medium text-gray" htmlFor="username">
          Username
        </label>
        <input
          {...register("username")}
          id="username"
          placeholder="Enter Username"
          className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
        />
        {errors.username?.message && <p className="mt-1 text-red-500">{errors.username?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          placeholder="Enter Email"
          className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
        />
        {errors.email?.message && <p className="mt-1 text-red-500">{errors.email?.message}</p>}
      </div>
      <div className="mt-2">
        <label className="font-medium text-gray" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            id="password"
            placeholder="Enter Password"
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
        <label className="font-medium text-gray" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          placeholder="Enter Password"
          type={showPassword ? "text" : "password"}
          className="block w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 ring-slate-400 duration-200"
        />
        {errors.confirmPassword?.message && <p className="mt-1 text-red-500">{errors.confirmPassword?.message}</p>}
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
            <span>Register</span>
            <LoginIcon className="size-3.5" />
          </>
        )}
      </button>
      {errors.apiError?.message && <p className="mt-1 text-red-500">{errors.apiError?.message}</p>}
    </form>
  );
}

const LoginIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" {...props}>
    <path d="m217.9 105.9 122.8 122.8c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9-18.7 0-33.9-15.2-33.9-33.9V320H32c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9 9 0 17.6 3.6 24 9.9M352 416h64c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32h-64c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c53 0 96 43 96 96v256c0 53-43 96-96 96h-64c-17.7 0-32-14.3-32-32s14.3-32 32-32"></path>
  </svg>
);
