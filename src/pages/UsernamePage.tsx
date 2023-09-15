import { useNavigate } from "react-router-dom";
import classes from "./UsernamePage.module.css";
import { useState } from "react";

const UsernamePage = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/");
  };

  return (
    <>
      <form className={classes.form} action="" onSubmit={formSubmitHandler}>
        <label htmlFor="username">Select your username</label>
        <input
          type="text"
          required
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button>Proceed</button>
      </form>
    </>
  );
};

export default UsernamePage;
