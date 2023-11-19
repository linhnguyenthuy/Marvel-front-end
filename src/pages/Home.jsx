import React, { useEffect, useState } from "react";

function Home() {
  return (
    <div
      style={{ display: `flex`, flexDirection: `column`, alignItems: `center` }}
    >
      <h1
        style={{
          color: `#ed171e`,
          display: `flex`,
          marginTop: `3vh`,
        }}
      >
        Please choose the Characters or Comics
      </h1>
      <img
        src="https://media.tenor.com/173j3PxEIp8AAAAC/marvel-intro.gif"
        alt=""
        style={{
          width: `80%`,
          height: `80vh`,
          objectFit: `cover`,
          objectPosition: `center`,
          marginTop: `5vh`,
          opacity: `80%`,
          borderRadius: `2vh`,
          marginBottom: `5vh`,
          boxShadow: `0em 0 4em cornflowerblue`,
        }}
      />
    </div>
  );
}

export default Home;
