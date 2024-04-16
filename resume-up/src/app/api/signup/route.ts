
import User from "@/app/models/UserSchema";
import { dbConnection } from "@/lib/utils";

export async function POST(req: Request) {
    const {fname, lname, email, phonenum, password} = await req.json()
    await dbConnection();

    if(await User.findOne({email: email})) {
        return new Response(JSON.stringify({
            message: "Account already exsists with that email.",
            status: 409
        }))
    }
    else {
        const user = new User({
            name: fname + " " + lname,
            email: email,
            phonenum: phonenum,
            password: password
        })
        try {
            await User.create(user)
            return new Response(JSON.stringify({
                message: "Account made succesfully.",
                status: 200
            }))
        } catch(error) {
            console.log(error)
            return new Response(JSON.stringify({
                message: "Error making account.",
                status: 500,
                error: error
            }))
        }
    }
}