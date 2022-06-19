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
                        <Route exact path="/:artist" element={<Artist />} />
                        <Route
                            exact
                            path="/:artist/:track"
                            element={<Track />}
                        />
                        <Route exact path="/chart" element={<Chart />} />
                        <Route exact path="/search" element={<Search />} />
                        <Route exact path="/" element={<Main />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
