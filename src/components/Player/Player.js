import React from 'react';
import ReactPlayer from 'react-player';

const Player = (props) => {
    return (
       <ReactPlayer url={props.urllink} playing controls width="70vw" height="90vh" onEnded={() => props.end() }/>
    );
};

export default Player;