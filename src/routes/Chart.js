import React, { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";

const Chart = () => {
    const [dataset, setDataset] = useState([]);
    const [limit, setLimit] = useState(20);
    const [country, setCountry] = useState("Korea,+Republic+of");
    const [page, setPage] = useState(1);
    const [option, setOption] = useState("track");
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [loading, setLoading] = useState(true);

    // 초기 차트 및 차트 불러오기
    useEffect(() => {
        const getChart = async () => {
            setLoading(true);
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=geo.gettop${option}s&country=${country}&limit=${limit}&page=${page}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();
            // 차트 데이터
            setDataset(
                option === "track" ? json.tracks.track : json.topartists.artist
            );
            // 차트 검색 결과 수
            setTotal(
                option === "track"
                    ? json.tracks["@attr"]["total"]
                    : json.topartists["@attr"]["total"]
            );
            // 차트 끝 페이지
            setLastPage(
                option === "track"
                    ? json.tracks["@attr"]["totalPages"]
                    : json.topartists["@attr"]["totalPages"]
            );
            setLoading(false);

            // track => json.tracks.track
            // artist => json.topartists.artist
        };

        getChart();
    }, [option, country, limit, page]);

    console.log(dataset);

    // 페이지 컨트롤러
    const onClickNext = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage((page) => page + 1);
    };
    const onClickBefore = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage((page) => page - 1);
    };
    const onClickFirst = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage(1);
    };
    const onClickLast = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage(lastPage);
    };

    return (
        <div>
            {loading ? (
                <h1>Now Loading...</h1>
            ) : (
                <>
                    <div>
                        {dataset.map((data, index) => (
                            <SearchResults
                                key={index}
                                track={option === "track" ? data.name : null}
                                artist={
                                    option === "track"
                                        ? data.artist.name
                                        : data.name
                                }
                                listeners={data}
                                rank={(page - 1) * limit + (index + 1)}
                                // imgUrl={data.image[0]["#text"]}
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

export default Chart;
