"use client";
import axios from "@/config/axios";
import Image from "next/image";
import Link from "next/link";

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
    <tr className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl- [&>:last-child]:pr-3 text-sm cursor-pointer has-[.first-link:focus]:custom-outline ring-inset">
      <td className="h-px">
        <Link href={`/app/contacts/${contact.id}`}>
          {contact.name} <br />
        </Link>
      </td>
      <td>
        <button onClick={handleDeleteContact}>&times;</button>
        <br />
      </td>
      <td className="relative">
        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${contact.image || ""}`} alt="Picture of the author" fill />
      </td>
    </tr>
  );
}

export default ContactDetails;
