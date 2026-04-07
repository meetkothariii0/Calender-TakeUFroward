'use client'

import React, { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  left: number
  duration: number
  delay: number
  size: number
  opacity: number
}

export default function SnowEffect({ isActive }: { isActive: boolean }) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    if (!isActive) {
      setSnowflakes([])
      return
    }

    // Generate random snowflakes
    const flakes: Snowflake[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12, // 8-20s for slow falling
      delay: Math.random() * 5,
      size: 2 + Math.random() * 6, // 2-8px
      opacity: 0.4 + Math.random() * 0.6, // 0.4-1.0
    }))

    setSnowflakes(flakes)
  }, [isActive])

  if (!isActive || snowflakes.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes snowFall {
          to {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }
        
        @keyframes snowSway {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(80px);
          }
        }
        
        .snowflake {
          position: fixed;
          top: -10px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3));
          border-radius: 50%;
          pointer-events: none;
          animation: snowFall linear forwards, snowSway 4s ease-in-out infinite;
          z-index: 5;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s, 4s`,
            animationDelay: `${flake.delay}s, ${flake.delay * 0.5}s`,
          }}
        />
      ))}
    </>
  )
}
