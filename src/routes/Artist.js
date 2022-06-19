import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Artist = () => {
    const { artist } = useParams();
    const [loading, setLoading] = useState(true);
    const [artistInfo, setArtistInfo] = useState([]);

    useEffect(() => {
        const getArtistInfo = async () => {
            const json = await (
                await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();

            setArtistInfo(json.artist);
            setLoading(false);
        };

        getArtistInfo();
    }, [artist]);

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
                    <div className="content__img">
                        <img
                            src={artistInfo.image[2]["#text"]}
                            alt={artistInfo.name}
                        />
                    </div>
                    <h2 className="content__title">
                        {artistInfo.name}{" "}
                        <a
                            href={`https://www.youtube.com/results?search_query=${artist}`}
                        >
                            <button className="content__play"></button>
                        </a>
                    </h2>
                    <p className="content__summary">
                        {artistInfo.bio.summary.length > 250
                            ? artistInfo.bio.summary.slice(0, 250) + " ... "
                            : artistInfo.bio.summary}
                        <span className="content__summary__a">
                            <a href={artistInfo.bio.links.link.href}>더보기</a>
                        </span>
                    </p>
                    <div className="content__detail">
                        <div className="content__detail__header">재생 횟수</div>
                        {numConvertor(artistInfo.stats.listeners)}회
                    </div>
                    <div className="content__detail">
                        <div className="content__detail__header">&#10084;</div>
                        {numConvertor(artistInfo.stats.playcount)}명
                    </div>
                    <div className="content__detail">
                        <div className="content__detail__header">태그</div>
                        {artistInfo.tags.tag.map((t, index) => (
                            <span className="content__tag" key={index}>
                                {t.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Artist;
