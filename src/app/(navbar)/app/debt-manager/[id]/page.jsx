import Contract from "@/components/app/debt-manager/[id]/Contract";
import axios from "axios";
import { cookies } from "next/headers";

export default async function page({ params }) {
  const { id } = params;

  try {
    const cookieStore = cookies();
    const { data } = await axios.get(`/api/contracts/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  } catch (error) {
    console.log("Error fetching contract data:", error.message);
  }

  return (
    <div className="pt-2 pl-4 pb-20">
      <Contract />
    </div>
  );
}
