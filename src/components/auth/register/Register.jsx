import RegisterForm from "@/components/auth/register/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-[400px] mx-1 my-2 rounded-lg bg-white shadow-md overflow-hidden">
        <div className="py-10 px-4 bg-slate-950 text-center">
          <div className="w-fit mx-auto">
            <Image src="/icon.png" width={60} height={60} alt="" sizes="100px" className="bg-contain" quality={100} />
          </div>
          <h3 className="mt-2 font-bold text-white text-lg">Let's Get Started WalletMap</h3>
          <p className="text-slate-400 text-sm">Sign in to continue to WalletMap</p>
        </div>
        <div className="py-10">
          <RegisterForm />
          <p className="mt-4 text-center text-[13px] font-medium">
            Already have an account ?{" "}
            <Link href="/auth/login" className="text-green-700 hover:text-green-800 duration-200">
              Log In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
