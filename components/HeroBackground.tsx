'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowUp, Star, Zap, Paperclip, Mic, Search as SearchIcon } from 'lucide-react'

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [opacity, setOpacity] = useState(1)
  const animationFrameRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  // Custom fade logic
  const fadeIn = (duration = 250) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    
    const startTime = Date.now()
    const startOpacity = opacity

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setOpacity(startOpacity + (1 - startOpacity) * progress)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  const fadeOut = (duration = 250) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

    const startTime = Date.now()
    const startOpacity = opacity

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setOpacity(startOpacity * (1 - progress))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const duration = video.duration
      const currentTime = video.currentTime
      const timeRemaining = duration - currentTime

      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeOut(250)
      }
    }

    const handleEnded = () => {
      fadingOutRef.current = false
      setOpacity(0)
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        fadeIn(250)
      }, 100)
    }

    const handlePlay = () => {
      fadingOutRef.current = false
      fadeIn(250)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
    }
  }, [opacity])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-[115%] h-[115%] object-cover object-top left-1/2 top-0 transform -translate-x-1/2"
        style={{
          opacity: opacity,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-[120px] py-4 border-b border-white/10">
          {/* Logo */}
          <div className="font-semibold text-white tracking-[-1.44px]" style={{ fontSize: '24px', fontFamily: 'Schibsted Grotesk' }}>
            Logoipsum
          </div>

          {/* Menu Items */}
          <div className="flex items-center gap-8" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '16px', fontWeight: 500, letterSpacing: '-0.2px' }}>
            <a href="#" className="text-white hover:opacity-80 transition">Platform</a>
            <div className="flex items-center gap-2 text-white hover:opacity-80 transition cursor-pointer">
              <span>Features</span>
              <ChevronDown size={16} />
            </div>
            <a href="#" className="text-white hover:opacity-80 transition">Projects</a>
            <a href="#" className="text-white hover:opacity-80 transition">Community</a>
            <a href="#" className="text-white hover:opacity-80 transition">Contact</a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-lg text-white border border-white/30 hover:bg-white/10 transition">
              Sign Up
            </button>
            <button className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition">
              Log In
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center flex-1 pt-20 px-[120px]">
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e1311] text-white text-sm mb-8">
            <Star size={16} fill="currentColor" />
            <span>New</span>
          </div>

          {/* Subheader */}
          <p className="text-white mb-8 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            Discover what's possible
          </p>

          {/* Main Headline */}
          <h1
            className="text-center mb-6 leading-none font-bold"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '80px',
              letterSpacing: '-4.8px',
              color: '#000000',
            }}
          >
            Transform Data Quickly
          </h1>

          {/* Subtitle */}
          <p
            className="text-center mb-12"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              letterSpacing: '-0.4px',
              color: '#505050',
              maxWidth: '736px',
              width: '542px',
            }}
          >
            Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.
          </p>

          {/* Search Input Box */}
          <div
            className="rounded-[18px] p-6 w-full max-w-[728px]"
            style={{
              background: 'rgba(0, 0, 0, 0.24)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px', fontWeight: 500 }}>
                <span>60/450 credits</span>
                <button className="ml-2 px-3 py-1 rounded bg-[rgba(90,225,76,0.89)] text-black text-xs font-semibold hover:opacity-90 transition">
                  Upgrade
                </button>
              </div>
              <div className="flex items-center gap-2 text-white" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px', fontWeight: 500 }}>
                <Zap size={14} />
                <span>Powered by GPT-4o</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-3 bg-white rounded-[12px] px-4 py-3 mb-4">
              <input
                type="text"
                placeholder="Type question..."
                className="flex-1 outline-none bg-transparent text-black placeholder-[rgba(0,0,0,0.6)]"
                style={{ fontFamily: 'Inter', fontSize: '16px' }}
              />
              <button className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                <ArrowUp size={18} className="text-white" />
              </button>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded bg-[#f8f8f8] hover:bg-gray-200 transition flex items-center gap-2" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px', fontWeight: 500 }}>
                  <Paperclip size={14} />
                  Attach
                </button>
                <button className="px-3 py-2 rounded bg-[#f8f8f8] hover:bg-gray-200 transition flex items-center gap-2" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px', fontWeight: 500 }}>
                  <Mic size={14} />
                  Voice
                </button>
                <button className="px-3 py-2 rounded bg-[#f8f8f8] hover:bg-gray-200 transition flex items-center gap-2" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px', fontWeight: 500 }}>
                  <SearchIcon size={14} />
                  Prompts
                </button>
              </div>
              <span className="text-gray-400" style={{ fontFamily: 'Schibsted Grotesk', fontSize: '12px' }}>0/3,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
