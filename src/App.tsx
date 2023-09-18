import { useEffect, useState, useRef } from "react";

import classes from "./app.module.css";
import CaretRight from "./assets/arrow.svg";
import exit from "./assets/exit.svg";
import { useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import {
  QuerySnapshot,
  addDoc,
  collection,
  getFirestore,
  query,
} from "firebase/firestore";

import "firebase/firestore";

import { doc, setDoc, onSnapshot } from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDU2dTJm6tNuDYfWTpBbc8HYmIsDqu9bs",

  authDomain: "group-chat-7462d.firebaseapp.com",

  databaseURL: "https://group-chat-7462d-default-rtdb.firebaseio.com",

  projectId: "group-chat-7462d",

  storageBucket: "group-chat-7462d.appspot.com",

  messagingSenderId: "403490979981",

  appId: "1:403490979981:web:99852e4a0b71e729b4a2c4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function App() {
  const navigate = useNavigate();

  !localStorage.getItem("username") ? navigate("/identification") : null;

  const messageInput = useRef(null);

  const el = useRef(null);

  const q = query(collection(db, "messages"));

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      message: messageInput.current.value,
      user: localStorage.getItem("username"),
      createdAt: new Date(),
    });
    messageInput.current.value = "";
    el.current.scrollIntoView();
  };

  const [col] = useCollectionData(q);

  const messages = col;

  messages?.sort((a, b) => a.createdAt > b.createdAt);

  console.log("new data:", col);

  console.log("the data:", messages);

  onSnapshot(doc(db, "messages", "messages"), (doc) => {
    console.log("current data:", doc.data());
  });

  const exitHandler = () => {
    navigate("/identification");
    localStorage.removeItem("username");
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.upperDiv}>
          <h1>{localStorage.getItem("username")}</h1>
          <button onClick={exitHandler}>
            <img src={exit} alt="exit" />
          </button>
        </div>
        <div className={classes.textbox}>
          {messages &&
            messages.map((msg) => (
              <div
                className={`${classes.messageDiv} ${
                  localStorage.getItem("username") === msg.user
                    ? classes.sent
                    : classes.received
                }`}
              >
                <p className={classes.username}>{msg.user}</p>
                <p className={classes.message}>{msg.message}</p>
              </div>
            ))}
          <span ref={el}></span>
        </div>
        <form onSubmit={formSubmitHandler} action="" className={classes.form}>
          <input type="text" placeholder="message" ref={messageInput} />
          <button type="submit">
            <img src={CaretRight} alt="" />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
