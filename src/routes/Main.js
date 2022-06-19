import React, { useState, useEffect } from "react";
import HomeChart from "../components/HomeChart";
import Loading from "../components/Loading";

const Main = () => {
    const [mainChart, setMainChart] = useState([]);
    const [loading, setLoading] = useState(true);

    // 루트 페이지 차트 top10 리스트 받아오기
    useEffect(() => {
        const getTopTrack = async () => {
            const json = await (
                await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=Korea,+Republic+of&limit=10&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();
            setMainChart(json.tracks.track);
            setLoading(false);
        };

        getTopTrack();
    }, []);

    // 루트 페이지 차트 top10 컴포넌트
    const homeChart = mainChart.map((track, index) => (
        <HomeChart
            key={index}
            rank={index + 1}
            track={track.name}
            artist={track.artist.name}
        />
    ));

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="root__title">현재 인기있는 노래</h1>
                    {/* <img className="root_img" src="#" alt="toptracks" /> */}
                    <div className="root__chart">{homeChart}</div>
                </>
            )}
        </>
    );
};

export default Main;
