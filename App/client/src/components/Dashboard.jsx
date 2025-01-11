import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [status, setStatus] = useState('pending');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  // Sample array of posts
  const posts = [
    {
      id: 1,
      user: {
        image: 'https://media.licdn.com/dms/image/v2/D5603AQEDc50zpEhjTA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731948176299?e=1741824000&v=beta&t=Yp_xSH66yTJ-wu9AWUtqQUKWND7WKesrMASaOzGmlRk',
        username: 'John Doe',
        city: 'New York',
      },
      description: 'This is a sample post description. This can be a text describing the content of the post.',
      postImage: 'data:image/jpeg;base64,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',
      totalAgreed: 150,
    },
    {
      id: 2,
      user: {
        image: 'https://via.placeholder.com/50',
        username: 'Jane Smith',
        city: 'Los Angeles',
      },
      description: 'This is another post description with more details.',
      postImage: 'https://via.placeholder.com/400x300',
      totalAgreed: 200,
    },
    {
      id: 3,
      user: {
        image: 'https://via.placeholder.com/50',
        username: 'Alice Johnson',
        city: 'Chicago',
      },
      description: 'An interesting post about technology.',
      postImage: 'https://via.placeholder.com/400x300',
      totalAgreed: 120,
    },
    {
      id: 4,
      user: {
        image: 'https://via.placeholder.com/50',
        username: 'Bob Lee',
        city: 'San Francisco',
      },
      description: 'Post about environment and sustainability.',
      postImage: 'https://via.placeholder.com/400x300',
      totalAgreed: 350,
    },
    {
      id: 5,
      user: {
        image: 'https://via.placeholder.com/50',
        username: 'Emma Davis',
        city: 'Miami',
      },
      description: 'This post covers health and wellness.',
      postImage: 'https://via.placeholder.com/400x300',
      totalAgreed: 220,
    },
  ];

  // Sorting posts by totalAgreed in descending order
  const sortedPosts = posts.sort((a, b) => b.totalAgreed - a.totalAgreed);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h3>Dashboard</h3>
        <ul className="list-unstyled">
          <li>
            <button className="btn btn-secondary w-100 dropdown-toggle" data-bs-toggle="dropdown">
              Menu 1
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
              <li><a className="dropdown-item" href="#">Option 2</a></li>
              <li><a className="dropdown-item" href="#">Option 3</a></li>
            </ul>
          </li>
          <li className="mt-3">
            <button className="btn btn-secondary w-100 dropdown-toggle" data-bs-toggle="dropdown">
              Menu 2
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
              <li><a className="dropdown-item" href="#">Option 2</a></li>
              <li><a className="dropdown-item" href="#">Option 3</a></li>
            </ul>
          </li>
          <li className="mt-3">
            <button className="btn btn-secondary w-100 dropdown-toggle" data-bs-toggle="dropdown">
              Menu 3
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
              <li><a className="dropdown-item" href="#">Option 2</a></li>
              <li><a className="dropdown-item" href="#">Option 3</a></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <h2>Welcome, {sortedPosts[0]?.user.username}</h2>

        <div className="row">
          {/* Post Cards */}
          {sortedPosts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img src={post.user.image} alt="user" className="rounded-circle" width="50" height="50" />
                    <div className="ms-3">
                      <h5>{post.user.username}</h5>
                      <p>{post.user.city}</p>
                    </div>
                  </div>
                  <p className="mt-3">{post.description}</p>
                  <img src={post.postImage} alt="post" className="img-fluid mt-3" />
                  <div className="mt-3">
                    <p><strong>{post.totalAgreed} people agreed to this post.</strong></p>
                    <div>
                      <button
                        className={`btn ${status === 'pending' ? 'btn-warning' : 'btn-secondary'} me-2`}
                        onClick={() => handleStatusChange('pending')}
                      >
                        Pending
                      </button>
                      <button
                        className={`btn ${status === 'complete' ? 'btn-success' : 'btn-secondary'} me-2`}
                        onClick={() => handleStatusChange('complete')}
                      >
                        Complete
                      </button>
                      <button
                        className={`btn ${status === 'inProgress' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleStatusChange('inProgress')}
                      >
                        In Progress
                      </button>
                    </div>
                    <p className="mt-2">Current Status: <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong></p>
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
