import ResumeForm from "./ResumeForm"

const page = () => {
  return <div className="flex flex-col justify-center px-96">
    <h1 className="flex justify-center text-4xl font-bold mt-8 text-resumeup">Resume Builder</h1>
    <ResumeForm />
  </div>
}

export default page;
