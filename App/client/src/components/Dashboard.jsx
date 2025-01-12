import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const username = location.state?.username || 'Guest';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/trending?'
        );
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        if (data.statusCode === 200) {
          const apiPosts = data.reports.map((report) => ({
            id: report.reportId,
            user: {
              image: report.images[0],
              username: report.uid,
              city: report.city,
              state: report.state,
            },
            description: report.description,
            postImage: report.images[1] || '',
            totalAgreed: report.upvotes,
            status: report.status || 'pending',
          }));
          setPosts(apiPosts);
        } else {
          setError('Failed to fetch posts: Invalid data received.');
        }
      } catch (error) {
        setError('Failed to fetch posts.');
      }
    };

    fetchData();
  }, []);

  const handleViewIssue = (postId) => {
    navigate(`/post/${postId}`);
  };
  

  return (
    <div className="d-flex">
            <div className="sidebar bg-dark text-white p-3" style={{ width: '280px', height: '100vh' }}></div>
      <div className="sidebar bg-dark text-white p-3" style={{position:'fixed',top:0,left:0, width: '260px', height: '100vh' }}>
        <h3>Manage Issue</h3>
        <p>Trending Issues</p>
      </div>
      <div className="container-fluid p-5">
        <h2>Welcome, {username}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img src={post.user.image} alt="user" className="rounded-circle" width="50" height="50" />
                    <div className="ms-3">
                      <h5>{post.user.username}</h5>
                      <p>{post.user.city}, {post.user.state}</p>
                    </div>
                  </div>
                  <p className="mt-3">{post.description}</p>
                  {post.postImage && <img src={post.postImage} alt="post" className="img-fluid mt-3" />}
                  <div className="mt-3">
                    <p><strong>{post.totalAgreed} people agreed to this post.</strong></p>
                    <button className="btn btn-primary" onClick={() => handleViewIssue(post.id)}>
                      View Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
