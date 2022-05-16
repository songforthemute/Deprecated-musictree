import React, { useState, useEffect } from "react";
import HomeChart from "../components/HomeChart";

const Main = () => {
    const [trackTop10, setTrackTop10] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopTrack = async () => {
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();

            setTrackTop10(json.tracks.track);
            setLoading(false);
        };

        getTopTrack();
    }, []);

    console.log(trackTop10);

    const homeChart = trackTop10.map((track, index) => {
        return (
            <HomeChart
                key={index}
                rank={index + 1}
                name={track.name}
                artist={track.artist.name}
                imgSrc={track.image[2]["#text"]}
            />
        );
    });

    return (
        <div>
            {loading ? (
                <h1>Now Loading...</h1>
            ) : (
                <div>
                    <h1>Now Top Tracks!</h1>
                    {homeChart}
                </div>
            )}
        </div>
    );
};

export default Main;