import { Button } from "@/components/ui/button"

type WorkExperience = {
    id: number,
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string
}

const WorkExperienceForm: React.FC<{
    experience: WorkExperience, 
    update: (updatedExperience: WorkExperience) => void,
    deleteExperience: (id: number) => void
    }> = ({experience, update, deleteExperience}) => (
    <div className="flex flex-col">
        <label className="mb-1">Company</label>
        <input 
            value={experience.company}
            type="text" 
            id="company" 
            autoComplete="off" 
            placeholder="Company Inc." 
            onChange={(e) => update({ ...experience, company: e.target.value})}
            className="form-boxes mb-2"/>
        <label className="mb-1">Position</label>
        <input 
            value={experience.position}
            type="text" 
            id="position" 
            autoComplete="off" 
            placeholder="Software Engineer" 
            onChange={(e) => update({ ...experience, position: e.target.value})}
            className="form-boxes mb-2"/>
        <div className="grid grid-cols-2 gap-10 mb-3">
            <div className="flex flex-col">
                <label>Start: </label>
                <input type="month" id="startedWork" value={experience.startDate} onChange={(e) => update({ ...experience, startDate: e.target.value})} className="form-boxes"/>
            </div>
            <div className="flex flex-col">
                <label>End: </label>
                <input type="month" id="endedWork" value={experience.endDate} onChange={(e) => update({ ...experience, endDate: e.target.value})} className="form-boxes"/>
            </div>
        </div>
        <textarea 
            value={experience.description}
            rows={5} 
            id="jobdescription" 
            placeholder="Worked on projects..." 
            maxLength={500} 
            onChange={(e) => update({ ...experience, description: e.target.value})}
            className="form-boxes"/>
        <div className="flex justify-center mt-2">
            <Button type="button" className="delete-button hover:bg-red-600" onClick={() => deleteExperience(experience.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </Button>
        </div>
    </div>
)

const WorkExperienceList: React.FC<{
    experiences: WorkExperience[], 
    update: (updatedExperience: WorkExperience, index: number) => void,
    deleteExperience: (id: number) => void
    }> = ({experiences, update, deleteExperience}) => (
    <div>
        {experiences.map((experience, index) => (
            <WorkExperienceForm key={index} experience={experience} update={(updatedExperience) => update(updatedExperience, index)} deleteExperience={deleteExperience}/>
        ))}
    </div>
)

export default WorkExperienceList;