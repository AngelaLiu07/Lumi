import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import mochi_icon from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/mochi.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Mochi from "./Mochi"
import "./Mochi.css";
import { runAgent } from "./Agent.js";

function App() {
  const [mood, setMood] = useState("calm");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (message === "") {
      return;
    }
    const timer = setTimeout(() => {
      setMessage("");
    }, 15000);

    return () => 
      clearTimeout(timer);
    }, [message]);

  useEffect(() => {
    // go to this address
    console.log("Trying to contact backend...");
    fetch("http://localhost:3000/health")
      // open the sealed package and turn it back into a JSON object
      .then((response) => response.json())
      // read the package and print to console
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Backend error", error)
      })
  }, []);
  // The [] tells the machine to run only once on startup
  
  const context = {
    eventsToday: 1,
    tasksDueSoon: 1,
    completed: 4
  }


  return (
    <main className="container">
      {message && (<blockquote className="speech-bubble">
        <p style={{
          textAlign:'center', 
          marginTop:'auto',
          marginBottom:'auto', 
          color:'pink'
          }}
        >
          { message }
        </p>
      </blockquote>
      )}

      <Mochi mood = {mood}></Mochi>

      <div>
        <button onClick = { () => {
            const decision = runAgent(context);
            setMessage(decision.message)
            setMood(decision.mood);
          }} data-tauri-drag-region>
          Click to see what happens!
        </button>
      </div>
    </main>
  );
  
}




export default App;
