// import express
const express = require("express");
const cors = require("cors");
const makeDecision = require('./makeDecision.js')

// create express object to handle routing logic later
const app = express();
app.use(cors());
app.use(express.json());


// defines which port to be defined later
const PORT = 3000;


app.post("/decision", async (req, res) => {
  const context = req.body;
  const response = await makeDecision(context);

  res.json(response);
})

app.listen(PORT, () => {
  console.log('SERVER IS LIVEE')
});

