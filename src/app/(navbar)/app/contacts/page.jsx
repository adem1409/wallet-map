import Contacts from "@/components/app/contacts/Contacts";
import axios from "axios";

export default async function page() {
  const { data: contacts } = await axios.get("/api/contacts");

  return (
    <div className="pt-2 px-4 pb-20 max-w-4xl">
      <Contacts contacts={contacts} />
    </div>
  );
}
