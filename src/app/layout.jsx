import { Providers } from "@/contexts/Providers";
import axios from "@/config/axios";
import { Poppins, Rubik } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";

export const metadata = {
  title: "WalletMap",
  description: "Money Tracking Application",
};

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const rubik = Rubik({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export default async function RootLayout({ children }) {
  let user = null;
  try {
    const cookieStore = cookies();
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    user = res.data;
  } catch (err) {
    console.log("-------------------- err.response.data --------------------");
    console.log(err?.response?.data || err);
  }

  return (
    <html lang="en">
      <body className={`bg-slate-100 font-rubik focus:[&_*:is(input,button,a,textarea)]:custom-outline ${poppins.variable} ${rubik.variable}`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
