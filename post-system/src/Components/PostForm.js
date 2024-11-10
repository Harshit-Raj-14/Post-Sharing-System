import React, { useState } from 'react';

function PostForm({ addPost }) {
  const [postText, setPostText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(postText);
    setPostText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Write your post here..."
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
