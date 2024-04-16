
import User from "@/app/models/UserSchema";
import { dbConnection } from "@/lib/utils";

export async function POST(req: Request) {
    const {email, password} = await req.json()
    await dbConnection();

    const user = await User.findOne({email: email});
    if(user) {
        if(password === user.password) {
            return new Response(JSON.stringify({
                message: "Success",
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
    else {
        return new Response(JSON.stringify({
            message: "No account exists with that email.",
            status: 200
        }))
    }
}