import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import CharactersPage from "./pages/CharactersPage.jsx";
import ComicPage from "./pages/ComicPage";
import CharacterComicsPage from "./pages/CharacterComicsPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Header from "./component/Header.jsx";
import ComicsPage from "./pages/ComicsPage.jsx";
import Signup from "./pages/Signup.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (newToken) => {
    if (newToken) {
      Cookies.set("token", newToken, { expires: 3 });
      setToken(newToken);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<ComicsPage />} />
        <Route path="/comic/:id" element={<ComicPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route
          path="/characters/comics/:id"
          element={<CharacterComicsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
