export function runAgent(context) {
    let mood;
    let action;
    let message;


    if (context.tasksDueSoon > 5 && context.completed <= 1) {
        mood = "concerned";
        action = "encourage";
        message = "Take things one by one (and don't forget to take care of yourself!"
    }
    else if (context.eventsToday >= 5 || context.tasksDueSoon > 8) {
        mood = "tired";
        action = "relax";
        message = "Take the rest of the day off, you deserve it!"
    }
    else if (context.completed > 5) {
        mood = "celebrating";
        action = "praise";
        message = "Well done! Take a break :)"
    }
    else if (context.completed > 3 &&  context.tasksDueSoon < 3) {
        mood = "happy";
        action = "encourage";
        message = "You're doing amazing so far! Only a few more things left - keep pushing!"
    }
    else if (context.eventsToday < 3 || context.tasksDueSoon < 2) {
        mood = "calm";
        action = "relax";
        message = "What a peaceful day it is! Make sure to get some fresh air!"
    }
    const decision = {
        mood,
        action,
        message
    };
    return decision;
}