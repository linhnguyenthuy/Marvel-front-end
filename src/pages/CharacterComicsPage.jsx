import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const CharacterComicsPage = () => {
  const { id } = useParams();
  const [comics, setComics] = useState([]);

  const addToCookies = (item) => {
    let comics = Cookies.get();
    if (!Array.isArray(comics)) {
      comics = [];
    }
    comics.push(JSON.stringify(item));
    const uniqueId = new Date().getTime();
    Cookies.set(`comics_${uniqueId}`, comics, { expires: 3 });
  };

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back-end--gt2tv4r7fx4n.code.run/characters/comics/${id}`
        );
        setComics(response.data.comics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComics();
  }, [id]);

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
        textAlign: `center`,
      }}
    >
      {comics.map((comic) => (
        <div key={comic._id}>
          {comic && comic.title && (
            <h2
              style={{
                width: `30vh`,
                marginTop: `5vh`,
                marginBottom: `3vh`,
                color: `white`,
                textAlign: `center`,
              }}
            >
              {comic.title}
            </h2>
          )}
          {comic &&
            comic.thumbnail &&
            comic.thumbnail.path &&
            comic.thumbnail.extension && (
              <div className="image-container">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
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
                    objectPosition: `left`,
                    borderRadius: `2vh`,
                  }}
                />
              </div>
            )}
          {comic && (
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
          )}
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <Link to={`/comic/${comic._id}`}>
              <button>See comic</button>
            </Link>
            <button onClick={() => addToCookies(comic)}>
              Add to Favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterComicsPage;
