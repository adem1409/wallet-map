import ContactsList from "./ContactsList";
import CreateContact from "./CreateContact";

async function Contacts() {
  return (
    <div className="max-w-lg mx-auto">
      <CreateContact />
      <ContactsList />
    </div>
  );
}

export default Contacts;
