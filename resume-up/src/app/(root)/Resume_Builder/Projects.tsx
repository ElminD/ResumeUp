import { Button } from "@/components/ui/button"
import React from "react"

type Project = {
    id: number,
    name: string,
    description: string
}

const ProjectForm: React.FC<{
    project: Project,
    update: (updatedProject: Project) => void,
    deleteProject: (id: number) => void
    }> = ({ project, update, deleteProject }) => (
    <div className="flex flex-col">
        <label className="mb-1">Project Name</label>
        <input 
            value={project.name}
            type="text" 
            id="projectname" 
            autoComplete="off" 
            placeholder="Cool Project" 
            onChange={(e) => update({ ...project, name: e.target.value})}
            className="form-boxes mb-2"/>
        <textarea 
            value={project.description}
            rows={5} 
            id="projectdescription" 
            placeholder="Made a project that..." 
            maxLength={500} 
            onChange={(e) => update({ ...project, description: e.target.value})}
            className="form-boxes"/>
        <div className="flex justify-center mt-2">
            <Button type="button" className="delete-button hover:bg-red-600" onClick={() => deleteProject(project.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </Button>
        </div>
    </div>
)

const ProjectList: React.FC<{
    projects: Project[], 
    update: (updatedProject: Project, index: number) => void,
    deleteProject: (id: number) => void
    }> = ({ projects, update, deleteProject }) => (
    <div>
        {projects.map((project, index) => (
            <ProjectForm key={index} project={project} update={(updatedProject) => update(updatedProject, index)} deleteProject={deleteProject}/>
        ))}
    </div>
)

export default ProjectList;