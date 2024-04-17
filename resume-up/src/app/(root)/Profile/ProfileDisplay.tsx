"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import Link from "next/link";


export default function ProfileDisplay() {
    const loggedinUser = Cookies.get("loggedinEmail")
    // const loggedinUser = "nhodzic@iastate.edu"
    const [updateCheck, setUpdateCheck] = useState({status: false, message: ""})
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        fname: "",
        lname: "",
        phonenum: ""
    })
    const [resumes, setResumes] = useState([])
    const [resumeDisplay, setResumeDisplay] = useState("")

    function formChange(event: any) {
        const { id, value } = event.target;

        setUserData((prevUserData) => ({
          ...prevUserData,
          [id]: value,
        }));
    }

    async function handleUpdate(event: any) {
        event.preventDefault();
        const data = {
          fname: String(event.target.fname.value),
          lname: String(event.target.lname.value),
          email: userData.email,
          phonenum: String(event.target.phonenum.value),
          password: String(event.target.password.value),
          passwordCheck: String(event.target.passwordCheck.value)
        }
    
        const response = await fetch("/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if(responseData.message === "Success") {
            setUpdateCheck({status: true, message: responseData.message})
        }
        else {
            setUpdateCheck({status: true, message: responseData.message})
        }
    }

    function hidePopup() {
        setUpdateCheck({status: false, message: ""})
    }

    function logout() {
        Cookies.remove("loggedinEmail")
    }

    function showResume(index: number) {
        if(resumeDisplay === resumes[index]) {
            setResumeDisplay("")
        }
        else {
            setResumeDisplay(resumes[index])
        }
    }

    async function deleteResume() {
        const response = await fetch("/api/resumebuilder", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: loggedinUser, resume: resumeDisplay})
        })
        
        setResumeDisplay("")
        
        fetch('/api/resumebuilder', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: loggedinUser})
        })
        .then((response) => response.json())
        .then((data) => setResumes(data.data))
        .catch((error) => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        if(loggedinUser) {
            fetch('/api/profile', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: loggedinUser})
            })
            .then((response) => response.json())
            .then((data) => {
                const loadedData = {
                    email: data.data.email,
                    password: data.data.password,
                    fname: data.data.name.split(" ")[0],
                    lname: data.data.name.split(" ")[1],
                    phonenum: data.data.phonenum
                }
                setUserData(loadedData)
            })
            .catch((error) => console.error('Error fetching data:', error));

            fetch('/api/resumebuilder', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: loggedinUser})
            })
            .then((response) => response.json())
            .then((data) => setResumes(data.data))
            .catch((error) => console.error('Error fetching data:', error));
        }
    }, []);

    return (
        <div>
            {loggedinUser ? 
                <div onClick={hidePopup}>
                    <form className="flex flex-col  px-96" onChange={formChange} onSubmit={handleUpdate}>
                        {userData.email ? <p className="text-center text-lg mb-3">{userData.email}</p> : <br/>}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <label className="mb-1">First Name</label>
                                <input 
                                    type="text" 
                                    id="fname" 
                                    autoComplete="off" 
                                    placeholder="Bob" 
                                    value={userData.fname}
                                    className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lname" 
                                    autoComplete="off" 
                                    placeholder="Smith" 
                                    value={userData.lname}
                                    className="border border-gray-300 bg-gray-200 rounded p-2 mb-2"/>
                            </div>
                        </div>
                        <label className="mb-1">Phone Number</label>
                        <input 
                            type="text" 
                            id="phonenum" 
                            autoComplete="off" 
                            placeholder="111-111-1111"
                            value={userData.phonenum}
                            className="form-boxes mb-2"/>
                        <label className="mb-1">Change Password</label>
                        <input 
                            type="password"
                            id="password" 
                            autoComplete="off" 
                            placeholder="New Password"
                            className="border border-gray-300 bg-gray-200 rounded p-2 mb-4"/>
                        <div>
                            <div className="mb-2 flex justify-center">
                                <Button className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg me-5">Update</Button>
                                <input 
                                    type="password"
                                    id="passwordCheck" 
                                    autoComplete="off" 
                                    placeholder="Password"
                                    className="border border-gray-300 bg-gray-200 rounded p-2 flex-grow align-middle"/>
                            </div>
                            {updateCheck.status ?
                                <p className={`${updateCheck.message.charAt(0) === 'A' ? "text-green-600" : "text-red-400"} 
                                text-center 
                                font-semibold mt-2`}>{updateCheck.message}</p> : <br/>
                            }
                        </div>
                    </form>
                    <div className="flex flex-col items-center">
                        <div className="flex">
                            <span className="text-4xl font-bold text-resumeup justify-center me-5">Resumes</span>
                            <Link href={"/Resume_Builder"}><Button className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg">New Resume</Button></Link>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                            {resumes.map((resume, index) => {
                                console.log(resume)
                                return (
                                    <Button key={index} className="font-semibold bg-green-600 hover:bg-green-700 w-40 h-12 text-lg mt-4 mx-2" onClick={() => showResume(index)}>Resume {index + 1}</Button>
                                )
                            })
                            }
                            </div>
                            <div className="flex flex-col justify-center">
                                {resumeDisplay ? <div className="p-4 flex flex-col justify-center">
                                    <div className="flex justify-center"><iframe src={resumeDisplay} className="w-[300px] h-[480px] mb-3"/></div>
                                    <div className="flex justify-center"><Button type="button" className="delete-button hover:bg-red-600" onClick={deleteResume}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </Button></div>
                                    </div>: null}
                            </div>
                        </div>
                        <Link href={"/Log_In"}><Button onClick={logout} className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg mt-8 mb-5">Log Out</Button></Link>
                    </div>
                </div> :
                <div className="flex flex-col items-center">
                    <p className="text-lg my-5">Please log in first.</p>
                    <Link href={"/Log_In"}><Button className="submit-button hover:bg-[#5c51f5] w-40 h-12 text-lg">Log In</Button></Link>
                </div>
            }
        </div>
    )
}