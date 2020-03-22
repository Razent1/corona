import React from 'react';
import './App.css';
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import WorldInfo from "./components/WorldInfo";
import Main from "./components/Main";


function App() {
    return (
        <div className='container-fluid'>
            <Header/>
            <Main/>
        </div>
    )
}

export default App;
