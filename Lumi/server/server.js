// import express
const express = require("express");
const cors = require("cors");
const makeDecision = require('./makeDecision.js');
const memory = require('./memory')
const { listEvents } = require("./calendar");
const { listTasks } = require("./tasks.js");

// create express object to handle routing logic later
const app = express();
app.use(cors());
app.use(express.json());



// defines which port to be defined later
const PORT = 3000;

app.get("/memory/latest", async(req, res) => {
  const latest = memory.getLatestEntry();
  res.json(latest);
});


app.post("/decision", async (req, res) => {
  const events = await listEvents();
  const taskInfo = await listTasks();

  const context = {
    events : events,
    unfinishedTasks: taskInfo.unfinished,
    completedTasksToday: taskInfo.completed.length
  };

  const recent = memory.getMostRecentEntries(5);

  console.log("LIVE CONTEXT:");
  console.log(context);
  const response = await makeDecision(context, recent);
  memory.saveEntry(response);
  res.json(response);
});

app.listen(PORT, () => {
  console.log('SERVER IS LIVEE')
});

