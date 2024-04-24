"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"

export default function LoginForm() {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState({failed: false, display: ""})

    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
          email: String(event.target.email.value),
          password: String(event.target.password.value)
        }
    
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if(responseData.message !== "Success") {
            setLoggedIn({failed: true, display: responseData.message})
        }
        else {
            router.push("/Profile")
            Cookies.set("loggedinEmail", data.email, {expires: Date.now() + (6 * 60 * 60 * 1000)})
        }
    }

    return (
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
            <label className="mb-1">Email</label>
            <input 
                type="email" 
                id="email" 
                required autoComplete="off" 
                placeholder="bobsmith@email.com" 
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-8"/>
            <label className="mb-1">Password</label>
            <input 
                type="password" 
                id="password" 
                required autoComplete="off" 
                placeholder="Password"
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-6"/>
            <div className="flex justify-center mt-4">
                <Button className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg">Log In</Button>
            </div>
            {loggedIn.failed ? <p className="text-red-400 text-center font-semibold mt-2">{loggedIn.display}</p> : null}
            <Link href="/Sign_Up" className="flex justify-center mt-6 underline">Don&apos;t have an account? Make one here!</Link>
        </form>
    )
}