import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artist from "./routes/Artist";
import Track from "./routes/Track";
import Home from "./routes/Home";

const App = () => {
    // return <Home />;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:artist/:track" element={<Track />} />
                <Route path="/:artist" element={<Artist />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

/**
 * Routes
 *  : Route를 탐색하고, 찾으면 컴포넌트를 렌더링함
 *  : Routes의 자식은 Route여야하며, element로 접근함
 */
