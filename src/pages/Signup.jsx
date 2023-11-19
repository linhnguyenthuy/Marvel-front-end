import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newletter, setNewletter] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newletter: newletter,
        }
      );
      // Cookies.set("token", response.data.token, { expires: 15 });
      handleToken(response.data.token);
      navigate("/");

      console.log(response.data);
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Il faut remplir tous les informations");
      } else if (
        error.response.data.message === "This email already has an account"
      ) {
        setErrorMessage("L'email a dejà lié a un autre compte");
      } else {
        console.log(error.response.data.message);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: `column`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: `30px`,
          marginTop: `20px`,
          marginBottom: `20px`,
          color: `#ed171e`,
          fontWeight: `bold`,
        }}
      >
        Sign Up
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => {
              setUsename(event.target.value);
            }}
            style={{
              marginTop: `10px`,
              marginBottom: `10px`,
            }}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            style={{
              marginTop: `10px`,
              marginBottom: `10px`,
            }}
          />
          <input
            type="password"
            placeholder="abcABC"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            style={{
              marginTop: `10px`,
              marginBottom: `10px`,
            }}
          />
          <div style={{ display: `flex`, alignItems: `center` }}>
            <input
              type="checkbox"
              checked={newletter}
              onChange={() => {
                setNewletter(!newletter);
              }}
              style={{
                marginTop: `10px`,
                marginBottom: `10px`,
              }}
            />
            <label style={{ color: `white` }}>
              Please suscribe to our newsletter !
            </label>
          </div>
          <p1 style={{ width: `35%`, color: `#b4b4b4`, fontSize: `70%` }}>
            By signing up, I confirm that I have read and accepted Marvel's
            Terms & Conditions and Privacy Policy. I confirm that I am at least
            18 years old.
          </p1>
          <input
            type="submit"
            value={"Sign Up"}
            style={{
              marginTop: `10px`,
              marginBottom: `10px`,
              color: `white`,
              backgroundColor: `#ed171e`,
              width: `25vh`,
              height: `6vh`,
              justifyContent: `center`,
              borderRadius: `1vh`,
            }}
          />
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

        <Link
          to="/login"
          style={{
            marginTop: `10px`,
            display: `flex`,
            justifyContent: `center`,
            color: `#ed171e`,
          }}
        >
          Already have an account? Sign In.
        </Link>
      </div>
    </div>
  );
};
export default Signup;
