import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, child, get } from "firebase/database";
import classes from "./app.module.css";
import CaretRight from "./assets/arrow.svg";
import exit from "./assets/exit.svg";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDDU2dTJm6tNuDYfWTpBbc8HYmIsDqu9bs",
  authDomain: "group-chat-7462d.firebaseapp.com",
  projectId: "group-chat-7462d",
  storageBucket: "group-chat-7462d.appspot.com",
  messagingSenderId: "403490979981",
  appId: "1:403490979981:web:99852e4a0b71e729b4a2c4",
  databaseURL: "https://group-chat-7462d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(database);

let data: Message[];

interface Message {
  message: string;
  user: string;
}

function App() {
  const [message, setMessage] = useState("");
  const [, setValue] = useState(0);
  const [messages, updateMessages] = useState<Message[]>([]);

  const navigate = useNavigate();

  const buttonClickHandler = () => {
    push(dbRef, {
      message: message,
      user: localStorage.getItem("username"),
    });
  };

  useEffect(() => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (const properties in data) {
            const messageObj: Message = {
              user: data[properties].user,
              message: data[properties].message,
            };
            updateMessages((current) => [...current, messageObj]);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue((v) => v + 1);
    onValue(dbRef, (snapshot) => {
      data = snapshot.val();
      console.log(data);
      updateMessages([]);
      for (const property in data) {
        updateMessages((prev) => [...prev, data[property]]);
      }
    });
    setMessage("");
  };

  const exitHandler = () => {
    navigate("/identification");
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
          {messages.map((msg) => (
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
        </div>
        <form onSubmit={formSubmitHandler} action="" className={classes.form}>
          <input
            type="text"
            placeholder="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={buttonClickHandler}>
            <img src={CaretRight} alt="" />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
