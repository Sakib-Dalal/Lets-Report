import React from "react";
import ReactDOM from "react-dom/client"
import MyNavBar from "./components/MyNavBar"
import Status from "./components/Status"
import Map from "./components/Map"
import Feed from "./components/Feed"
import "./App.css";

function App() {

    return (
        <>
            <MyNavBar />
            <Status />
            <div className="map-feed shadow">
                <Map />
                <Feed />
            </div>
        </>
    )
}

export default App;