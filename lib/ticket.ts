import { randomBytes } from 'crypto'
import QRCode from 'qrcode'

export function generateUniqueToken() {
  return randomBytes(18).toString('hex')
}

export async function generateQrPng(token: string) {
  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/ticket/${token}`
  return QRCode.toBuffer(url, { width: 1000, errorCorrectionLevel: 'H' })
}

export async function generateQrDataUrl(token: string) {
  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/ticket/${token}`
  return QRCode.toDataURL(url, { width: 1000, errorCorrectionLevel: 'H' })
}

export function isAppleWalletConfigured() {
  return Boolean(
    process.env.APPLE_PASS_TYPE_ID &&
      process.env.APPLE_TEAM_ID &&
      process.env.APPLE_CERT_PATH &&
      process.env.APPLE_KEY_PATH &&
      process.env.APPLE_WWDR_CERT_PATH
  )
}

export function isGoogleWalletConfigured() {
  return Boolean(
    process.env.GOOGLE_WALLET_ISSUER_ID &&
      process.env.GOOGLE_WALLET_CLASS_ID &&
      process.env.GOOGLE_APPLICATION_CREDENTIALS
  )
}
