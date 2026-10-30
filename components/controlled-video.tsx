'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface ControlledVideoProps {
  src: string
  poster: string
  isHero?: boolean
  className?: string
  alt?: string
}

let activePlayingVideo: HTMLVideoElement | null = null

export function ControlledVideo({
  src,
  poster,
  isHero = false,
  className = '',
  alt = 'Video player',
}: ControlledVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isHero) {
      // Ensure muted is true on DOM element for browser autoplay policies
      video.muted = true
      video.defaultMuted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If autoplay is blocked by browser, user can click to play
          })
      }
      return
    }

    // Non-hero videos: preload="none" and play when visible, one at a time
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (activePlayingVideo && activePlayingVideo !== video) {
              activePlayingVideo.pause()
            }
            activePlayingVideo = video
            video.muted = true
            video.play().then(() => setIsPlaying(true)).catch(() => {})
          } else {
            if (activePlayingVideo === video) {
              activePlayingVideo = null
            }
            video.pause()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
      if (activePlayingVideo === video) {
        activePlayingVideo = null
      }
    }
  }, [isHero])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Underlying poster Image so there is NEVER a blank grey frame */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={75}
        priority={isHero}
        className={`object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        preload={isHero ? 'auto' : 'none'}
        autoPlay={isHero}
        muted
        loop
        playsInline
        aria-label={alt}
        onPlay={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
