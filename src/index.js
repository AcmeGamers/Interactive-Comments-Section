import React, { useRef } from "react";
import ReactDOM from "react-dom";
import data from "data.json";

function Card(props) {
  return (
    <div>
      <div className={"card row " + props.class}>
        <div className="column upvoting vr-center hr-center">
          <a href="#">+</a>
          <span>{props.score}</span>
          <a href="#">-</a>
        </div>

        <div>
          <div className="row space-between hr-center">
            <div className="user-info row hr-center">
              <img
                className="user"
                src="./images/avatars/image-amyrobson.png"
                alt=""
              />
              <a className="username mg-lr-15px">{props.username}</a>
              <p className="period">{props.createdAt}</p>
            </div>
            <button className="btn btn-reply">
              <img src="./images/icon-reply.svg" /> Reply
            </button>
          </div>
          <p className="comment">{props.content}</p>
        </div>
      </div>
      {props.children && (
        <div className="card-reply-container column hr-right">
          {props.children}
        </div>
      )}
    </div>
  );
}
function CardReply(props) {
  return (
    <Card
      key={props.id}
      score={props.score}
      username={props.username}
      createdAt={props.createdAt}
      content={props.content}
      class="card-reply"
    />
  );
}
function CommentCard(props) {
  let userComment = React.useRef("");
  return (
    <div className="card row vr-top space-between">
      <img className="user" src={props.image} alt="" />
      <textarea
        name="text "
        placeholder="Add a comment..."
        className="mg-lr-10px"
        cols="30"
        rows="10"
        useRef={userComment}
      ></textarea>
      <button
        className="btn btn-send"
        onClick={() => {
          databaseData.comments.push({
            id: 1,
            content: userComment.current.focus(),
            createdAt: new Date().now(),
            score: 0,
            user: {
              image: {
                png: currentUser.image.png,
                webp: currentUser.image.webp,
              },
              username: currentUser.username,
            },
            replies: [],
          });
        }}
      >
        Send
      </button>
    </div>
  );
}

let currentUser = data.currentUser,
  databaseData = data.comments;

function App() {
  return (
    <div>
      {databaseData.comments.map((record) => (
        <Card
          key={record.id}
          score={record.score}
          username={record.username}
          createdAt={record.createdAt}
          content={record.content}
        >
          {record.replies == []
            ? ""
            : record.replies.map((reply) => (
                <CardReply
                  key={reply.id}
                  score={reply.score}
                  username={reply.username}
                  createdAt={reply.createdAt}
                  content={reply.content}
                />
              ))}
        </Card>
      ))}
      <CommentCard image={currentUser.image.png} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
