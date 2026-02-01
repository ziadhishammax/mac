// components/FloatingAdBanner.tsx
// 'use client'

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
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClosing ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div dir="rtl" className="relative mx-auto max-w-4xl px-4 py-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side - Icon & Message */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm md:text-base">
                  اهلا بيك <span className="font-bold text-yellow-300">انا زياد هشام</span>
                </p>
                <p className="text-xs md:text-sm text-white/80">
                  لو في حاجة واحدة بعرف اعملها, هتكون الwebsite بتاعك
                </p>
              </div>
            </div>

            {/* Right side - CTA & Close */}
            <div className="flex items-center gap-4">
              <a
                href="https://your-portfolio-site.com" // Replace with your actual site
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Visit My Site
                <ExternalLink className="h-3 w-3" />
              </a>

              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Progress bar (optional - shows time until auto-close) */}
          <div className="h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-b-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
