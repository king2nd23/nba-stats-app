import { useState, useEffect } from "react";
import './index.css';
import Search from "./components/Search";
import StatCardDisplay from "./components/StatCardDisplay";
import axios from 'axios';

function App () {
    return (
        <div className="app">
            <StatCardDisplay />
        </div>
    )
}

export default App;