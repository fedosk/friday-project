import React from 'react';
import './App.css';
import {Header} from "./header/Header";
import {Rout} from "./routes/Routes";


function App() {
    return (
        <div className="App">
            <Header/>
            <Rout/>
        </div>
    );
}

export default App;
