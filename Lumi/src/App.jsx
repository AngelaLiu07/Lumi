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
        <button onClick = {
          () => {
            setMood("happy");
          setMessage("Well done!!")
        }} data-tauri-drag-region>
          Happy
        </button> 
        
        <button onClick = {() => {
          setMood("calm");
        setMessage("free time...")
        }} data-tauri-drag-region>
          Calm
        </button>

        <button onClick = {() => {
          setMood("concerned");
          setMessage("Don't forget to take time for yourself!")
        }} 
          data-tauri-drag-region>
          Concerned
        </button>

        <button onClick = {() => {
          setMood("celebrating");
          setMessage("AMAZING! YOU just did that!")
        }} 
        data-tauri-drag-region>
          Celebrating
        </button>
E
        <button onClick = {() => {
          setMood("tired")
          setMessage("I'm...tired...zzz...")
        }} 
        data-tauri-drag-region>
          Tired
        </button>
      
      </div>
    </main>
  );
}




export default App;
