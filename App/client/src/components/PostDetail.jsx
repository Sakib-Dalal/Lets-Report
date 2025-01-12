import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostDetail() {
  const { postId } = useParams(); // Get postId from URL
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(postId);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report?reportId=USER-1736607258-6QEE`
        );

        if (!response.ok) {
          const errorMessage = `Failed to fetch post details. Status: ${response.status} ${response.statusText}`;
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const data = await response.json();
        const { report } = data;
        if (report) {
          setPostDetails(report);
        } else {
          setError('No report found in the response.');
        }

        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching the post details.');
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Function to handle the status update
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(
        'https://thingproxy.freeboard.io/fetch/console.log('Post ID:', postId);
console.log('Post Details:', postDetails);
console.log('Loading Status:', loading);
console.log('Error:', error);

// Inside the useEffect hook
console.log('Fetching post details...');
console.log('Response:', response);
console.log('Data:', data);

// Inside the handleStatusChange function
console.log('Updating status to:', newStatus);
console.log('Response:', response);https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/update-status',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reportId: postId, // Post ID from URL
            status: newStatus, // New status string (pending, in progress, completed)
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = `Failed to update status. Status: ${response.status} ${response.statusText}`;
        setError(errorMessage);
      } else {
        // If successful, update the status locally
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          status: newStatus,
        }));
      }
    } catch (error) {
      setError('An error occurred while updating the status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const {
    images,
    description,
    status,
    title,
    upvotes,
    timestamp,
    address,
    country,
    state,
    city,
    latitude,
    longitude,
  } = postDetails || {};

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Post Details</h2>
        </div>
        <div className="card-body">
          <h3 className="card-subtitle mb-3">{title || 'No title available'}</h3>

          {images && images.length > 0 && (
            <div className="post-images mb-3">
              <img
                src={images[1]} // Only displaying the first image
                alt="Post Image"
                className="img-fluid rounded mb-2"
                style={{ maxWidth: '300px' }}
              />
            </div>
          )}

          <p><strong>Description:</strong> {description || 'No description available'}</p>
          <p><strong>Status:</strong> {status || 'No status available'}</p>
          <p><strong>Upvotes:</strong> {upvotes || 0}</p>
          <p><strong>Timestamp:</strong> {timestamp ? new Date(timestamp).toLocaleString() : 'No timestamp available'}</p>
          <p><strong>Address:</strong> {address || 'No address available'}</p>
          <p><strong>City:</strong> {city || 'No city available'}</p>
          <p><strong>State:</strong> {state || 'No state available'}</p>
          <p><strong>Country:</strong> {country || 'No country available'}</p>
          <p><strong>Latitude:</strong> {latitude || 'No latitude available'}</p>
          <p><strong>Longitude:</strong> {longitude || 'No longitude available'}</p>

          {/* Buttons for changing the status */}
          <div className="mt-3">
            <button
              className="btn btn-warning me-2"
              onClick={() => handleStatusChange('pending')}
            >
              Pending
            </button>
            <button
              className="btn btn-info me-2"
              onClick={() => handleStatusChange('in progress')}
            >
              In Progress
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleStatusChange('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
