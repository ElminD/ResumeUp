import SignupForm from "./SignupForm"

const page = () => {
    return (
        <div className="flex flex-col justify-center px-96">
            <h1 className="flex justify-center text-5xl font-bold text-resumeup">Join!</h1>
            <SignupForm />
        </div>
    )
}

export default page