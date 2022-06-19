import React from "react";
import { Link } from "react-router-dom";
// import Proptypes from "proptypes";

const HomeChart = ({ rank, track, artist }) => {
    return (
        <div className="homeChart__row">
            <span className={rank <= 3 ? "homeChart__top3" : undefined}>
                {rank}.{" "}
            </span>
            <Link to={`/artist/${artist}/track/${track}`}>
                <span>{track}</span>
            </Link>
            {" - "}
            <Link to={`/aritst/${artist}`}>
                <span>{artist}</span>
            </Link>
            <br />
        </div>
    );
};

export default HomeChart;
