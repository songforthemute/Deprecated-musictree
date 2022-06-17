import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SearchResults from "../components/SearchResults";

// useEffect를 사용해보자. - useEffect는 디펜던시가 업데이트될때만 렌더를 도와준다.
const Search = () => {
    const [loading, setLoading] = useState(true);
    const [searchInfo, setSearchInfo] = useState([]);
    const [page, setPage] = useState(1);
    const [buffer, setBuffer] = useState({
        keyword: "",
        limit: "10",
        option: "none",
    });
    const [inputs, setInputs] = useState({
        keyword: "",
        limit: "10",
        option: "none",
    });
    const [meta, setMeta] = useState({
        lastPage: 1,
        total: 0,
    });

    useEffect(() => {
        // 검색 폼 제출시 ajax 요청
        const getSearch = async () => {
            setLoading(true);
            const json = await (
                await fetch(
                    `http://ws.audioscrobbler.com/2.0/?method=${inputs.option}.search&${inputs.option}=${inputs.keyword}&limit=${inputs.limit}&page=${page}&api_key=${process.env.REACT_APP_KEY}&format=json`
                )
            ).json();

            setSearchInfo(
                inputs.option === "artist"
                    ? json.results.artistmatches.artist
                    : json.results.trackmatches.track
            );

            // 토탈 검색 결과수 & 마지막 페이지 계산
            setMeta({
                total: json.results["opensearch:totalResults"],
                lastPage: Math.ceil(
                    json.results["opensearch:totalResults"] / inputs.limit
                ),
            });

            setLoading(false);
            console.log("현재 페이지: ", page);
            console.log("현재 검색단위수: ", inputs.limit);
        };

        if (inputs.keyword !== "" && inputs.option !== "none") getSearch();
    }, [inputs, page]);

    // 검색 폼 제출
    const onSubmit = (e) => {
        e.preventDefault();
        if (page !== 1) setPage(1);
        setInputs(buffer);
    };

    // select - option & limit & keyword
    const onChangeBuffer = (e) => {
        const { name, value } = e.target;
        setBuffer({ ...buffer, [name]: value });
    };

    // 페이지 컨트롤러
    const onClickNext = () => {
        if (page === meta.lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage(page + 1);
    };
    const onClickBefore = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage(page - 1);
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
        <div>
            {/* 검색 폼 */}
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="option">검색</label>
                    <select
                        name="option"
                        id="option"
                        onChange={onChangeBuffer}
                        value={buffer.option}
                    >
                        <option key="none" value="none">
                            - 검색 옵션 -
                        </option>
                        <option key="track" value="track">
                            트랙명
                        </option>
                        <option key="artist" value="artist">
                            아티스트명
                        </option>
                    </select>
                    <select
                        name="limit"
                        onChange={onChangeBuffer}
                        value={buffer.limit}
                    >
                        <option key="10" value="10">
                            10개씩 보기
                        </option>
                        <option key="15" value="15">
                            15개씩 보기
                        </option>
                        <option key="20" value="20">
                            20개씩 보기
                        </option>
                        <option key="25" value="25">
                            25개씩 보기
                        </option>
                        <option key="30" value="30">
                            30개씩 보기
                        </option>
                    </select>
                    <input
                        type="text"
                        name="keyword"
                        value={buffer.keyword}
                        onChange={onChangeBuffer}
                        placeholder="검색어를 입력해주세요."
                    />
                    <input type="submit" value="&#128269;" />
                </form>
            </div>
            {loading ? (
                inputs.option !== "none" && inputs.keyword.length ? (
                    <Loading />
                ) : (
                    <div>검색해주세요.</div>
                )
            ) : (
                <>
                    {/* 검색 결과 */}
                    <div>
                        {searchInfo.length > inputs.limit
                            ? searchInfo
                                  .slice(searchInfo.length - inputs.limit)
                                  .map((info, index) => (
                                      <SearchResults
                                          key={index}
                                          artist={info.artist || info.name}
                                          track={info.name}
                                          imgUrl={null}
                                          rank={null}
                                      />
                                  ))
                            : searchInfo.map((info, index) => (
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
        </div>
    );
};

export default Search;
