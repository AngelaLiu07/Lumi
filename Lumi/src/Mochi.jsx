import { useState } from 'react';

function Mochi({ mood }) {
    const [temp, setMood] = useState("calm");
            
    function handleClick() {
        setMood("happy");
    }

    return (
        <div>
            <h1 data-tauri-drag-region>⋆𐙚₊˚⊹♡</h1>
            <p style={{ textAlign : 'center' }}>Current mood (temp): {mood}</p>
            <button
                onClick = {handleClick}
                style = {{
                    display: 'block',
                    marginLeft : 'auto', 
                    marginRight : 'auto', 
                    backgroundColor: 'rgb(255, 203, 242)'
                }}
            >
                Mood : {temp} 
            </button>
        </div>
    );
}


export default Mochi;