import axios from "axios";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/contexts/Providers";
import { cookies } from "next/headers";

export const metadata = {
  title: "WalletMap",
  description: "Money Tracking Application",
};

const poppins = Poppins({ subsets: ["latin-ext"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

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
      <body className={`bg-slate-100 ${poppins.className}`}>
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
