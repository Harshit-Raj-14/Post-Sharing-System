import React from 'react';
import Comment from './Comment';

function CommentSection({ comments, postId, addReply }) {
  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          postId={postId} 
          addReply={addReply} 
        />
      ))}
    </div>
  );
}

export default CommentSection;
