import React from "react";
import Proptypes from "proptypes";
import { Link } from "react-router-dom";

const SearchResults = ({ track, artist, listeners, url }) => {
    return (
        <div>
            {track !== artist && (
                <Link to={`/${artist}/${track}`}>
                    <h3>{track}</h3>
                </Link>
            )}
            <Link to={`/${artist}`}>
                <h3>{artist}</h3>
            </Link>
            <p>{listeners}</p>
            <h6>{url}</h6>
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
