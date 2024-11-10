import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5000/root-posts');
      const data = await response.json();
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleNewComment = async (postId, commentText, replyTo) => {
    const response = await fetch(`http://localhost:5000/create-comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText, replyTo }),
    });
    const updatedPost = await response.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // Handle showing and hiding comments for each post
  const toggleComments = (postId) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const handleCommentTextChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handlePostComment = (postId) => {
    if (newCommentText.trim()) {
      handleNewComment(postId, newCommentText);
      setNewCommentText(''); // Reset the comment input
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="post-content">
            <p>{post.text}</p>
            <button onClick={() => toggleComments(post._id)}>
              {post.showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>

          {/* Comment form */}
          <div className="comment-form">
            <textarea
              value={newCommentText}
              onChange={handleCommentTextChange}
              placeholder="Write a comment..."
              rows="2"
            />
            <button onClick={() => handlePostComment(post._id)}>
              Post a Comment
            </button>
          </div>

          {post.showComments && (
            <div className="comments-section">
              {post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  postId={post._id}
                  comment={comment}
                  onNewComment={handleNewComment}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
