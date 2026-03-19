"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // 🚀 Imported Link

export default function GreetingModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem("gudiPadwaGreeting");
    if (!hasSeenModal) {
      const timer = setTimeout(() => setShowModal(true), 800); // 800ms delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem("gudiPadwaGreeting", "true");
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="greeting-modal-overlay"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="greeting-modal-content"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the box itself
            >
              {/* Close Button */}
              <button className="greeting-close-btn" onClick={handleCloseModal} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
              
              {/* 🚀 Clickable Image Link */}
              <Link 
                href="/culture/05" 
                onClick={handleCloseModal} // Closes modal upon navigation
                className="greeting-img-link"
              >
                <Image 
                  src="/assets/images/greeting-img.jpg" 
                  alt="Gudi Padwa Greeting - Click to Read More" 
                  width={800} 
                  height={450} 
                  className="greeting-img"
                  priority 
                />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .greeting-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .greeting-modal-content {
          position: relative;
          background: transparent;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        /* 🚀 Link & Image Hover Styles */
        .greeting-img-link {
          display: block;
          overflow: hidden;
          border-radius: 18px; /* Matches container curve */
        }

        .greeting-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.4s ease, filter 0.4s ease;
        }

        .greeting-img-link:hover .greeting-img {
          transform: scale(1.03); /* Subtle zoom effect */
          filter: brightness(1.05); /* Slight brighten on hover */
        }

        .greeting-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }

        .greeting-close-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          color: black;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}