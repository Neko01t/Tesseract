"use client"
import { useState, useEffect } from 'react';
export default function MainPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/test');

        const data = await res.json();

        setMessage(data.status);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen text-2xl flex-col font-semibold">
      <p>Welcome to IPDI Dashboard!</p>
      <div className=""></div>
    <h1> Hello </h1>
    {loading ? (
        <p>Loading message from backend...</p>
      ) : (
        <p>Message from Flask: <strong>{message}</strong></p>
    )}
    </div>
     );
}
