declare module 'qrcode' {
  type QrOptions = {
    width?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  }

  const QRCode: {
    toBuffer(text: string, options?: QrOptions): Promise<Buffer>
    toDataURL(text: string, options?: QrOptions): Promise<string>
  }

  export default QRCode
}
