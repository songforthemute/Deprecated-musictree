import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import SearchResults from "../components/SearchResults";
import PageController from "../components/PageControllor";

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
                    `https://ws.audioscrobbler.com/2.0/?method=${inputs.option}.search&${inputs.option}=${inputs.keyword}&limit=${inputs.limit}&page=${page}&api_key=${process.env.REACT_APP_KEY}&format=json`
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

    return (
        <>
            <div className="chart__title">찾아보기</div>
            {/* 검색 폼 */}
            <div className="search__form">
                <form onSubmit={onSubmit}>
                    <div className="search__form__option">
                        <label className="search__form__label" htmlFor="option">
                            옵션
                        </label>
                        <select
                            name="option"
                            id="option"
                            onChange={onChangeBuffer}
                            value={buffer.option}
                        >
                            <option key="none" value="none">
                                검색 옵션
                            </option>
                            <option key="track" value="track">
                                트랙명
                            </option>
                            <option key="artist" value="artist">
                                아티스트명
                            </option>
                        </select>
                        <label
                            className="search__form__label search__form__label2"
                            htmlFor="renderCount"
                        >
                            보기
                        </label>
                        <select
                            id="renderCount"
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
                    </div>
                    <div className="search__input">
                        <input
                            className="search__keyword"
                            type="text"
                            name="keyword"
                            value={buffer.keyword}
                            onChange={onChangeBuffer}
                            placeholder="검색어를 입력해주세요."
                        />
                        <input
                            className="search__btn"
                            type="submit"
                            value="&#128269;"
                        />
                    </div>
                </form>
            </div>
            {/* 로딩 */}
            {loading ? (
                inputs.option !== "none" && inputs.keyword.length ? (
                    <Loading /> // 검색로딩
                ) : (
                    <div className="search__before">검색해주세요.</div> // 키워드만 입력시 로딩
                )
            ) : (
                <>
                    {/* 검색 결과 */}
                    <div className="search__body">
                        {/* 간혹 서치인포의 데이터셋이 리미트 이상으로 저장되는 경우 초과렌더 방지 */}
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
                                          idxlabel={index}
                                      />
                                  ))
                            : searchInfo.map((info, index) => (
                                  <SearchResults
                                      key={index}
                                      artist={info.artist || info.name}
                                      track={info.name}
                                      imgUrl={null}
                                      rank={null}
                                      idxlabel={index}
                                  />
                              ))}
                    </div>
                    {/* 하단 네비게이터 */}
                    <PageController
                        page={page}
                        setPage={setPage}
                        lastPage={meta.lastPage}
                    />
                </>
            )}
        </>
    );
};

export default Search;
