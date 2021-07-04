import React from 'react';

const NoResults = ({ terms }) => (

    (terms !== "") ? (<p>No results for , "{terms}"!</p>) : (<p></p>)
);

export default NoResults;