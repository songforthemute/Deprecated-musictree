import React from "react";
import { useParams } from "react-router-dom";

const Track = () => {
    const param = useParams();
    console.log(param);
    return <h2>Track</h2>;
};

export default Track;
