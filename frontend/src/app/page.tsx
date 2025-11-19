"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Loader2, Server, ShieldCheck } from 'lucide-react';
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function MainPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login"); // Redirect user to login page
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        setIsAuthenticated(false);
        setIsAuthChecked(true);
        router.push("/login");
        return;
    }

    setIsAuthenticated(true);
    setIsAuthChecked(true);

    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/', {
          headers: {
            'Authorization': `Bearer ${token}` // Send the token for authorization
          }
        });

        const data = await res.json();
        setMessage(data.message || 'Backend is running!');
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data or connection error.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, handleLogout]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const welcomeText = "Welcome to IPDI Dashboard!";

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <p className="ml-3 text-lg text-gray-300">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100 flex justify-center items-center">

      <motion.div
        className="w-full max-w-4xl bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-8 border-t-8 border-indigo-500"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >

        {/* Top Header and Logout Button */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <motion.div variants={fadeIn}>
                <h1 className="text-3xl font-extrabold text-indigo-400 tracking-wider">
                    <ShieldCheck className='inline-block h-8 w-8 mr-2'/> IPDI Dashboard
                </h1>
            </motion.div>

            {/* LOGOUT BUTTON IN THE TOP RIGHT */}
            <motion.div variants={fadeIn}>
                <Button
                    text="Logout"
                    onClick={handleLogout}
                    primary={false}
                    icon={LogOut}
                    className="w-auto" // Override the full width
                />
            </motion.div>
        </div>

        {/* Welcome Message */}
        <motion.p variants={fadeIn} className="text-2xl font-semibold text-gray-200">
            {welcomeText}
        </motion.p>

        {/* Backend Status Card */}
        <motion.div variants={fadeIn} className="flex flex-col items-center space-y-4 pt-4">
          <p className="text-xl font-semibold text-gray-300">API Connection Status:</p>

          <div className="w-full max-w-md text-center p-6 rounded-lg border-2 border-dashed border-gray-600 bg-gray-700">
            {loading ? (
              <p className="flex items-center justify-center text-indigo-400">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading message from backend...
              </p>
            ) : (
              <p className="text-base text-gray-300 flex items-center justify-center">
                <Server className='h-5 w-5 mr-2 text-green-400' />
                Response: <strong className='ml-2 text-white'>{message}</strong>
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
