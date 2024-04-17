import { Schema, model, models, Types } from "mongoose";

interface IResume {
    email: string;
    resume: Types.Array<string>;
}

const resumeSchema = new Schema<IResume>({
    email: String,
    resume: [String]
});

const Resume = models.Resume<IResume> || model<IResume>('Resume', resumeSchema);

export default Resume