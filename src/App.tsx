import { useState } from 'preact/hooks';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
    const [teamNum, setTeamNum] = useState(9999);
    const [mode, setMode] = useState("teleop");

    const handleTeamNumChange = (e) => {
        const newValue = e.target.value;
        setTeamNum(Number(newValue));
    };

    const handleModeChange = (e) => {
        const newValue = e.target.value;
        setMode(newValue);
        invoke('select_mode', { teamNum, mode: newValue });
    };

    return (
        <div className="container">
            <h1> Linux DS </h1>
            <label>
                Team Number 
                <input 
                    type="number" 
                    value={teamNum}
                    onChange={handleTeamNumChange} 
                />
            </label>
            <button onClick={() => { invoke('enable', { teamNum }) }}> Enable </button>
            <button onClick={() => { invoke('disable', { teamNum }) }}> Disable </button>
            <select 
                value={mode} 
                onChange={handleModeChange}
            >
                <option value="teleop"> Teleoperated </option>
                <option value="autonomous"> Autonomous </option>
                <option value="test"> Test </option>
            </select>
        </div>
    );
}

export default App;
