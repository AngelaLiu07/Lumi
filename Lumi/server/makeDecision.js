
const { GoogleGenAI } = require('@google/genai'); 

async function makeDecision(context, recentHistory) {
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
        
        Here is the information you are given: current context:
        ${JSON.stringify(context)},
        
        Here is the data for the 5 most recent actions:
        ${JSON.stringify(recentHistory)}.

        Use the recent history to avoid unnecessarily repeating the same
        message, mood, wording, or recommendation when the user's situation
        has not meaningfully changed.

        The current context contains the user's relevant calendar events
        for today, unfinished tasks due today, and the number of tasks
        completed today.

        Use the event names and times, unfinished task names and due dates,
        and completed-task count to understand the user's current workload
        and progress.

        Do not invent events, tasks, deadlines, or accomplishments that are
        not present in the provided context.

        Using this information, you must provide a structured response that covers the following:
        1. You are to provide a mood based off of your best judgement for day-to-day life and human behaviors. You are to choose a mood from one of the following, and it MUST be from one of the following:
        happy, concerned, calm, celebrating, tired.
        Happy is reserved for when you have completed a few tasks, or perhaps there are not many events for the day.
        Concerned is when there is an overwhelming amount of anything - tasks, events, or a combination.
        Calm is for when there is very few events and tasks to be completed.
        
        Use these descriptions as guidance rather than strict numerical rules.
        Consider the overall context, time of day, progress, remaining workload,
        and recent history.
        
        Celebrating is for when the individual has complete many events and or tasks for the day.
        And, tired is for when the user has completed tasks for the day, but still has many events and or tasks left.
        Use your best judgement to choose one of the categories.


        2. Then, you are to provide a succinct, empathetic, and warm response to the user, offering what you believe they need to hear at the moment given the situation (amount of tasks completed, tasks left, and events scheduled for the day.)

        Upon your initial assessment, that result should be stored in proposedAction, and when you are thinking about the results, but printing NO additional information or text then what is specified below, your final assessment should be stored in finalAction.
        Both of the responses are to be provided with output resembling the structure exactly below:
        {
            "timestamp" : "",
            "observation" : {
                "mood": "",
                "message": ""
            },
            "proposedAction" : "",
            "finalAction" : "",
            "mood" : "",
            "message" : "",
            "summary" : ""
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

    const allowedMoods = [
        "calm",
        "happy",
        "concerned",
        "tired",
        "celebrating"
    ];

    if (typeof response.mood !== "string" || !allowedMoods.includes(response.mood.toLowerCase().trim())) {
        response.mood = "calm";
    }
    else {
        response.mood = response.mood.toLowerCase().trim;
    }

    return response;

}
module.exports = makeDecision;