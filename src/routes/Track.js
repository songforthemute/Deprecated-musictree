import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Track = () => {
    const { artist, track } = useParams();
    const [loading, setLoading] = useState(true);
    const [trackInfo, setTrackInfo] = useState([]);

    useEffect(() => {
        const getTrackInfo = async () => {
            const json = await (
                await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${artist}&track=${track}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();

            setTrackInfo(json.track);
            setLoading(false);
        };

        getTrackInfo();
    }, [artist, track]);

    const durationConvertor = (d) => {
        let min = Math.round(d / 1000 / 60);
        let sec = (d / 1000) % 60;

        if (min === 0) {
            min = "00";
        } else if (min < 10) {
            min = "0" + String(min);
        } else {
            min = String(min);
        }

        if (sec === 0) {
            sec = "00";
        } else if (sec < 10) {
            sec = "0" + String(sec);
        } else {
            sec = String(sec);
        }

        return `${min}:${sec}`;
    };

    const numConvertor = (n) => {
        const num = String(n);
        const dividor = num.length % 3;
        let str = "";

        for (let i = num.length - 1; i >= 0; i--) {
            str = num[i] + str;
            if (i && i % 3 === dividor) str = "," + str;
        }

        return str;
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {trackInfo.album && (
                        <div className="content__img">
                            <img
                                alt={track}
                                src={trackInfo.album.image[3]["#text"]}
                            />
                        </div>
                    )}
                    <h2 className="content__title">
                        {track} ({durationConvertor(trackInfo.duration)}){" "}
                        <a
                            href={`https://www.youtube.com/results?search_query=${artist}+-+${track}`}
                        >
                            <button className="content__play"></button>
                        </a>
                    </h2>
                    <div className="content__detail">
                        <div className="content__detail__header">아티스트</div>
                        {artist}
                    </div>
                    {trackInfo.album && (
                        <div className="content__detail">
                            <div className="content__detail__header">앨범</div>'
                            {trackInfo.album.title}'
                        </div>
                    )}
                    <div className="content__detail">
                        <div className="content__detail__header">재생 횟수</div>
                        {numConvertor(trackInfo.playcount)}회
                    </div>
                    <div className="content__detail">
                        <div className="content__detail__header">&#10084;</div>
                        {numConvertor(trackInfo.listeners)}명
                    </div>
                    {trackInfo.wiki && (
                        <p className="content__summary">
                            {trackInfo.wiki.summary[0] !== "<" &&
                            trackInfo.wiki.summary.length > 250
                                ? trackInfo.wiki.summary.slice(0, 250) + " ... "
                                : trackInfo.wiki.summary}

                            <span className="content__summary__a">
                                <a href={trackInfo.url}>더보기</a>
                            </span>
                        </p>
                    )}
                </>
            )}
        </>
    );
};

export default Track;
