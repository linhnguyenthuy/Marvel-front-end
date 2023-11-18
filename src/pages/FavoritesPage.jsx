import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({ characters: [], comics: [] });

  useEffect(() => {
    const fetchFavorites = () => {
      const allCookies = Cookies.get();
      const characters = Object.keys(allCookies)
        .filter((key) => key.startsWith("characters_"))
        .map((key) => JSON.parse(allCookies[key]));
      const comics = Object.keys(allCookies)
        .filter((key) => key.startsWith("comics_"))
        .map((key) => JSON.parse(allCookies[key]));
      setFavorites({ characters, comics });
    };

    fetchFavorites();
  }, []);
  // console.log("--->", `comics_${comic._id}`);

  if (favorites.characters.length === 0 && favorites.comics.length === 0) {
    return <div style={{ color: `white` }}>No favorites yet</div>;
  }

  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        gap: `3vh`,
        alignItems: `end`,
        marginTop: `10vh`,
        overflow: `auto`,
        height: "70vh",
        margin: `10vh 30vh`,
      }}
    >
      {favorites.characters.map((character, index) => (
        <div key={index}>
          <h2
            style={{
              width: `30vh`,
              marginTop: `5vh`,
              marginBottom: `3vh`,
              color: `white`,
            }}
          >
            {character.name}
          </h2>
          <img
            src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
            alt="Comic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
            }}
            style={{
              width: `30vh`,
              height: `40vh`,
              objectFit: `cover`,
              objectPosition: `center`,
              borderTopLeftRadius: `2vh`,
              borderBottomLeftRadius: `2vh`,
            }}
          />
          <p
            style={{
              width: `30vh`,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
              color: `white`,
            }}
          >
            {character.description ? character.description : "Simply amazing."}
          </p>
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <Link to={`/characters/comics/${character._id}`}>
              <button>See related comics</button>
            </Link>
            <button
              onClick={() => {
                Cookies.remove(`comics_${comic._id}`);
                setFavorites((prevState) => ({
                  ...prevState,
                  comics: prevState.comics.filter(
                    (item) => item._id !== comic._id
                  ),
                }));
              }}
            >
              Delete from Favorite
            </button>
          </div>
        </div>
      ))}
      {favorites.comics.map((comic, index) => (
        <div key={index}>
          <h2
            style={{
              width: `30vh`,
              marginTop: `5vh`,
              marginBottom: `3vh`,
              color: `white`,
            }}
          >
            {comic.title}
          </h2>
          <img
            src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
            }}
            style={{
              width: `30vh`,
              height: `40vh`,
              objectFit: `cover`,
              objectPosition: `center`,
              borderTopLeftRadius: `2vh`,
              borderBottomLeftRadius: `2vh`,
            }}
          />
          <p
            style={{
              width: `30vh`,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
              color: `white`,
            }}
          >
            {comic.description ? comic.description : "Simply amazing."}
          </p>
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <Link to={`/comic/${comic._id}`}>
              <button>See comic</button>
            </Link>
            <button
              onClick={() => {
                Cookies.remove(`comics_${comic._id}`);
              }}
            >
              Delete from Favorite
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
