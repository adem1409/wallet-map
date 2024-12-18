function page({ params }) {
  const { id } = params;
  return <div>Contacts {id}</div>;
}

export default page;
