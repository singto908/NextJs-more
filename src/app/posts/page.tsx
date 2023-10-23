"use client";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface User {
  username: string;
  // เพิ่ม properties อื่น ๆ ของผู้ใช้ตามต้องการ
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [user, setUser] = useState<User | null>(null); // เพิ่ม state สำหรับผู้ใช้

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ส่งคำร้องขอ API หรือดึงข้อมูลผู้ใช้จากตรวจสอบ Token หรือระบบรับรองตัวตน
        // และกำหนดข้อมูลผู้ใช้ใน state user
        const userResponse = await fetch('/api/user');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <ul>
        {posts !== null &&
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}