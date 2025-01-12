import React from "react";
import "./Card.css";
import Upvote from "./Upvote";

function Card(props) {
    const [vote, setVote] = React.useState(props.likes);

    return (
        <div className="feed-card">
            <br></br>
            <div className="user-info">
                <img className="user-img" src={props.user_image}></img>
                <div>
                    <h3>{props.name}</h3>
                    <p>{props.location}</p>
                </div>
            </div>
            <img className="issue_image" src={props.issue_image} />
            <p className="post-info">{props.information}</p>
            <div className="post-footer">
                <p className="likes">Up Votes: {vote}</p>
                <p className="status">Status: {props.status}</p>
            </div>

            <br></br>
            <Upvote
                uid={props.uid}
                reportId={props.reportId}
            />
        </div>
    )
}

export default Card;