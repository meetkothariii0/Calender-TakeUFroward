'use client'

import React from 'react'

export default function SunEffect({ isActive, theme = 'light' }: { isActive: boolean; theme?: 'dark' | 'light' }) {
  if (!isActive) return null

  return (
    <>
      <style>{`
        @keyframes sunGlow {
          0%, 100% {
            box-shadow: 0 0 60px rgba(255, 200, 0, 0.6), 0 0 100px rgba(255, 200, 0, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 80px rgba(255, 200, 0, 0.8), 0 0 120px rgba(255, 200, 0, 0.4);
            transform: scale(1.05);
          }
        }

        @keyframes moonGlow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(200, 220, 255, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.7), 0 0 80px rgba(200, 220, 255, 0.4);
            transform: scale(1.05);
          }
        }
        
        .sun-effect {
          position: fixed;
          top: 60px;
          right: 80px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 100, 0.9), rgba(255, 200, 0, 1));
          border-radius: 50%;
          pointer-events: none;
          animation: sunGlow 4s ease-in-out infinite;
          z-index: 3;
          filter: blur(2px);
        }

        .moon-effect {
          position: fixed;
          top: 60px;
          right: 80px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(220, 230, 255, 0.8));
          border-radius: 50%;
          pointer-events: none;
          animation: moonGlow 4s ease-in-out infinite;
          z-index: 3;
          filter: blur(1px);
          box-shadow: inset -20px -20px 30px rgba(100, 120, 150, 0.4);
        }
        
        .sun-rays {
          position: fixed;
          top: 60px;
          right: 80px;
          width: 140px;
          height: 140px;
          pointer-events: none;
          z-index: 2;
        }
        
        .sun-ray {
          position: absolute;
          background: linear-gradient(to right, rgba(255, 200, 0, 0.5), transparent);
          transform-origin: 50% 50%;
        }
      `}</style>

      {theme === 'light' ? (
        <>
          <div className="sun-effect" />
          
          <div className="sun-rays">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="sun-ray"
                style={{
                  width: '80px',
                  height: '4px',
                  left: '30px',
                  top: '68px',
                  transform: `rotate(${i * 30}deg)`,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="moon-effect" />
      )}
    </>
  )
}
