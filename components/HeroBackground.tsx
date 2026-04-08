'use client'

import { useRef, useState, useEffect } from 'react'

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [opacity, setOpacity] = useState(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Start fade-in
    const fadeIn = () => {
      const startTime = Date.now()
      const duration = 500 // 0.5s

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setOpacity(progress)

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const fadeOut = () => {
      const startTime = Date.now()
      const duration = 500 // 0.5s

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setOpacity(1 - progress)

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleTimeUpdate = () => {
      const timeRemaining = video.duration - video.currentTime
      if (timeRemaining <= 0.55) {
        fadeOut()
      }
    }

    const handleEnded = () => {
      setOpacity(0)
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        fadeIn()
      }, 100)
    }

    const handlePlay = () => {
      fadeIn()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    // Start initial playback
    video.play()
    fadeIn()

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4" type="video/mp4" />
      </video>

      {/* Blurred Overlay Shape */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '984px',
          height: '527px',
          opacity: 0.9,
          backgroundColor: '#1a1625',
          filter: 'blur(82px)',
          zIndex: 5
        }}
      />
    </div>
  )
}
