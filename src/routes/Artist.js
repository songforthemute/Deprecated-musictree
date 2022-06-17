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
                    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.REACT_APP_KEY}&format=json`
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

    console.log(artistInfo);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <img
                        className="content__img"
                        src={artistInfo.image[2]["#text"]}
                        alt={artistInfo.name}
                    />
                    <h2 className="content__title">{artistInfo.name}</h2>
                    <div className="content__detail">
                        재생 횟수 | {numConvertor(artistInfo.stats.listeners)}
                    </div>
                    <div className="content__detail">
                        &#10084; {numConvertor(artistInfo.stats.playcount)}
                    </div>
                    <div className="content__detail">
                        Tag |
                        {artistInfo.tags.tag.map((t, index) => (
                            <span className="content__tag" key={index}>
                                {t.name}{" "}
                            </span>
                        ))}
                    </div>
                    <p className="content__summary">
                        {artistInfo.bio.summary.length > 200
                            ? artistInfo.bio.summary.slice(0, 200) + "... "
                            : artistInfo.bio.summary}
                        <span className="content__summary__extension">
                            <a href={artistInfo.bio.links.link.href}>더보기</a>
                        </span>
                    </p>
                </>
            )}
        </>
    );
};

export default Artist;
