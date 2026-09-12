
const { google } = require("googleapis");
const { getAuth } = require("./googleAuth");

/**
 * Lists the next 10 events on the user's primary calendar.
 */
async function listEvents() {
  // Authenticate with Google and get an authorized client.
  const auth = await getAuth();

  // Create a new Calendar API client.
  const calendar = google.calendar({version: 'v3', auth});
  // Get the list of events.
  const now = new Date();
  const startOfTomorrow = new Date();
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  startOfTomorrow.setHours(0, 0, 0, 0);
  const result = await calendar.events.list({
    calendarId: 'primary',
    timeMin: now.toISOString(),
    timeMax : startOfTomorrow.toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = result.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  const items = [];
  // Print the start time and summary of each event.
  for (const event of events) {
    const start = event.start?.dateTime ?? event.start?.date;
    items.push({
        name : event.summary,
        start : start
    });
  }
  return items;
}



module.exports = { listEvents };