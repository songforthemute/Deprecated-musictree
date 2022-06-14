import React from "react";
import Proptypes from "proptypes";
import { Link } from "react-router-dom";

const SearchResults = ({ track, artist, listeners, imgUrl, rank }) => {
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
            <p>{listeners}</p>
            {imgUrl && <img alt="cover" src={imgUrl} />}
            <br />
        </div>
    );
};

SearchResults.propTypes = {
    track: Proptypes.string,
    artist: Proptypes.string.isRequired,
    listeners: Proptypes.string.isRequired,
    url: Proptypes.string,
};

export default SearchResults;
