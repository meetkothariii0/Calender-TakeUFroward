'use client'

import React from 'react'

export default function SnowGround({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <>
      <style>{`
        .snow-ground {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.5) 30%,
            rgba(240, 248, 255, 0.6) 70%,
            rgba(220, 237, 255, 0.7) 100%
          );
          pointer-events: none;
          z-index: 4;
          backdrop-filter: blur(0.5px);
        }

        .snow-particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6));
          border-radius: 50%;
          opacity: 0.8;
        }

        .winter-vine {
          position: absolute;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to top, rgba(100, 100, 100, 0.3), transparent);
          pointer-events: none;
          z-index: 4;
          opacity: 0.6;
        }

        @keyframes sway-vine {
          0%, 100% {
            transform: translateX(0px) scaleX(1);
          }
          50% {
            transform: translateX(10px) scaleX(1.1);
          }
        }

        .vine-sway {
          animation: sway-vine 3s ease-in-out infinite;
        }
      `}</style>

      {/* Snow ground layer */}
      <div className="snow-ground">
        {/* Snow particles on ground */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="snow-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 150}px`,
              width: `${3 + Math.random() * 8}px`,
              height: `${3 + Math.random() * 8}px`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}

        {/* Winter vines/branches */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`vine-${i}`}
            className="winter-vine vine-sway"
            style={{
              left: `${(i / 12) * 100}%`,
              height: `${80 + Math.random() * 120}px`,
              animationDelay: `${i * 0.25}s`,
              opacity: 0.4 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    </>
  )
}
