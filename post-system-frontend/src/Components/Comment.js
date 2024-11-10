import React, { useState } from 'react';

const Comment = ({ postId, comment, onNewComment }) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onNewComment(postId, replyText, comment._id);
      setReplyText('');
    }
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>

      {/* Reply Form */}
      <form onSubmit={handleReplySubmit}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          rows="2"
        />
        <button type="submit">Reply</button>
      </form>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="nested-replies">
          {comment.replies.map((reply) => (
            <div key={reply._id} className="comment reply">
              <p>{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
