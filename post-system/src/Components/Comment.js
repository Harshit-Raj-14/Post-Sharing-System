import React, { useState } from 'react';

function Comment({ comment, postId, addReply }) {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    addReply(postId, comment.id, replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={() => setShowReplyBox(!showReplyBox)}>
        {showReplyBox ? 'Cancel' : 'Reply'}
      </button>
      
      {showReplyBox && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button type="submit">Reply</button>
        </form>
      )}

      {/* Render nested replies */}
      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment 
            key={reply.id} 
            comment={reply} 
            postId={postId} 
            addReply={addReply} 
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
