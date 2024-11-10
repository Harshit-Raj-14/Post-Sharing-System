import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';

function PostSharingSystem() {
  const [posts, setPosts] = useState([]);

  const addPost = (postText) => {
    if (postText.trim()) {
      setPosts([{ id: Date.now(), text: postText, comments: [] }, ...posts]);
    }
  };

  const addComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, { id: Date.now(), text: commentText, replies: [] }] } 
        : post
    ));
  };

  const addReply = (postId, commentId, replyText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        post.comments = post.comments.map(comment => 
          addReplyToComment(comment, commentId, replyText)
        );
      }
      return post;
    }));
  };

  const addReplyToComment = (comment, commentId, replyText) => {
    if (comment.id === commentId) {
      return { ...comment, replies: [...comment.replies, { id: Date.now(), text: replyText, replies: [] }] };
    }
    return { ...comment, replies: comment.replies.map(reply => addReplyToComment(reply, commentId, replyText)) };
  };

  return (
    <div>
      <PostForm addPost={addPost} />
      <PostList posts={posts} addComment={addComment} addReply={addReply} />
    </div>
  );
}

export default PostSharingSystem;
