import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";

const Artist = () => {
    const { artist } = useParams();
    const [loading, setLoading] = useState(true);
    const [artistInfo, setArtistInfo] = useState([]);

    useEffect(() => {
        const getArtist = async () => {
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();
            setArtistInfo(json);
            setLoading(false);
        };

        getArtist();
    }, [artist]);

    console.log(artistInfo);

    return (
        <div>
            {loading ? (
                <h1>Now Loading...</h1>
            ) : (
                <div>
                    <img
                        src={artistInfo.artist.image[2]["#text"]}
                        alt={artistInfo.artist.name}
                    />
                    <h2>{artistInfo.artist.name}</h2>
                    <h5>Listeners : {artistInfo.artist.stats.listeners}</h5>
                    <h5>Play Count : {artistInfo.artist.stats.playcount}</h5>
                    <h5>
                        Tag :
                        {artistInfo.artist.tags.tag.map((t) => (
                            <span key={shortid.generate()}>{t.name} </span>
                        ))}
                    </h5>
                    <p>
                        {artistInfo.artist.bio.summary.length > 250
                            ? artistInfo.artist.bio.summary.slice(0, 250) +
                              "..."
                            : artistInfo.artist.bio.summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Artist;
