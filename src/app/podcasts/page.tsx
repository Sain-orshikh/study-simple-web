"use client";
import { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    setImage(file); // Store the file in the state
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || !title || !content || !category) {
      console.log("Please fill in all fields and select an image.", );
      return;
    }
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Category:", category);
    // Create a FormData object to send data as multipart/form-data
    const formData = new FormData();
    formData.append('image', image); // Append the file to FormData
    formData.append('title', title); // Append the title
    formData.append('content', content); // Append the content
    formData.append('category', category); // Append the category

    try {
      const response = await fetch('http://localhost:5000/api/blogs/create', {
        method: 'POST',
        body: formData, // Send the FormData as the request body
      });

      const data = await response.json();
      if (data.success) {
        console.log('Blog uploaded successfully:', data);
      } else {
        console.error('Error uploading blog:', data.error);
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Upload Blog</button>
    </form>
  );
};

export default ImageUpload;
