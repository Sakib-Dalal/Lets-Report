import "./Feed.css";
import React from "react";
import Card from "./Card";
import Getmore from "./Getmore";

function Feed() {
    const tempCardInfo = [
        {
            key: 1,
            user_image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            name: "Raj Kapur",
            location: "Pune",
            issue_image: "https://images.wisegeek.com/garbage-on-street.jpg",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: "200",
            status: "Pending",
        },
        {
            key: 2,
            user_image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            name: "Kali Linux",
            location: "Kolhapur",
            issue_image: "https://static2.businessinsider.com/image/5600530b9dd7cc15008bbf59-4604-3453/ap_305887712805.jpg",
            information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: 100,
            status: "Pending",
        },
    ];

    return (
        <>
            <div>
            <h3 className="feed-title">Feed</h3>
            {
                tempCardInfo.map((data) => {
                    return <Card 
                        user_image={data.user_image}
                        name={data.name}
                        location={data.location}
                        issue_image={data.issue_image}
                        information={data.information}
                        likes={data.likes}
                        status={data.status}
                    />
                })
            }
            <Getmore />
            </div>
        </>
    );
  }
  

export default Feed;