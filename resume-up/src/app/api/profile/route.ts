
import User from "@/app/models/UserSchema";
import { dbConnection } from "@/lib/utils";

export async function POST(req: Request) {
    const {email} = await req.json()
    await dbConnection();

    const user = await User.findOne({email: email});
    const userData = {
        email: user.email,
        password: user.password,
        phonenum: user.phonenum,
        name: user.name
    }
    return new Response(JSON.stringify({
        message: "Success",
        status: 200,
        data: userData
    }))
}

export async function PUT(req: Request) {
    const {fname, lname, email, phonenum, password, passwordCheck} = await req.json()
    await dbConnection();

    const user = await User.findOne({email: email});
    if(passwordCheck === user.password) {
        const updatedUser = {
            name: fname + " " + lname,
            email: email,
            phonenum: phonenum,
            password: user.password
        }
        if(password) {
            updatedUser.password = password
        }
        await User.findOneAndUpdate({email: email}, updatedUser)
        return new Response(JSON.stringify({
            message: "Account updated succesfully.",
            status: 200
        }))
    }
    else {
        return new Response(JSON.stringify({
            message: "Incorrect password.",
            status: 200
        }))
    }
}