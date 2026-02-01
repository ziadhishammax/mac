// components/FloatingAdBanner.tsx
'use client'

import { ExternalLink, Sparkle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function FloatingAdBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  // Show banner after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      // Store in localStorage so it doesn't show again for 24 hours
      localStorage.setItem('adBannerClosed', Date.now().toString())
    }, 300)
  }

  // Check if banner was recently closed
  useEffect(() => {
    const lastClosed = localStorage.getItem('adBannerClosed')
    if (lastClosed) {
      const timeSinceClosed = Date.now() - parseInt(lastClosed)
      // Don't show if closed within last 24 hours
      if (timeSinceClosed < 24 * 60 * 60 * 1000) {
        setIsVisible(false)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isClosing ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div dir="rtl" className="relative mx-auto max-w-4xl px-4 py-3">
        {/* Glassy/Blurred Background Container */}
        <div className="relative">
          {/* Backdrop Blur Layer */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
          
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-md" />
          </div>

          {/* Main Content */}
          <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl border border-white/30 backdrop-blur-sm">
            <div className="md:flex items-center justify-between px-6 py-4">
              {/* Left side - Icon & Message */}
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gradient-to-br from-white/30 to-white/10 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                  <Sparkle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-base md:text-lg text-white drop-shadow-md">
                    اهلا بيك <span className="font-extrabold text-yellow-300/90">انا زياد هشام</span>
                  </p>
                  <p className="text-sm md:text-base text-white/90 mt-1 font-medium">
                    لو في حاجة واحدة بعرف اعملها, هتكون الwebsite بتاعك
                  </p>
                </div>
                 <button
                  onClick={handleClose}
                  className="md:hidden p-2 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Right side - CTA & Close */}
              <div className="mt-3 flex items-center gap-4">
                <a
                  href="https://your-portfolio-site.com" // Replace with your actual site
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-5 py-2.5 bg-gradient-to-r from-white to-white/90 text-blue-600 rounded-xl font-bold text-sm hover:from-white hover:to-white transition-all duration-300 flex items-center gap-2 shadow-2xl hover:shadow-3xl group overflow-hidden"
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Visit My Site</span>
                  <ExternalLink className="h-4 w-4 relative" />
                </a>

                <button
                  onClick={handleClose}
                  className="hidden sm:block p-2 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Animated Gradient Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-b-2xl">
              <div className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
