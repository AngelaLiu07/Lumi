import { useState } from "react";
import reactLogo from "./assets/react.svg";
import mochi from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/clipart3904090.png";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  return (
    <main className="container">
      <h1 data-tauri-drag-region>
        hello mochi °❀.ೃ࿔*
      </h1>
      <button class="welcome-btn" data-tauri-drag-region>
        let's get started!
      </button>
      <div data-tauri-drag-region>
        <img src={mochi} width="100" height="100" class = "center-img" data-tauri-drag-region></img>
      </div>
    </main>
  );
}

export default App;
