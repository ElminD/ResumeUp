import ContactForm from "./ContactForm";

const page = () => {
  return <div className="flex flex-col justify-center px-96">
    <h1 className="flex justify-center text-4xl font-bold text-resumeup">Contact Us!</h1>
    <ContactForm />
  </div>;
};

export default page
