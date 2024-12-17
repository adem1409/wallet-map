import Contacts from "@/components/app/contacts/Contacts";
import axios from "axios";
import { cookies } from "next/headers";

export default async function page() {
  let contacts = null;

  try {
    const res = await axios.get("/api/contacts", {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    contacts = res.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="pt-2 px-4 pb-20 max-w-4xl">
      <Contacts contacts={contacts} />
    </div>
  );
}
