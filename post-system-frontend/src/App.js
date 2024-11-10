import React, { useState } from 'react';
import './App.css';
import PostForm from './Components/PostForm';
import PostList from './Components/PostList';

const App = () => {
  const [newPost, setNewPost] = useState(null);

  const handlePostCreated = (post) => {
    setNewPost(post); // Update state when a new post is created
  };

  return (
    <div className="app">
      <div className="container">
        <PostForm onPostCreated={handlePostCreated} />
        <PostList />
      </div>
    </div>
  );
};

export default App;
