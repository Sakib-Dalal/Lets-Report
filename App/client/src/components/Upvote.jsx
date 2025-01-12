import axios from "axios";
import React, { useState } from "react";
import "./Upvote.css";

function Upvote(props) {
  const APIVoteUp = "https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/upvote"

  // API data object
  const data = {
    uid: props.uid, // Correct user ID
    reportId: props.reportId, // Correct report ID
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleVote() {
    console.log("Vote Up clicked");
    setIsLoading(true);

    try {
      const response = await axios.put(
        APIVoteUp,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Specify raw JSON content type
          },
        }
      );
      console.log("Response:", response.data);
      setResponseMessage("Vote successfully recorded!");
    } catch (error) {
      console.error("Error while voting:", error);
      setResponseMessage(
        error.response?.data?.message || "Failed to record your vote. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="button-container">
        <button onClick={handleVote} className="myButton" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Up Vote 👍"}
        </button>
      </div>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </>
  );
}

export default Upvote;