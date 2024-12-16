import axios from "axios";
import ContactDetails from "./ContactDetails";

function ContactsList({ contacts }) {
  return (
    <div>
      <h2>Contact List</h2>
      <div>
        {contacts.map((contact) => (
          <ContactDetails key={contact?.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default ContactsList;
