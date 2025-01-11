import React from 'react';
import Login from './components/Login'; // Make sure the path is correct
import Signup from './components/Signup';
const App=()=> {
  return (
    <div className="App">
      <Login />
      <Signup/>
    </div>
  );
}

export default App;
