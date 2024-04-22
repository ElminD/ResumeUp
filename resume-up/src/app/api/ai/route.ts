import openai from '@/lib/openai';

export async function POST(req: Request) {
    const {description} = await req.json()
    if(description) {
        const aiDescription = await openai.chat.completions.create({
            messages: [{role: "user", content: `Write me detailed and thorough resume bullet points for each of these, only print the bullet points and keep the bullets to about 1 sentence: \n${description}`}],
            model: "gpt-3.5-turbo"
        })
        return new Response(JSON.stringify({
            message: aiDescription.choices[0].message.content,
            status: 200
        }))
    }
    else {
        return new Response(JSON.stringify({
            message: "",
            status: 200
        }))
    }
}