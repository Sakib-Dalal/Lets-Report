import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import necessary components for routing
import Status from "./components/Status";
import Map from "./components/Map";
import Feed from "./components/Feed";
import Login from "./components/Login"; 
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PostDetail from "./components/PostDetail";
import MyNavBar from "./components/MyNavBar";

function App() {
    return (
        <Router>
            <div className="App">
                {/* Define routes for different pages */}
                <Routes>
                    {/* MyNavBar only for the home route */}
                    <Route 
                        path="/" 
                        element={
                            <>
                                <MyNavBar />
                                <Status />
                                <div className="map-feed shadow">
                                    <Map />
                                    <br></br>
                                    <br></br>
                                    <Feed />
                                </div>
                            </>
                        } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/post/:reportid" element={<PostDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
