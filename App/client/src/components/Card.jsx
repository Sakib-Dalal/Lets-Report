import React from "react";
import "./Card.css";

function Card(props) {
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
                <p className="likes">Likes: {props.likes}</p>
                <p className="status">Status: {props.status}</p>
            </div>
            <br></br>
        </div>
    )
}

export default Card;