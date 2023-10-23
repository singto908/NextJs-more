"use client";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Check user authentication or authorization here.
      // Send a token or authentication data to the API if necessary.

      // If the user is authenticated and authorized, you can create the post.

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send a token or authentication data to the API if necessary.
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Post created successfully, navigate the user to the PostsList page.
        history.push('/posts');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}