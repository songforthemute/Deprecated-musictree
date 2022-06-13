import React, { useState } from "react";
import SearchResults from "../components/SearchResults";

const Search = () => {
    const [searchInfo, setSearchInfo] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [option, setOption] = useState("artist");

    // 검색 폼 제출시 ajax 요청
    const getSearch = async () => {
        const json = await (
            await fetch(
                `http://ws.audioscrobbler.com/2.0/?method=${option}.search&${option}=${keyword}&limit=20&api_key=${process.env.REACT_APP_KEY}&format=json`
            )
        ).json();

        switch (option) {
            case "artist":
                setSearchInfo(json.results.artistmatches.artist);
                console.log(json.results.artistmatches.artist);
                break;
            case "track":
                setSearchInfo(json.results.trackmatches.track);
                console.log(json.results.trackmatches.track);
                break;
            case "album":
                setSearchInfo(json.results.albummatches.album);
                console.log(json.results.albummatches.album);
                break;
            default:
        }
    };

    // 검색 폼 제출
    const onSubmit = (e) => {
        e.preventDefault();
        getSearch();
    };

    // select - option event
    const onChangeSelect = (e) => setOption(e.target.value);

    // input(keyword)
    const onChangeInput = (e) => setKeyword(e.target.value);

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="searchOption">검색</label>
                    <select
                        name="searchOption"
                        id="searchOption"
                        onChange={onChangeSelect}
                        value={option}
                    >
                        <option value="artist">Artist</option>
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                    </select>
                    <input
                        type="text"
                        name="keyword"
                        value={keyword}
                        onChange={onChangeInput}
                        placeholder="검색어를 입력해주세요."
                    />
                    <input type="submit" value="&#128269;" />
                </form>
            </div>

            <div>
                {searchInfo.map((info, index) => (
                    <SearchResults
                        key={index}
                        artist={info.artist || info.name}
                        track={info.name}
                        listeners={info.listeners}
                        url={null}
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
