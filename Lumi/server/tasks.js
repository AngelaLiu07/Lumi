
const { google } = require("googleapis");
const { getAuth } = require("./googleAuth")

function isToday(dateString) {
    if (!dateString) return false;

    const date = new Date(dateString);
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    )
}

function isDueToday(dateString) {
    if(!dateString) return false;

    const today = new Date().toLocaleDateString('en-CA', {
        timeZone : 'America/New_York'
    });
    return dateString.slice(0, 10) === today;
}
/**
 * Lists the next 10 events on the user's primary calendar.
 */
async function listTasks() {
  // Authenticate with Google and get an authorized client.
  const auth = await getAuth();

  const service = google.tasks({
    version: "v1",
    auth
  });
  
  const results = await service.tasks.list({
    tasklist: '@default',
    showCompleted : true,
    showHidden: true,
    maxResults : 20
  });

  tasks = results.data.items;

  const finished = [];
  const incomplete = [];
  for (task of tasks) {
    if (task.status === "completed") {
        finished.push({
            title: task.title,
            task: task.status,
            due: task.due,
            completed : task.completed
        });
    }
    else {
        incomplete.push({
            title: task.title,
            task: task.status,
            due: task.due
        });
    }
  }

  const unfinishedToday = incomplete.filter (task => isDueToday(task.due));
  const completedToday = finished.filter(task => isToday(task.completed));
  return {
    unfinished : unfinishedToday,
    completed : completedToday
  };
}

module.exports = { listTasks };