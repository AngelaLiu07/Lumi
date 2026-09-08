// import express
const express = require("express");
const cors = require("cors");

// create express object to handle routing logic later
const app = express();
app.use(cors());


// defines which port to be defined later
const PORT = 3000;


// listening specifically for GET requests on the /health path. Hands them everything they know with 'req', and 'res' is what is being handed back
// takes JSON object and turns it back into text
app.get("/health", (req, res) => {
  res.json({ status: "everything's wonderful" });
});


// Binds app to port and starts event listener for connections.
app.listen(PORT, () => {
  console.log(`YAY! Server is running on http://localhost:${PORT}`);
});