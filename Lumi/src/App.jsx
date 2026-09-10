import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import mochi_icon from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/mochi.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Mochi from "./Mochi"
import "./Mochi.css";

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
  // The [] tells the machine to run only once on startup
  
  const context = {
    eventsToday: 10,
    tasksDueSoon: 8,
    completed: 3
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
        <button onClick = {async () => {
            const response = await fetch("http://localhost:3000/decision", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(context)
            });

            const decision = await response.json();
            
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
