import React from "react";
import { Link } from "react-router-dom";
// import Proptypes from "proptypes";

const HomeChart = ({ rank, track, artist, imgSrc }) => {
    return (
        <div>
            <span>{rank}. </span>
            <Link to={`/${artist}/${track}`}>
                {/* <img src={imgSrc} alt={name} /> */}
                <span>{track}</span>
            </Link>
            <Link to={`/${artist}`}>
                <span>{artist}</span>
            </Link>
            <br />
        </div>
    );
};

export default HomeChart;
