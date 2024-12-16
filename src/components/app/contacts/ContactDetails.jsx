"use client";
import axios from "axios";

function ContactDetails({ contact }) {
  async function handleDeleteContact(id) {
    await axios.delete(`/api/contacts/${id}`);
  }
  return (
    <div key={contact.id} className="flex gap-2 p-2 border justify-between">
      <h3>{contact.name}</h3>
      <button onClick={() => handleDeleteContact(contact.id)}>&times;</button>
    </div>
  );
}

export default ContactDetails;
