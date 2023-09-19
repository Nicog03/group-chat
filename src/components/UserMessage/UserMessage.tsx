import classes from "./UserMessage.module.css";

interface MessageType {
  user: string;
  message: string;
}

const UserMessage: React.FC<MessageType> = ({ user, message }) => {
  return (
    <div
      className={`${classes.messageDiv} ${
        localStorage.getItem("username") === user
          ? classes.sent
          : classes.received
      }`}
    >
      <p className={classes.username}>{user}</p>
      <p className={classes.message}>{message}</p>
    </div>
  );
};

export default UserMessage;
