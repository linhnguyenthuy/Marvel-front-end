import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = ({ token, handleToken }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 3%",
        gap: `3%`,
        marginTop: `20px`,
      }}
    >
      <Link to="/">
        <img
          src="https://res.cloudinary.com/lereacteur-apollo/image/upload/v1582097342/react-new-exercices/Marvel/langfr-1920px-MarvelLogo.svg_uw9pi8.png"
          alt=""
          style={{ width: `80px` }}
        />
      </Link>

      <span>
        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
            style={{
              height: `30px`,
              border: `1px solid #ed171e`,
              color: `#ed171e`,
              backgroundColor: `#fff`,
              borderRadius: `1.5vh`,
            }}
          >
            Sign Out
          </button>
        ) : (
          <div style={{ display: `flex` }}>
            <div>
              <Link to="/signup">
                <button
                  style={{
                    height: `30px`,
                    border: `1px solid #ed171e`,
                    color: `#ed171e`,
                    backgroundColor: `#fff`,
                    borderRadius: `1.5vh`,
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
            <div>
              <Link to="/login">
                <button
                  style={{
                    height: `30px`,
                    border: `1px solid #ed171e`,
                    color: `#ed171e`,
                    backgroundColor: `#fff`,
                    borderRadius: `1.5vh`,
                  }}
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </span>
      <div>
        <Link to="/characters">
          <button
            style={{
              height: `30px`,
              border: `1px solid #ed171e`,
              color: `#ed171e`,
              backgroundColor: `#fff`,
              borderRadius: `1.5vh`,
            }}
          >
            Characters
          </button>
        </Link>
      </div>

      <div>
        <Link to="/comics">
          <button
            style={{
              height: `30px`,
              border: `1px solid #ed171e`,
              color: `#ed171e`,
              backgroundColor: `#fff`,
              borderRadius: `1.5vh`,
            }}
          >
            Comics
          </button>
        </Link>
      </div>
      <Link to="/favorites">
        <button
          style={{
            height: `30px`,
            border: `1px solid #ed171e`,
            color: `#ed171e`,
            backgroundColor: `#fff`,
            borderRadius: `1.5vh`,
          }}
        >
          Favorites
        </button>
      </Link>
    </header>
  );
};
export default Header;
