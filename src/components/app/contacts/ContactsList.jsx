import ContactDetails from "./ContactDetails";

function ContactsList({ contacts, fetchContacts }) {
  return (
    <div className="max-w-3xl mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
      <h2 className="text-lg font-semibold mb-5">Contact List</h2>
      <table className="w-full text-left border-collapse">
        <thead className="">
          <tr className="border-b [&>:first-child]:pl-1 [&>:last-child]:pr-1 text-sm">
            <th className="pb-2">Name</th>
            <th className="pb-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.length ? (
            contacts.map((contact) => (
              <ContactDetails
                key={contact?.id}
                contact={contact}
                fetchContacts={fetchContacts}
              />
            ))
          ) : (
            <tr className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl- [&>:last-child]:pr-3 text-sm  has-[.first-link:focus]:custom-outline ring-inset">
              <td
                className="py-10 text-center text-slate-600 font-semibold "
                colSpan="4"
              >
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
