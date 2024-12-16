"use client";
import axios from "axios";

function ContactDetails({ contact, fetchContacts }) {
  async function handleDeleteContact() {
    try {
      await axios.delete(`/api/contacts/${contact.id}`);
      fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  }

  return (
    <tr className="border-b hover:bg-gray-50 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
      <td className="py-3 text-gray-600">
        {contact.name} <br />
      </td>
      <td>
        <button onClick={handleDeleteContact}>&times;</button>
        <br />
      </td>
    </tr>
  );
}

export default ContactDetails;
