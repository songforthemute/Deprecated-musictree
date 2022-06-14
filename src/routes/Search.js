import React, { useState } from "react";
import SearchResults from "../components/SearchResults";

const Search = () => {
    const [searchInfo, setSearchInfo] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [option, setOption] = useState("artist");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [loading, setLoading] = useState(true);

    // 검색 폼 제출시 ajax 요청
    const getSearch = async () => {
        setLoading(true);
        const json = await (
            await fetch(
                `http://ws.audioscrobbler.com/2.0/?method=${option}.search&${option}=${keyword}&limit=${limit}&page=${page}&api_key=${process.env.REACT_APP_KEY}&format=json`
            )
        ).json();

        setSearchInfo(
            option === "artist"
                ? json.results.artistmatches.artist
                : json.results.trackmatches.track
        );

        // 토탈 검색 결과수 & 마지막 페이지 계산
        setTotal(json.results["opensearch:totalResults"]);
        setLastPage(Math.ceil(json.results["opensearch:totalResults"] / limit));
        console.log("검색시작위치: ", json.results["opensearch:startIndex"]);
        setLoading(false);
        console.log("현재 페이지: ", page);
        console.log("현재 검색단위수: ", limit);
    };

    // 검색 폼 제출
    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getSearch();
    };

    // select - option event
    const onChangeOption = (e) => setOption(e.target.value);
    const onChangeLimit = (e) => setLimit(Number(e.target.value));

    // input(keyword)
    const onChangeInput = (e) => setKeyword(e.target.value);

    // 페이지 컨트롤러
    const onClickNext = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage((page) => page + 1);
        getSearch();
    };
    const onClickBefore = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage((page) => page - 1);
        getSearch();
    };
    const onClickFirst = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage(1);
        getSearch();
    };
    const onClickLast = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage(lastPage);
        getSearch();
    };

    return (
        <div>
            {/* 검색 폼 */}
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="searchOption">검색</label>
                    <select
                        name="searchOption"
                        id="searchOption"
                        onChange={onChangeOption}
                        value={option}
                    >
                        <option value="artist">Artist</option>
                        <option value="track">Track</option>
                        {/* <option value="album">Album</option> */}
                    </select>
                    <select
                        name="searchCount"
                        onChange={onChangeLimit}
                        value={Number(limit)}
                    >
                        <option value="10">10개씩 보기</option>
                        <option value="15">15개씩 보기</option>
                        <option value="20">20개씩 보기</option>
                        <option value="25">25개씩 보기</option>
                        <option value="30">30개씩 보기</option>
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
            {loading ? (
                <h1>{keyword.length ? "Now Loading..." : ""}</h1>
            ) : (
                <>
                    {/* 검색 결과 */}
                    <div>
                        {searchInfo.map((info, index) => (
                            <SearchResults
                                key={index}
                                artist={info.artist || info.name}
                                track={info.name}
                                imgUrl={null}
                                rank={null}
                            />
                        ))}
                    </div>
                    {/* 하단 네비게이터 */}
                    <nav>
                        <ul style={{ display: "flex" }}>
                            <li onClick={onClickFirst}>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_left
                                </span>
                            </li>
                            <li onClick={onClickBefore}>
                                <span className="material-symbols-outlined">
                                    navigate_before
                                </span>
                            </li>
                            <li>
                                <span>
                                    {page} / {lastPage}
                                </span>
                            </li>
                            <li onClick={onClickNext}>
                                <span className="material-symbols-outlined">
                                    navigate_next
                                </span>
                            </li>
                            <li onClick={onClickLast}>
                                <span className="material-symbols-outlined">
                                    keyboard_double_arrow_right
                                </span>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default Search;
