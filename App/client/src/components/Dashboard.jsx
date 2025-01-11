import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const handleStatusChange = async (postId, newStatus) => {
    try {
      const response = await fetch('https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: postId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }

      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, status: newStatus } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/report/trending?'
        );
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedPosts = posts.sort((a, b) => b.totalAgreed - a.totalAgreed);

  return (
    <div className="d-flex">
      <div className="sidebar bg-dark text-white p-3" style={{ width: '260px', height: '100vh' }}></div>
      <div className="sidebar bg-dark text-white p-3" style={{ position: 'fixed', width: '250px', height: '100vh', top: 0, left: 0 }}>
        <h3>Dashboard</h3>
        <ul className="list-unstyled"></ul>
      </div>
      <div className="container-fluid p-5">
        <h2>Welcome, {username}</h2>
        <div className="row">
          {sortedPosts.map((post) => (
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
                    <div>
                      <button
                        className={`btn ${post.status === 'pending' ? 'btn-warning' : 'btn-secondary'} me-2`}
                        onClick={() => handleStatusChange(post.id, 'pending')}
                      >
                        Pending
                      </button>
                      <button
                        className={`btn ${post.status === 'complete' ? 'btn-success' : 'btn-secondary'} me-2`}
                        onClick={() => handleStatusChange(post.id, 'complete')}
                      >
                        Complete
                      </button>
                      <button
                        className={`btn ${post.status === 'inProgress' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleStatusChange(post.id, 'inProgress')}
                      >
                        In Progress
                      </button>
                    </div>
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
