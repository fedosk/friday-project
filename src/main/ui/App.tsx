import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../bll/store";
import {Header} from "./header/Header";
import {Rout} from "./routes/Routes";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Header/>
                    <Rout/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
