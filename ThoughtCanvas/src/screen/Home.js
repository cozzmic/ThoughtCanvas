import React, { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://bloggler-backend.vercel.app/api/post");
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post._id} style={{ backgroundColor: "#f0f0f0", marginBottom: "20px", padding: "10px", width: "80%", margin: "0 auto" }}>
          <img src={post.createdBy.imageUrl} alt={post.createdBy.userName} style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }} />
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Created by: {post.createdBy.userName}</p>
           
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}