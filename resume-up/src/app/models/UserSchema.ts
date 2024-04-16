import { Schema, model, models } from "mongoose";

interface IUser {
    name: string;
    email: string;
    phonenum: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String },
    phonenum: String,
    password: String
});

const User = models.User<IUser> || model<IUser>('User', userSchema);

export default User