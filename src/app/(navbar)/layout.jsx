import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="mt-[55px]">{children}</div>
    </div>
  );
}
