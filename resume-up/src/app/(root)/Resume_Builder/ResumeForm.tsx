"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import WorkExperienceList from "./WorkExperiences"
import ProjectList from "./Projects"
import { Template1 } from "./ResumeTemplates/Template1"

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

    //Create a resume
    async function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
            personalInfo: {
                name: event.target.name.value,
                email: event.target.email.value,
                phoneNum: event.target.phone.value,
            },
            education: {
                school: event.target.school.value,
                startDate: event.target.started.value,
                endDate: event.target.ended.value,
                degreeType: event.target.degreetype.value,
                major: event.target.major.value,
                description: event.target.educationinfo.value
            },
            workExperiences: workExperiences,
            projects: projects,
            skills: event.target.skills.value
        }

        Template1(data)
    }

    return (
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <p className="form-header">Personal Information</p>
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

            {/* Education */}
            <p className="text-lg font-semibold mt-8">Education</p>
            <label className="mb-1">School</label>
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
            {/* Work Experience */}
            <div className="grid grid-cols-2 mt-8">
                <p className="text-lg font-semibold">Work Experience</p>
                <div className="grid justify-items-end">
                    <Button type="button" onClick={addExperience} className="add-button col-end hover:bg-green-600">+</Button>
                </div>
            </div>
            <WorkExperienceList experiences={workExperiences} update={updateExperience} deleteExperience={deleteExperience}/>
            {/* Projects */}
            <div className="grid grid-cols-2 mt-2">
                <p className="text-lg font-semibold">Projects</p>
                <div className="grid justify-items-end">
                    <Button type="button" onClick={addProject} className="add-button col-end hover:bg-green-600">+</Button>
                </div>
            </div>
            <ProjectList projects={projects} update={updateProject} deleteProject={deleteProject}/>
            {/* Skills */}
            <p className="text-lg font-semibold mt-2">Skills</p>
            <textarea 
                rows={5} 
                id="skills" 
                placeholder="Java, Python..." 
                maxLength={500}
                className="form-boxes"/>
            <div className="flex justify-center mt-4">
                <Button className="submit-button hover:bg-violet-600">Create Resume</Button>
            </div>
        </form>
    )
}