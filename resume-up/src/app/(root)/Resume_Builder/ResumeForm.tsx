"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import WorkExperienceList from "./WorkExperiences"
import ProjectList from "./Projects"
import { Template1 } from "./ResumeTemplates/Template1"
import Cookies from "js-cookie"

//Variables for work experiences and projects
type WorkExperience = {
    id: number,
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string
}
type Project = {
    id: number,
    name: string,
    description: string
}

export default function ContactForm() {
    const [loggedInUser, setLoggedInUser] = useState(Cookies.get("loggedinEmail"))
    const [creationStatus, setCreationStatus] = useState({made: false, message: ""})
    //Work Experience Functions
    const [workExperiences, setWorkExperiences] = useState([
        {
            id: Date.now(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: ""
        }
    ])
    const updateExperience = (updatedExperience: WorkExperience, index: number) => {
        const updatedExperiences = [...workExperiences]
        updatedExperiences[index] = updatedExperience
        setWorkExperiences(updatedExperiences)
    }
    const addExperience = () => {
        setWorkExperiences([
            ...workExperiences,
            {
                id: Date.now(),
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: ""
            }
        ])
    }
    const deleteExperience = (id: number) => {
        const updatedExperiences = workExperiences.filter((experience) => experience.id != id)
        setWorkExperiences(updatedExperiences)
    }

    //Project Functions
    const [projects, setProjects] = useState([
        {
            id: Date.now(),
            name: "",
            description: ""
        }
    ])
    const updateProject = (updatedProject: Project, index: number) => {
        const updatedProjects = [...projects]
        updatedProjects[index] = updatedProject
        setProjects(updatedProjects)
    }
    const addProject = () => {
        setProjects([
            ...projects,
            {
                id: Date.now(),
                name: "",
                description: ""
            }
        ])
    }
    const deleteProject = (id: number) => {
        const updatedProjects = projects.filter((project) => project.id != id)
        setProjects(updatedProjects)
    }

    const [createStatus, setCreateStatus] = useState(false)

    //Create a resume
    const [resumeDisplay, setResumeDisplay] = useState("")
    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            school: event.target.school.value,
            started: event.target.started.value,
            ended: event.target.ended.value,
            degreetype: event.target.degreetype.value,
            major: event.target.major.value,
            educationinfo: event.target.educationinfo.value,
            workExperiences: workExperiences,
            projects: projects,
            skills: event.target.skills.value
        }

        if(createStatus) {
            const pdfUri = await Template1(data, true)
            setResumeDisplay(pdfUri)
    
            const response = await fetch("/api/resumebuilder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: loggedInUser, resume: pdfUri})
            })
            const responseData = await response.json()
            setCreationStatus({made: true, message: responseData.message})
        }
        else {
            const pdfUri = await Template1(data, false)
            setResumeDisplay(pdfUri)
            setCreationStatus({made: true, message: "Succesfully generated resume."})
        }
    }

    const [resumeBuilder, setResumeBuilder] = useState({
        name: "",
        email: "",
        phone: "",
        school: "",
        started: "",
        ended: "",
        degreetype: "Bachelors",
        major: "",
        educationinfo: "",
        workExperiences: workExperiences,
        projects: projects,
        skills: ""
    })

    function formChange(event: any) {
        const { id, value } = event.target;

        setResumeBuilder((prevResumeBuilder) => ({
          ...prevResumeBuilder,
          [id]: value,
          workExperiences: workExperiences,
          projects: projects
        }));
    }

    const [hidePersonalInfo, setHidePersonalInfo] = useState(true)
    const [hideEducation, setHideEducation] = useState(true)
    const [hideWorkExperience, setHideWorkExperience] = useState(true)
    const [hideProjects, setHideProjects] = useState(true)
    const [hideSkills, setHideSkills] = useState(true)

    useEffect(() => {
        if(resumeBuilder) {
            Template1(resumeBuilder, false)
            .then((pdfUri) => setResumeDisplay(pdfUri))
        }
    }, [resumeBuilder])

    return (
        <div className="grid grid-cols-2 gap-4">
            <form className="flex flex-col p-4 ms-5" onSubmit={handleSubmit} onChange={formChange}>
                {/* Personal Information */}
                <p className="form-header" onClick={() => setHidePersonalInfo(!hidePersonalInfo)}>Personal Information</p>
                <div hidden={hidePersonalInfo} className={hidePersonalInfo ? "" : "mb-6"}><div className="flex flex-col">
                    <label className="mb-1">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        autoComplete="off" 
                        placeholder="First Last" 
                        className="form-boxes mb-2"/>
                    <label className="mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        autoComplete="off" 
                        placeholder="bobsmith@email.com" 
                        className="form-boxes mb-2"/>
                    <label className="mb-1">Phone Number</label>
                    <input 
                        type="text" 
                        id="phone" 
                        autoComplete="off" 
                        placeholder="111-111-1111"
                        className="form-boxes"/>
                </div></div>
                
                {/* Education */}
                <p className="text-lg font-semibold mt-2" onClick={() => setHideEducation(!hideEducation)}>Education</p>
                <div hidden={hideEducation} className={hideEducation ? "" : "mb-6"}>
                    <div className="flex flex-col"><label className="mb-1">School</label>
                        <input 
                            type="text" 
                            id="school" 
                            autoComplete="off" 
                            placeholder="Iowa State University" 
                            className="form-boxes mb-2"/>
                    <div className="grid grid-cols-2 gap-10 mb-3">
                        <div className="flex flex-col">
                            <label>Start: </label>
                            <input type="month" id="started" className="form-boxes"/>
                        </div>
                        <div className="flex flex-col">
                            <label>End: </label>
                            <input type="month" id="ended" className="form-boxes"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10 mb-1">
                        <div className="flex flex-col row-span-1">
                            <label className="mb-1">Degree Type</label>
                            <div className="flex flex-col form-boxes mb-2">
                                <select
                                    id="degreetype"
                                    autoComplete="off" 
                                    className="bg-gray-200 focus:outline-none">
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PHD">PHD</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1">Major</label>
                            <input 
                                type="text" 
                                id="major"
                                autoComplete="off" 
                                placeholder="Software Engineering" 
                                className="form-boxes mb-2"/>
                        </div>
                    </div>
                    <textarea
                        rows={5} 
                        id="educationinfo"
                        placeholder="Courses taken include..." 
                        maxLength={500} 
                        className="form-boxes"/>
                </div></div>
                {/* Work Experience */}
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-lg font-semibold" onClick={() => setHideWorkExperience(!hideWorkExperience)}>Work Experience</p>
                    <div hidden={hideWorkExperience}><div className="grid justify-items-end">
                        <Button type="button" onClick={addExperience} className="add-button col-end hover:bg-green-600">+</Button>
                    </div></div>
                </div>
                <div hidden={hideWorkExperience}>
                    <WorkExperienceList experiences={workExperiences} update={updateExperience} deleteExperience={deleteExperience}/>
                </div>
                {/* Projects */}
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-lg font-semibold" onClick={() => setHideProjects(!hideProjects)}>Projects</p>
                    <div hidden={hideProjects}><div className="grid justify-items-end">
                        <Button type="button" onClick={addProject} className="add-button col-end hover:bg-green-600">+</Button>
                    </div></div>
                </div>
                <div hidden={hideProjects}>
                    <ProjectList projects={projects} update={updateProject} deleteProject={deleteProject}/>
                </div>
                {/* Skills */}
                <p className="text-lg font-semibold mt-2" onClick={() => setHideSkills(!hideSkills)}>Skills</p>
                <div hidden={hideSkills}><div className="flex flex-col">
                    <textarea 
                        rows={5} 
                        id="skills" 
                        placeholder="Java, Python..." 
                        maxLength={500}
                        className="form-boxes"/>
                </div></div>
                <div className="flex flex-col justify-center mt-4 mb-8">
                    <div className="flex justify-center">
                        <Button className="submit-button hover:bg-[#5c51f5] mx-2" onClick={() => setCreateStatus(true)}>Save Resume</Button>
                    </div>
                    {creationStatus.made ?
                         <div>
                            <p className="text-green-600 text-center font-semibold mt-2">{creationStatus.message}</p>
                            <p className="font-semibold mt-2">Resume Grade</p>
                            <p className="font-semibold mt-2">Work Experiences (100pts each): {workExperiences[0].company ? workExperiences.length : 0}</p>
                            <p className="font-semibold mt-2">Projects (75pts each): {projects[0].name ? projects.length : 0}</p>
                            <p className="font-semibold mt-2">Skills (20pts): {resumeBuilder.skills.split(" ")[0] ? resumeBuilder.skills.split(" ").length : 0}</p>
                            <p className="font-semibold mt-2">
                                Total Score: {((workExperiences[0].company ? workExperiences.length : 0) * 100) + ((projects[0].name ? projects.length : 0) * 75) + ((resumeBuilder.skills.split(" ")[0] ? resumeBuilder.skills.split(" ").length : 0) * 20)}
                            </p>
                        </div> :
                         <br/>
                    }
                </div>
            </form>
            <div className="p-4 me-5"><iframe src={resumeDisplay} className="w-full h-[985px]"/></div>
        </div>
    )
}