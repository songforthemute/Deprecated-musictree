import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeChart from "../components/HomeChart";
import Loading from "../components/Loading";

const Main = () => {
    const [trackTop10, setTrackTop10] = useState([]);
    const [loading, setLoading] = useState(true);

    // 루트 페이지 차트 top10 리스트 받아오기
    useEffect(() => {
        const getTopTrack = async () => {
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=Korea,+Republic+of&limit=10&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();
            setTrackTop10(json.tracks.track);
            setLoading(false);
        };

        getTopTrack();
    }, []);

    // console.log(trackTop10);

    // 루트 페이지 차트 top10 컴포넌트
    const homeChart = trackTop10.map((track, index) => (
        <HomeChart
            key={index}
            rank={index + 1}
            track={track.name}
            artist={track.artist.name}
            imgSrc={track.image[2]["#text"]}
        />
    ));

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Now Top Tracks!</h1>
                    <Link to="/search">
                        <h3>Search</h3>
                    </Link>
                    {homeChart}
                </div>
            )}
        </>
    );
};

export default Main;
