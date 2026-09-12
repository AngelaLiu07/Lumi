// import express
const express = require("express");
const cors = require("cors");
const makeDecision = require('./makeDecision.js');
const memory = require('./memory')

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
  const context = req.body;
  const recent = memory.getMostRecentEntries(5);
  console.log(recent);
  const response = await makeDecision(context, recent);
  memory.saveEntry(response);
  res.json(response);
});

app.listen(PORT, () => {
  console.log('SERVER IS LIVEE')
});

