import React, { useState } from 'react';

const PostForm = ({ onPostCreated }) => {
  const [text, setText] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const response = await fetch('http://localhost:5000/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const newPost = await response.json();
    setText('');
    onPostCreated(newPost); // Notify the parent that a post was created
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your post here..."
          rows="4"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
