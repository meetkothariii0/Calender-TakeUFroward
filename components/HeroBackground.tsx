'use client'

import React, { useEffect, useRef } from 'react'

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number
    let isLooping = false
    const fadeDuration = 500 // ms

    const updateVideoOpacity = () => {
      if (!video.paused && !isLooping) {
        const timeRemaining = video.duration - video.currentTime
        const opacity = Math.min(1, Math.max(0, timeRemaining * 1000 / fadeDuration))
        video.style.opacity = String(opacity)

        if (timeRemaining < fadeDuration / 1000) {
          // Start fading out, then loop
          if (timeRemaining < 0.1) {
            isLooping = true
            video.style.opacity = '0'
            setTimeout(() => {
              video.currentTime = 0
              video.play()
              video.style.opacity = '1'
              isLooping = false
            }, 100)
            return
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    video.onended = () => {
      isLooping = true
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        video.style.opacity = '1'
        isLooping = false
      }, 100)
    }

    video.onplay = () => {
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    if (!video.paused) {
      animationFrameId = requestAnimationFrame(updateVideoOpacity)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-garden-olive via-garden-sage to-garden-mint overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        style={{
          top: '0px',
          opacity: '0',
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-garden-cream/30 via-transparent to-garden-cream/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-garden-olive/20 via-transparent to-garden-sage/20" />

      {/* Accent shapes (subtle depth) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-garden-gold/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-garden-green-bright/15 to-transparent rounded-full blur-2xl" />

      {/* Month and Year text */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end p-xl animate-fade-rise-delay">
        <h2 className="text-display font-serif font-light text-garden-olive leading-none tracking-tight"
          style={{
            textShadow: '0 2px 8px rgba(45, 54, 51, 0.1)',
          }}
        >
          APRIL
        </h2>
        <p className="text-2xl font-serif font-light text-garden-sage tracking-wider mt-xs"
          style={{
            textShadow: '0 1px 4px rgba(45, 54, 51, 0.05)',
          }}
        >
          2026
        </p>
      </div>
    </div>
  )
}
