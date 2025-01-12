import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feed.css";
import Card from "./card";

function Feed() {
    const [feedData, setFeedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API endpoint
    const APIFeed = "https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/trending";

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(APIFeed);
                setFeedData(response.data.reports || []); // Ensure `reports` exists
                console.log(response.data.reports);
                setLoading(false);
            } catch (err) {
                setError(err.message || "An error occurred while fetching data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fallback data in case API data is empty or unavailable
    const tempCardInfo = [
        {
            key: 1,
            user_image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            name: "Raj Kapur",
            location: "Pune",
            issue_image: "https://images.wisegeek.com/garbage-on-street.jpg",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            likes: 200,
            status: "Pending",
        },
        {
            key: 2,
            user_image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            name: "Kali Linux",
            location: "Kolhapur",
            issue_image: "https://static2.businessinsider.com/image/5600530b9dd7cc15008bbf59-4604-3453/ap_305887712805.jpg",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            likes: 100,
            status: "Pending",
        },
    ];

    return (
        <div>
            <h3 className="feed-title">Feed</h3>
            {/* Show loading spinner or message */}
            {loading && <p>Loading...</p>}
            {/* Display error if any */}
            {error && <p className="error-message">Error: {error}</p>}
            {/* Render API data if available, else fallback to temp data */}
            {feedData.length > 0 ? (
                feedData.map((data) => (
                    <Card
                        user_image={data.images[0] || "https://via.placeholder.com/150"} // Fallback image
                        name={data.title || "Anonymous"}
                        location={data.country + ', ' + data.state + ", "+ data.city + ", " + data.address + " By " + data.uid || "Unknown"}
                        issue_image={data.images[1] || "https://via.placeholder.com/300"}
                        information={data.description || "No information provided"}
                        likes={data.upvotes || 0}
                        status={data.status || "Pending"}
                        uid={data.uid || "none"}
                        reportId={data.reportId || "none"}
                    />
                ))
            ) : (
                // Render fallback data if API data is unavailable
                !loading &&
                tempCardInfo.map((data) => (
                    <Card
                        key={data.key}
                        user_image={data.user_image}
                        name={data.name}
                        location={data.location}
                        issue_image={data.issue_image}
                        information={data.information}
                        likes={data.likes}
                        status={data.status}
                    />
                ))
            )}
            {/* Additional component */}
        </div>
    );
}

export default Feed;
