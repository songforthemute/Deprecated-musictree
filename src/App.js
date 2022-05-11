import React, { useEffect, useState } from "react";
import shortid from "shortid";

const KEY = process.env.REACT_APP_SECRET_KEY;

function App() {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState([]);

    // fetch data
    const getInfo = async () => {
        const json = await (
            await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=${KEY}&format=json`
            )
        ).json();

        setInfo(json.results.trackmatches.track);
        setLoading(false);
    };

    useEffect(() => {
        getInfo();
    }, []);
    console.log(info);

    const list = info.map((i) => {
        return (
            <div key={shortid.generate()}>
                <h3>Title: {i.name}</h3>
                <h5>Artist: {i.artist}</h5>
                <h6>URL: {i.url}</h6>
                <br />
            </div>
        );
    });

    return <div>{loading ? <h1>Now Loading...</h1> : list}</div>;
}

export default App;
