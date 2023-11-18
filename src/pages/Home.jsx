import React, { useEffect, useState } from "react";

function Home() {
  return (
    <div
      style={{ display: `flex`, flexDirection: `column`, alignItems: `center` }}
    >
      {/* <h1
        style={{
          color: `#ed171e`,
          display: `flex`,
          marginTop: `10vh`,

          fontFamily: "Kdam Thmor Pro, sans-serif",
          fontSize: `10vh`,
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)", //
          zIndex: 1,
        }}
      >
        Welcome to Marvel Comic
      </h1> */}
      <img
        src="https://media.tenor.com/173j3PxEIp8AAAAC/marvel-intro.gif"
        alt=""
        style={{
          width: `100%`,
          height: `80vh`,
          objectFit: `cover`,
          objectPosition: `center`,
          marginTop: `5vh`,
          opacity: `70%`,
          position: "relative",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Home;