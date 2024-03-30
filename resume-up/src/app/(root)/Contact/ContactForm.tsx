"use client"

import { Button } from "@/components/ui/button"

export default function ContactForm() {
    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
          name: String(event.target.name.value),
          email: String(event.target.email.value),
          subject: String(event.target.subject.value),
          message: String(event.target.message.value)
        }
    
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
            <label className="mb-1">Name</label>
            <input 
                type="text" 
                id="name" 
                required autoComplete="off" 
                placeholder="First Last" 
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
            <label className="mb-1">Email</label>
            <input 
                type="email" 
                id="email" 
                required autoComplete="off" 
                placeholder="bobsmith@email.com" 
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
            <label className="mb-1">Subject</label>
            <input 
                type="text" 
                id="subject" 
                required autoComplete="off" 
                placeholder="Email creation" 
                maxLength={100}
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
            <label className="mb-1">Message</label>
            <textarea 
                rows={5} 
                id="message" 
                required 
                placeholder="How can we help you?" 
                maxLength={500} 
                className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
            <div className="flex justify-center mt-4"><Button className="px-8 bg-violet-500 font-semibold">Send</Button></div>
        </form>
    )
}