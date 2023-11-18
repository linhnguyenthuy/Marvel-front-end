import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [originalCharacters, setOriginalCharacters] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const addToCookies = (item) => {
    let characters = Cookies.get();
    if (!Array.isArray(characters)) {
      characters = [];
    }
    characters.push(JSON.stringify(item));
    const uniqueId = new Date().getTime();
    Cookies.set(`characters_${uniqueId}`, characters, { expires: 3 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      const filteredCharacters = originalCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredCharacters.length > 0) {
        setCharacters(filteredCharacters);
        setError(false);
      } else {
        setError(true);
        setErrorMessage("No character found with this name.");
      }
    } else {
      setError(true);
      setErrorMessage("Please enter a search term.");
    }
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back-end--gt2tv4r7fx4n.code.run/characters?page=${currentPage}&limit=100&offset=${
            (currentPage - 1) * 100
          }`
        );
        console.log("--->", response.data);
        console.log("->", response.data.results);
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const loadMoreCharacters = () => {
    setCharacters([]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: `60%`, margin: `0 auto`, marginTop: `` }}
      >
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            width: `80%`,
            height: `30px`,
            marginRight: `10px`,
            color: `darkgrey`,
          }}
          onClick={() => {
            setSearchTerm("");
            setError(false);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {errorMessage && (
        <p
          style={{
            color: `red`,
            marginTop: `10px`,
            display: `flex`,
            justifyContent: `center`,
          }}
        >
          {errorMessage}
        </p>
      )}
      <div
        style={{
          margin: "10vh 30vh",
          display: `flex`,
          flexWrap: `wrap`,
          gap: `3vh`,
          alignItems: `end`,
          overflow: "auto",
          height: "100vh",
        }}
      >
        {characters.map((character, index) => (
          <div key={`${character._id}-${index}`}>
            <div>
              <h2
                style={{
                  width: `30vh`,
                  marginBottom: `2vh`,
                  marginTop: `3vh`,
                  color: `white`,
                }}
              >
                {character.name}
              </h2>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{
                  width: `30vh`,
                  height: `40vh`,
                  objectFit: `cover`,
                  objectPosition: `left`,
                  borderRadius: `3vh`,
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
                {character.description
                  ? character.description
                  : "Simply amazing."}
              </p>
              <div style={{ display: `flex`, flexDirection: `column` }}>
                <Link to={`/characters/comics/${character._id}`}>
                  <button>See related comics</button>
                </Link>
                <button onClick={() => addToCookies(character)}>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={loadMoreCharacters}>Load more characters</button>
      </div>
    </div>
  );
};

export default CharactersPage;
