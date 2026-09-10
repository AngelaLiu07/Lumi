
const { GoogleGenAI } = require('@google/genai'); 

async function makeDecision(context) {
    console.log(
    process.env.GEMINI_API_KEY
        ? "Gemini key loaded!"
        : "Gemini key NOT loaded!"
    );
    const client = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    
    const interaction  = await client.interactions.create({
        agent: "antigravity-preview-05-2026",
        system_instruction: "You are an empathetic friend of the user, who has nothing but the best interests in mind of the user whom you care deeply about platonically. You are to use your best judgement as a friend to help your friend with amiable short, succinct messages and choosing of a mood. BEFORE you send back the response, make sure you double check your answers to ensure they are an accurate representation given the context, and ensure the response is formatted correctly",
        input: `
        
        Here is the information you are given: ${JSON.stringify(context)}.
        The information provided tells you how many events the individual has scheduled for the day, how many tasks have been completed for the day, and how many tasks are still remaining in the day.

        Using this information, you must provide a structured response that covers the following:
        1. You are to provide a mood based off of your best judgement for day-to-day life and human behaviors. You are to choose a mood from one of the following, and it MUST be from one of the following:
        happy, concerned, calm, celebrating, tired.
        Happy is reserved for when you have completed a few tasks, or perhaps there are not many events for the day.
        Concerned is when there is an overwhelming amount of anything - tasks, events, or a combination.
        Calm is for when there is very few events and tasks to be completed.
        Celebrating is for when the individual has complete many events and or tasks for the day.
        And, tired is for when the user has completed tasks for the day, but still has many events and or tasks left.
        Use your best judgement to choose one of the categories.

        2. Then, you are to provide a succinct, empathetic, and warm response to the user, offering what you believe they need to hear at the moment given the situation (amount of tasks completed, tasks left, and events scheduled for the day.)

        Both of the responses are to be provided with output resembling the structure exactly below:
        {
            "mood": "",
            "message": ""
        }
        
        In other words, you are to return a structured response in valid JSON format that matches above, where on the right side of the colon, you are plugging in values you deemed fit.
        `,
        environment: "remote",

    });

    const output = interaction.output_text;
    const cleaned = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    console.log("CLEANED:");
    console.log(cleaned);
    const response = JSON.parse(cleaned);

    return response;

}
module.exports = makeDecision;