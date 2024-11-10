import React from 'react';
import Post from './Post';

function PostList({ posts, addComment, addReply }) {
  return (
    <div>
      {posts.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          addComment={addComment} 
          addReply={addReply} 
        />
      ))}
    </div>
  );
}

export default PostList;
