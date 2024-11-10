import React, { useState } from 'react';
import CommentSection from './CommentSection';

function Post({ post, addComment, addReply }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="post">
      <p>{post.text}</p>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </form>
      <CommentSection comments={post.comments} postId={post.id} addReply={addReply} />
    </div>
  );
}

export default Post;
