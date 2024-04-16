"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
    const router = useRouter();
    const [signedUp, setSignedUp] = useState({failed: false, display: ""})

    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
          fname: String(event.target.fname.value),
          lname: String(event.target.lname.value),
          email: String(event.target.email.value),
          phonenum: String(event.target.phone.value),
          password: String(event.target.password.value)
        }
    
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if(responseData.status != 200) {
            setSignedUp({failed: true, display: responseData.message})
        }
        else {
            router.push("/Log_In")
        }
    }

    return (
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label className="mb-1">First Name</label>
                    <input 
                        type="text" 
                        id="fname" 
                        required autoComplete="off" 
                        placeholder="Bob" 
                        className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Last Name</label>
                    <input 
                        type="text" 
                        id="lname" 
                        required autoComplete="off" 
                        placeholder="Smith" 
                        className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
                </div>
            </div>
            <label className="mb-1">Email</label>
            <input 
                type="email" 
                id="email" 
                required autoComplete="off" 
                placeholder="bobsmith@email.com" 
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
            <label className="mb-1">Phone Number</label>
            <input 
                type="text" 
                id="phone" 
                autoComplete="off" 
                placeholder="111-111-1111"
                className="form-boxes mb-2"/>
            <label className="mb-1">Password</label>
            <input 
                type="password"
                id="password" 
                required autoComplete="off" 
                placeholder="Password"
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-6"/>
            <div className="flex justify-center mb-2">
                <Button className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg">Sign Up</Button>
            </div>
            <div className="flex justify-center">
                {signedUp.failed ? <p className="text-red-400 text-center font-semibold mb-2">{signedUp.display}</p> : null}
            </div>
            <div className="flex justify-center">
                <p className="w-1/2 text-xs text-center">By creating an account, you agree to our <Link href="/Terms_Of_Service" className="underline">Terms of Service</Link>. 
                We do not sell your personal data. To learn more about how we collect, use, share and protect it 
                please read our <Link href="/Privacy_Policy" className="underline">Privacy Policy</Link>.</p></div>
            <Link href="/Log_In" className="flex justify-center mt-6 underline">Already have an account? Log in here!</Link>
        </form>
    )
}