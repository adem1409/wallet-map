import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function ContactsList({ contacts, fetchContacts }) {
  return (
    <div className="max-w-3xl mt-4 bg-white border border-slate-200 rounded-lg py-6">
      <h2 className="text-lg font-semibold mb-5 px-3">Contact List</h2>
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className="border-b [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
            <th className="pb-2">Name</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {contacts?.length ? (
            contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm  has-[.first-link:focus]:custom-outline ring-inset"
              >
                <td className="">
                  <Link className="block py-1.5 no-outline" href={`/app/debt-manager/${contact.id}`} passHref>
                    <div className="flex items-center gap-2">
                      <div className="relative shrink-0 size-[25px] rounded-full border border-slate-400 overflow-hidden">
                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}${contact.picture}`} fill className="" sizes="50px" alt="" />
                      </div>
                      <p>{contact.name}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-1.5">
                  <button
                    onClick={() => {
                      setContractToDelete(contact);
                      setShowDeleteModal(true);
                    }}
                    className="ml-auto size-6 flex items-center justify-center rounded hover:bg-slate-200 transition"
                  >
                    <TrashIcon className="size-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-8 text-center text-slate-600 font-semibold " colSpan="6">
                You have no contacts yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsList;
