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

          fontFamily: "Kdam Thmor Pro, sans-serif",
          fontSize: `3vh`,
          //   position: "absolute",
          //   top: "30%",
          //   left: "50%",
          //   transform: "translate(-50%, -50%)",
          //   zIndex: 1,
        }}
      >
        Choose the Characters or Comics
      </h1>
      <img
        src="../img/4826101.jpg"
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
