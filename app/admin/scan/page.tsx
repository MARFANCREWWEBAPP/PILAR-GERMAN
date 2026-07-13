'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { Camera, CheckCircle2, Keyboard, QrCode, ShieldCheck, Sparkles, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NoSleepBrand } from '@/components/brand/NoSleepBrand'

export default function AdminScanPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'used' | 'cancelled' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [lastScanAt, setLastScanAt] = useState('')
  const [cameraReady, setCameraReady] = useState(true)
  const [scanCount, setScanCount] = useState(0)
  const tokenRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  async function validateToken(token: string) {
    const response = await fetch('/api/admin/tickets/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })

    const data = await response.json()
    const scannedAt = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    setScanCount((current) => current + 1)
    setLastScanAt(scannedAt)

    if (!response.ok) {
      if (data.status === 'USED') setStatus('used')
      else if (data.status === 'CANCELLED') setStatus('cancelled')
      else setStatus('error')
      setMessage(data.message || 'No se pudo validar')
      return
    }

    setStatus('ok')
    setMessage(data.name || 'Entrada válida')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = tokenRef.current?.value || ''
    if (token.trim()) await validateToken(token)
  }

  function fillDemoToken(token: string) {
    if (tokenRef.current) tokenRef.current.value = token
  }

  useEffect(() => {
    let stream: MediaStream | null = null
    let timer: ReturnType<typeof setInterval> | null = null

    async function startCamera() {
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        setCameraReady(false)
        return
      }

      const Barcode = (window as any).BarcodeDetector
      if (!Barcode) {
        setCameraReady(false)
        return
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
        await videoRef.current.play()

        const detector = new Barcode({ formats: ['qr_code'] })
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const video = videoRef.current

        timer = setInterval(async () => {
          if (!ctx || !video.videoWidth || !video.videoHeight) return
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0)
          const bitmap = await createImageBitmap(canvas)
          const codes = await detector.detect(bitmap)

          if (codes.length > 0) {
            const raw = String(codes[0].rawValue || '').trim()
            const token = raw.includes('/') ? raw.split('/').pop() || raw : raw
            if (token && tokenRef.current) {
              tokenRef.current.value = token
              if (timer) clearInterval(timer)
              await validateToken(token)
            }
          }
        }, 600)
      } catch {
        setCameraReady(false)
      }
    }

    startCamera()

    return () => {
      if (timer) clearInterval(timer)
      if (stream) stream.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const statusClass =
    status === 'ok'
      ? 'border-white/[0.38] bg-white text-black'
      : status === 'used' || status === 'cancelled'
        ? 'border-red-300/[0.32] bg-red-500/[0.12] text-red-100'
        : status === 'error'
          ? 'border-red-400/[0.40] bg-red-500/[0.10] text-red-100'
          : 'border-white/[0.12] bg-white/[0.045] text-white/[0.70]'

  const resultLabel = status === 'ok' ? 'ACCESS GRANTED' : status === 'idle' ? 'READY TO SCAN' : 'ACCESS DENIED'
  const ResultIcon = status === 'ok' ? CheckCircle2 : status === 'idle' ? QrCode : XCircle

  return (
    <main className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/[0.10] bg-black/[0.62] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.12] bg-white/[0.08]" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end">
          <div>
            <div className="mb-8 inline-flex rounded-[2rem] border border-white/[0.10] bg-white/[0.035] p-5 backdrop-blur-xl">
              <NoSleepBrand />
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.30em] text-white/64"><Sparkles size={14} /> Gate control</p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(4rem,8vw,8.5rem)] leading-[0.74] tracking-[-0.08em] text-white">Scanner</h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.62]">Cabina de acceso para validar passports por cámara o token manual sin romper el ritmo de puerta.</p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.05] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/42">Door pulse</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-black/[0.36] px-4 py-4">
                <p className="font-display text-5xl leading-none text-white">{scanCount}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/42">Scans sesión</p>
              </div>
              <div className="rounded-2xl bg-black/[0.36] px-4 py-4">
                <p className="font-display text-5xl leading-none text-white">{lastScanAt || '--'}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/42">Último scan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_410px]">
        <section className="rounded-[2.2rem] border border-white/[0.12] bg-black/[0.42] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-white">
              <Camera size={18} className="text-white" />
              Cámara QR
            </div>
            <span className="rounded-full border border-white/[0.24] bg-white/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.20em] text-white">Live scan</span>
          </div>
          <div className="motion-scan relative overflow-hidden rounded-[1.8rem] border border-white/[0.12] bg-black">
            <video ref={videoRef} muted playsInline className="h-[360px] w-full object-cover md:h-[520px]" />
            <div className="pointer-events-none absolute inset-8 rounded-[1.4rem] border border-white/[0.50] shadow-[0_0_55px_rgba(255,255,255,0.16)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.18]" />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl border border-white/[0.10] bg-black/[0.62] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/62 backdrop-blur-xl">
              Coloca el QR dentro del marco. Si la cámara falla, usa token manual.
            </div>
          </div>
          {!cameraReady ? <p className="mt-3 text-sm text-white/[0.58]">Cámara QR no disponible. Usa la validación manual.</p> : null}
        </section>

        <aside className="space-y-3">
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-white/[0.12] bg-white/[0.045] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-white">
              <Keyboard size={18} className="text-white" />
              Validación manual
            </div>
            <label className="text-sm text-white/[0.62]">
              Token o código
              <input ref={tokenRef} name="token" required className="mt-2 h-12 w-full rounded-2xl border border-white/[0.15] bg-black/[0.50] px-3 text-sm text-white outline-none transition focus:border-white/[0.55]" />
            </label>
            <Button className="mt-4 w-full">Validar passport</Button>
          </form>

          <div className={`rounded-[2rem] border p-5 shadow-[0_22px_80px_rgba(0,0,0,0.24)] ${statusClass}`}>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em]">
              <ResultIcon size={19} />
              {status === 'idle' ? 'Esperando código' : status === 'ok' ? 'Passport válido' : status === 'used' ? 'Ya utilizado' : status === 'cancelled' ? 'Cancelado' : 'Revisar entrada'}
            </div>
            <p className="mt-3 text-sm leading-6 opacity-85">{status === 'idle' ? 'Escanea un QR o introduce un token manualmente.' : message}</p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#f7f7f2] p-5 text-black shadow-[0_22px_80px_rgba(0,0,0,0.24)]">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-black/[0.45]">Door result</p>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="font-display text-5xl leading-[0.82] tracking-[-0.04em]">{resultLabel}</p>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-white">
                <ResultIcon size={22} />
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-black/[0.10] bg-white p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.20em] text-black/[0.42]">Guest</p>
                <p className="mt-1 truncate text-sm font-bold text-black/[0.72]">{status === 'idle' ? 'Pendiente' : message}</p>
              </div>
              <div className="rounded-2xl bg-black p-3 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.20em] text-white/[0.42]">Time</p>
                <p className="mt-1 text-sm font-bold text-white">{lastScanAt || '--:--:--'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/[0.12] bg-black/[0.32] p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-white/[0.42]">Prueba demo</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => fillDemoToken('DEMO-TOKEN-MARIA')} className="rounded-full border border-white/[0.15] px-4 py-2 text-xs font-bold text-white/[0.72] transition hover:border-white/[0.40] hover:bg-white/[0.06]">
                Activa
              </button>
              <button type="button" onClick={() => fillDemoToken('DEMO-TOKEN-LUCIA')} className="rounded-full border border-white/[0.15] px-4 py-2 text-xs font-bold text-white/[0.72] transition hover:border-white/[0.40] hover:bg-white/[0.06]">
                Cancelada
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
