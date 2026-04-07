'use client'

import React, { useEffect, useState } from 'react'

interface Raindrop {
  id: number
  left: number
  duration: number
  delay: number
  opacity: number
}

export default function RainEffect({ isActive }: { isActive: boolean }) {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([])

  useEffect(() => {
    if (!isActive) {
      setRaindrops([])
      return
    }

    // Generate random raindrops
    const drops: Raindrop[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 0.5 + Math.random() * 0.5, // 0.5-1s
      delay: Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8
    }))

    setRaindrops(drops)
  }, [isActive])

  if (!isActive || raindrops.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes rainFall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .raindrop {
          position: fixed;
          top: -10px;
          width: 2px;
          height: 10px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
          pointer-events: none;
          animation: rainFall linear forwards;
          z-index: 5;
        }
      `}</style>

      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            opacity: drop.opacity,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </>
  )
}
