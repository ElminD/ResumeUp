import LoginForm from "./LoginForm"

const page = () => {
    return (
        <div className="flex flex-col justify-center px-96">
            <h1 className="flex justify-center text-6xl font-bold text-resumeup">Welcome!</h1>
            <LoginForm />
        </div>
    )
}

export default page