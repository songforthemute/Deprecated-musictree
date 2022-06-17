import React, { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";
import Loading from "../components/Loading";

const Chart = () => {
    const [dataset, setDataset] = useState([]);
    const [page, setPage] = useState(1);
    const [country, setCountry] = useState("Korea,+Republic+of");
    const [option, setOption] = useState("track");
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({
        lastPage: 1,
        total: 0,
    });

    // 초기 차트 및 차트 불러오기
    useEffect(() => {
        const getChart = async () => {
            setLoading(true);
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=geo.gettop${option}s&country=${country}&limit=20&page=${page}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();
            // 차트 데이터
            setDataset(json?.tracks?.track ?? json.topartists.artist);
            // 차트 검색셜과 & 끝 페이지
            setMeta(
                option === "track"
                    ? {
                          total: json.tracks["@attr"]["total"],
                          lastPage: json.tracks["@attr"]["totalPages"],
                      }
                    : {
                          total: json.topartists["@attr"]["total"],
                          lastPage: json.topartists["@attr"]["totalPages"],
                      }
            );
            setLoading(false);
        };

        getChart();
    }, [option, country, page]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
        setPage(1);
    };

    const onChangeOption = (e) => {
        setOption(e.target.value);
        setPage(1);
    };

    // 페이지 컨트롤러
    const onClickNext = () => {
        if (page === meta.lastPage) {
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
        if (page === meta.lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage(meta.lastPage);
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        <label htmlFor="option">검색</label>
                        <select
                            name="option"
                            id="option"
                            onChange={onChangeOption}
                            value={option}
                        >
                            <option key="track" value="track">
                                트랙명
                            </option>
                            <option key="artist" value="artist">
                                아티스트명
                            </option>
                        </select>
                        <label htmlFor="country">국가</label>
                        <select
                            name="country"
                            id="country"
                            onChange={onChangeCountry}
                            value={country}
                        >
                            <option
                                key="Korea,+Republic+of"
                                value="Korea,+Republic+of"
                            >
                                한국
                            </option>
                            <option key="United+States" value="United+States">
                                미국
                            </option>
                            <option key="United+Kingdom" value="United+Kingdom">
                                영국
                            </option>
                            <option key="japan" value="japan">
                                일본
                            </option>
                            <option key="spain" value="spain">
                                스페인
                            </option>
                        </select>
                    </div>
                    <div>
                        {dataset.map((data, index) => (
                            <SearchResults
                                key={index}
                                track={data?.name ?? null}
                                artist={data?.artist?.name ?? data.name}
                                listeners={data}
                                rank={(page - 1) * 20 + (index + 1)}
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
                                    {page} / {meta.lastPage}
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
        </>
    );
};

export default Chart;
