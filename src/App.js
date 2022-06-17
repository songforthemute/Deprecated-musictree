import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artist from "./routes/Artist";
import Track from "./routes/Track";
import Main from "./routes/Main";
import Search from "./routes/Search";
import Chart from "./routes/Chart";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Nav />
            <div className="main">
                <div className="container">
                    <Routes>
                        <Route path="/:artist/:track" element={<Track />} />
                        <Route path="/:artist" element={<Artist />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/chart" element={<Chart />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
