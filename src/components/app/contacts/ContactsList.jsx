import axiosInstance from "@/config/axios";
import ContactDetails from "./ContactDetails";

async function ContactsList() {
  const { data } = await axiosInstance.get("/api/contacts");

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        {data.map((contact) => (
          <ContactDetails contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default ContactsList;
