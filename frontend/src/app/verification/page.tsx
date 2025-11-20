"use client"
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
export default function verification(){
  const router = useRouter();
  const handleRoute = useCallback(() => {
    router.push('/dashboard')
  },[router])
  return (
    <>
      <motion.div
        className="absolute top-1/2 text-center left-1/2 -translate-x-1/2 -translate-y-1/2 " initial={{ opacity: 0, scale: 0.5 }} // Initial state of the animation
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
      <div className="text-2xl" >Under Construction </div>
      <br/>
      <motion.button onClick={handleRoute} initial={{top:10,}} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9, rotate: 15, backgroundColor: "#0056b3" }}  className="border-1 rounded p-4 m-4 " >go to dashboard</motion.button>
      </motion.div>
    </>
  );
}
