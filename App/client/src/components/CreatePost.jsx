import "./CreatePost.css";
import { Link } from "react-router-dom";

function CreatePost() {
    return (
        <div className="create-post-button">
            <Link className="post" to="/upload">Create Post +</Link>
        </div>
    );
}

export default CreatePost;
