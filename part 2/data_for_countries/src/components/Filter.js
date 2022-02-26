import React from "react";

const Filter = ({currentQuery, handleQueryChange}) =>
    <div>
        filter countries <input value={currentQuery} onChange={handleQueryChange} />
    </div>

export default Filter