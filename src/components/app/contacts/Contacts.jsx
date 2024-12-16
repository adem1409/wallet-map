"use client";
import { useState } from "react";
import ContactsList from "./ContactsList";
import CreateContact from "./CreateContact";
import axios from "axios";

function Contacts({ contacts: initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts);

  async function fetchContacts() {
    try {
      const res = await axios.get("/api/contacts");

      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h3 className="text-2xl font-semibold text-slate-700">Contacts</h3>
      <CreateContact fetchContacts={fetchContacts} />
      <ContactsList contacts={contacts} fetchContacts={fetchContacts} />
    </>
  );
}

export default Contacts;
