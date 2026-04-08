'use client'

export default function HeroBackground() {

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {/* Premium Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/5 z-10" />

      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />
    </div>
  )
}
