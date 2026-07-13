'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const MUSIC_SRC = '/audio/no-sleep-pump-up-the-jam.mp3'
const MUSIC_PREFIXES = ['/rsvp', '/lineup', '/ticket', '/buses', '/location', '/faq', '/privacy']
const BLOCKED_PREFIXES = ['/admin', '/login', '/api']

function shouldShowMusic(pathname: string | null) {
  if (!pathname) return false
  if (BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return false
  }
  return pathname === '/' || MUSIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export function SiteMusicPlayer() {
  const pathname = usePathname()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const visible = shouldShowMusic(pathname)

  const startMusic = useCallback(async (muted = false) => {
    const audio = audioRef.current
    if (!audio || !visible) return

    audio.volume = 0.42
    audio.muted = muted

    try {
      await audio.play()
      setPlaying(!muted)
    } catch {
      setPlaying(false)
    }
  }, [visible])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!visible) {
      audio.pause()
      setPlaying(false)
      return
    }

    void startMusic(true)
  }, [startMusic, visible])

  useEffect(() => {
    if (!visible || playing) return

    const unlockSoundtrack = () => {
      void startMusic(false)
    }

    window.addEventListener('pointerdown', unlockSoundtrack)
    window.addEventListener('keydown', unlockSoundtrack)
    window.addEventListener('touchstart', unlockSoundtrack)

    return () => {
      window.removeEventListener('pointerdown', unlockSoundtrack)
      window.removeEventListener('keydown', unlockSoundtrack)
      window.removeEventListener('touchstart', unlockSoundtrack)
    }
  }, [playing, startMusic, visible])

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="metadata"
        loop
        autoPlay
        muted
        playsInline
        onPlay={() => setPlaying(Boolean(audioRef.current && !audioRef.current.muted))}
        onPause={() => setPlaying(false)}
      />

      {visible ? (
        <div
          className={`ns-music-player ${playing ? 'is-playing' : ''}`}
          aria-label={playing ? 'Musica de fondo activa' : 'Musica de fondo preparada'}
          role="status"
        >
          <span className="ns-music-disc" aria-hidden="true">
            <span />
          </span>
          <span className="ns-music-copy">
            <span>{playing ? 'MUSIC ON' : 'AUTO START'}</span>
            <strong>{playing ? 'PUMP UP THE JAM' : 'NO SLEEP MODE'}</strong>
          </span>
          <span className="ns-music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      ) : null}    </>
  )
}
