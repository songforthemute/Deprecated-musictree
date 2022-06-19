import React from "react";
import Proptypes from "proptypes";
import { Link } from "react-router-dom";

const SearchResults = ({ track, artist, imgUrl, rank, idxlabel }) => {
    return (
        <div className={idxlabel % 2 !== 0 ? "result result__even" : "result"}>
            {rank && (
                <span className={rank <= 3 ? "homeChart__top3" : undefined}>
                    {rank}.{" "}
                </span>
            )}
            {track !== artist && (
                <>
                    <Link to={`/artist/${artist}/track/${track}`}>
                        <span>{track}</span>
                    </Link>
                    <span> - </span>
                </>
            )}
            <Link to={`/artist/${artist}`}>
                <span>{artist}</span>
            </Link>
            {imgUrl && <img alt="cover" src={imgUrl} />}
        </div>
    );
};

SearchResults.propTypes = {
    track: Proptypes.string,
    artist: Proptypes.string.isRequired,
    imgUrl: Proptypes.string,
    rank: Proptypes.number,
};

export default SearchResults;
