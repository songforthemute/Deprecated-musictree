import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Track = () => {
    const { artist, track } = useParams();
    const [loading, setLoading] = useState(true);
    const [trackInfo, setTrackInfo] = useState([]);

    useEffect(() => {
        const getTrackInfo = async () => {
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${artist}&track=${track}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();

            setTrackInfo(json);
            setLoading(false);
        };

        getTrackInfo();
    }, [artist, track]);

    console.log("trackInfo: ", trackInfo);

    const durationConvertor = (d) => {
        let min = Math.round(d / 1000 / 60);
        let sec = (d / 1000) % 60;

        if (min === 0) min = "00";
        else if (min < 10) min = "0" + String(min);
        else min = String(min);

        if (sec === 0) sec = "00";
        else if (sec < 10) sec = "0" + String(sec);
        else sec = String(sec);

        return `${min}:${sec}`;
    };

    return (
        <div>
            {loading ? (
                <h1>Now Loading...</h1>
            ) : (
                <div>
                    <img
                        alt={track}
                        src={trackInfo.track.album.image[3]["#text"]}
                    />
                    <h2>
                        {track} - {artist} (
                        {durationConvertor(trackInfo.track.duration)})
                    </h2>
                    <h5>Track in '{trackInfo.track.album.title}'</h5>
                    <h4>Playcount: {trackInfo.track.playcount}</h4>
                    <h4>Listeners: {trackInfo.track.listeners}</h4>
                    <br />
                    {trackInfo.track.wiki && (
                        <p>
                            {trackInfo.track.wiki.summary.length > 100
                                ? trackInfo.track.wiki.summary.slice(0, 100) +
                                  "..."
                                : trackInfo.track.wiki.summary}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Track;
