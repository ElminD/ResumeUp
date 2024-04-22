import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});
export default openai