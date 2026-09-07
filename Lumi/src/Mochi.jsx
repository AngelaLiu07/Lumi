import { useState } from 'react';
import mochi_happy from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/happy.svg";
import mochi_calm from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/calm.svg";
import mochi_celebrating from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/celebrating.png";
import mochi_concerned from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/concerned.svg";
import mochi_tired from "/Users/angelaliu/Desktop/Lumi/Lumi/src-tauri/icons/tired.svg";
import "./Mochi.css"

function Mochi({ mood }) {
    let am;
    let current_image;
    
    if (mood === "happy") {
        <p>{mood}</p>
        current_image = mochi_happy;
        am = "bounce";
    }
    else if (mood === "calm"){
        current_image = mochi_calm;
        am = "toddle";
    }
    else if (mood === "celebrating") {
        current_image = mochi_celebrating;
        am = "bouncyyy";
    }
    else if (mood === "concerned") {
        current_image = mochi_concerned;
        am = "wiggle";
    }
    else {
        current_image = mochi_tired;
        am = "gentle";
    }

    return (
    <img 
        src={current_image} 
        width="100" 
        height="100" 
        className={am} 
        data-tauri-drag-region
    />
    );
}


export default Mochi;