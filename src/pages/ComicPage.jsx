import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ComicPage() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back-end--gt2tv4r7fx4n.code.run/comic/${id}`
        );
        setComic(response.data);
      } catch (error) {
        console.error("Error fetching comic: ", error);
      }
    };

    fetchComic();
  }, [id]);

  if (!comic) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: `flex`,
          gap: `70px`,
          margin: "10vh 20vh 10vh 20vh",
          textAlign: `justify`,
          alignItems: `center`,
        }}
      >
        <div className="imagecomic">
          <img
            src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
            alt={comic.title}
            style={{
              width: `50vh`,

              objectFit: `cover`,
              objectPosition: `left`,
              borderRadius: `2vh`,
            }}
          />
        </div>
        <div className="boxcomic">
          <h2
            style={{
              marginBottom: `5vh`,
              color: `whitesmoke`,
              marginTop: `5vh`,
            }}
          >
            {comic.title}
          </h2>
          <p style={{ color: `whitesmoke`, width: `60vh` }}>
            {comic.description}
          </p>
        </div>
      </div>
      <div className="back">
        <Link to="/comics">
          <button
            style={{
              height: `5vh`,
              border: `1px solid #ed171e`,
              color: `#ed171e`,
              backgroundColor: `#fff`,
              borderRadius: `1.5vh`,
              textAlign: `center`,
              marginTop: 0,
            }}
          >
            Back to the Comics
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ComicPage;
