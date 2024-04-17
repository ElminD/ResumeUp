import Resume from "@/app/models/ResumeSchema";
import { dbConnection } from "@/lib/utils";

export async function POST(req: Request) {
    const {email, resume} = await req.json()
    await dbConnection();

    const user = await Resume.findOne({email: email});
    if(user) {
        user.resume.push(resume)
        await user.save()
        return new Response(JSON.stringify({
            message: "Succesfully created resume.",
            status: 200
        }))
    }
    else {
        const newResume = {
            email: email,
            resume: [resume]
        }
        await Resume.create(newResume)
        return new Response(JSON.stringify({
            message: "Succesfully created resume.",
            status: 200
        }))
    }
}

export async function PUT(req: Request) {
    const {email} = await req.json()
    const resume = await Resume.findOne({email: email});

    if(resume) {
        return new Response(JSON.stringify({
            message: "SUCCESS",
            status: 200,
            data: resume.resume
        }))
    }
    else {
        return new Response(JSON.stringify({
            message: "No resumes for that user.",
            status: 200,
            data: []
        }))
    }
}

export async function DELETE(req: Request) {
    const {resume, email} = await req.json()
    const resumes = await Resume.findOne({email: email});
    const newResumes = resumes.resume.filter((aresume: string) => aresume !== resume)
    resumes.resume = newResumes
    await resumes.save()
    return new Response(JSON.stringify({
        message: "Succesfully deleted resume.",
        status: 200
    }))
}