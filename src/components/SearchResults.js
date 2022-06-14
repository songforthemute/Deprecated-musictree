import React from "react";
import Proptypes from "proptypes";
import { Link } from "react-router-dom";

const SearchResults = ({ track, artist, imgUrl, rank }) => {
    return (
        <div>
            <span>{rank}. </span>
            {track !== artist && (
                <>
                    <Link to={`/${artist}/${track}`}>
                        <span>{track}</span>
                    </Link>
                    <span> - </span>
                </>
            )}
            <Link to={`/${artist}`}>
                <span>{artist}</span>
            </Link>
            {imgUrl && <img alt="cover" src={imgUrl} />}
            <hr />
            <br />
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
