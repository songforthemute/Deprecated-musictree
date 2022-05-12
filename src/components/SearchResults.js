import React from "react";
import Proptypes from "proptypes";
import { Link } from "react-router-dom";

const SearchResults = ({ name, artist, listeners, url }) => {
    return (
        <div>
            <Link to={`/${artist}/${name}`}>
                <h2>{name}</h2>
            </Link>
            <Link to={`/${artist}`}>
                <h4>{artist}</h4>
            </Link>
            <p>{listeners}</p>
            <h6>{url}</h6>
            <br />
        </div>
    );
};

SearchResults.propTypes = {
    name: Proptypes.string.isRequired,
    artist: Proptypes.string.isRequired,
    listeners: Proptypes.string.isRequired,
    url: Proptypes.string.isRequired,
};

export default SearchResults;
