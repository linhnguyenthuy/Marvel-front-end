import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      <h1>{comic.title}</h1>
      <img
        src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <p>{comic.description}</p>
    </div>
  );
}
export default ComicPage;
