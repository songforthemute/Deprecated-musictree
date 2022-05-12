import React, { useEffect, useState } from "react";
import shortid from "shortid";
import SearchResults from "../components/SearchResults";

const KEY = process.env.REACT_APP_KEY;

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    // fetch data

    useEffect(() => {
        const getInfo = async () => {
            const json = await (
                await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=track.search&page=1&limit=25&track=Believe&api_key=${KEY}&format=json`
                )
            ).json();
            setResults(json.results.trackmatches.track);
            setLoading(false);
        };

        getInfo();
    }, []);

    const searchList = results.map((item) => {
        return (
            <SearchResults
                key={shortid.generate()}
                name={item.name}
                artist={item.artist}
                listeners={item.listeners}
                url={item.url}
            />
        );
    });

    return <div>{loading ? <h1>Now Loading...</h1> : searchList}</div>;
};

export default Home;
