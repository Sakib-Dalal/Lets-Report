import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();  // Get postId from URL
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
        try {
          const response = await fetch(
            `https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/?reportId=${postId}`
          );
          
          console.log('API Response:', response);
          
          if (!response.ok) {
            const errorMessage = `Failed to fetch post details. Status: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            setError(errorMessage);
            setLoading(false);
            return;
          }
      
          const data = await response.json();
          console.log('API Data:', data);  // Add this line to log the response data
      
          // Check if the response data has the expected structure
          const { images, description, status } = data;
          
          setPostDetails({ images, description, status });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching post details:', error);
          setError('An error occurred while fetching the post details.');
          setLoading(false);
        }
      };
      

    fetchPostDetails();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Post Details</h2>
      
      {/* Display images */}
      {postDetails?.images && postDetails.images.length > 0 && (
        <div className="post-images">
          {postDetails.images.map((image, index) => (
            <img key={index} src={image} alt={`Post Image ${index + 1}`} className="img-fluid" />
          ))}
        </div>
      )}

      {/* Display description */}
      <p><strong>Description:</strong> {postDetails?.description || 'No description available'}</p>

      {/* Display status */}
      <p><strong>Status:</strong> {postDetails?.status || 'No status available'}</p>
    </div>
  );
}

export default PostDetail;
