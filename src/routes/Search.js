import React, { useState, useEffect } from "react";

const Search = () => {
    const [searchInfo, setSearchInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    setLoading(false);
    return <div>{loading ? <h1>Now loading...</h1> : <div></div>}</div>;
};

export default Search;
