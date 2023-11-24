import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ComicsPage = () => {
  const [comic, setComic] = useState(null);
  // const [originalComic, setOriginalComic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const addToCookies = (item) => {
    let comics = Cookies.get();
    if (!Array.isArray(comics)) {
      comics = [];
    }
    comics.push(JSON.stringify(item));

    Cookies.set(`comics_${comic._id}`, comics, { expires: 3 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");
    if (searchTerm) {
      try {
        const response = await axios.get(
          `https://site--marvel-back-end--gt2tv4r7fx4n.code.run/comics?search=${searchTerm}`
        );
        if (response.data.results.length > 0) {
          setComic(response.data.results);
          setError(false);
        } else {
          setError(true);
          setErrorMessage("No comics found with this name.");
        }
      } catch (error) {
        console.error("Error fetching comics: ", error);
        setError(true);
        setErrorMessage("An error occurred while searching for comics.");
      }
    } else {
      setError(true);
      setErrorMessage("Please enter a search term.");
    }
    setSearchTerm("");
  };
  //   if (searchTerm) {
  //     const filteredComics = originalComic.filter((comic) =>
  //       comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     if (filteredComics.length > 0) {
  //       setComic(filteredComics);
  //       setError(false);
  //     } else {
  //       setError(true);
  //       setErrorMessage("No comic found with this name.");
  //     }
  //   } else {
  //     setError(true);
  //     setErrorMessage("Please enter a search term.");
  //   }
  // };

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back-end--gt2tv4r7fx4n.code.run/comics?page=${currentPage}`
        );
        // console.log("->", response.data);
        setComic(response.data.results);
        // setOriginalComic(response.data.results);
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          console.error("Network error: ", error);
        } else {
          console.error("Error fetching comic: ", error);
        }
      }
    };

    fetchComic();
  }, [currentPage]);

  const loadMoreComics = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (!comic) {
    return <div>Loading...</div>;
  }

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
      <div>
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: `3vh`,
            alignItems: `end`,
            marginTop: `10vh`,
            overflow: `auto`,
            height: "70vh",
            margin: `10vh 20vh`,
          }}
        >
          {comic.map((comic, index) => (
            <div key={index}>
              <div className="box">
                <h2
                  style={{
                    width: `30vh`,
                    marginTop: `3vh`,
                    marginBottom: `2vh`,
                    color: `white`,
                  }}
                >
                  {comic.title}
                </h2>

                <img
                  src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
                  alt="Comic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                  }}
                  style={{
                    width: `25vh`,
                    height: `30vh`,
                    objectFit: `cover`,
                    objectPosition: `left`,
                    borderRadius: `2vh`,
                    boxShadow: `0 0 10px #ed171e, 0 0 10px #ed171e`,
                    marginLeft: `2vh`,
                    marginBottom: `2vh`,
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
              </div>
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
        <div className="load">
          <button
            onClick={loadMoreComics}
            style={{
              backgroundColor: `#ed171e`,
              color: `white`,
              width: `25vh`,
              height: `5vh`,
              borderRadius: `1vh`,
            }}
          >
            Load more comics
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicsPage;
