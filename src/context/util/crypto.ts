import crypto from 'crypto'

export class Crypto {
  public readonly algorithm: string
  public readonly secretBuffer: Buffer
  public readonly ivBuffer: Buffer

  constructor(algorithm: string, secretBuffer: Buffer, ivBuffer: Buffer) {
    this.algorithm = algorithm
    this.secretBuffer = secretBuffer
    this.ivBuffer = ivBuffer
  }

  encrypt(text: string) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretBuffer,
      this.ivBuffer
    )
    if (!text) return text
    let result = cipher.update(text, 'utf8', 'base64')
    result += cipher.final('base64')
    return result
  }

  decrypt(encryptedText: string) {
    const cipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretBuffer,
      this.ivBuffer
    )
    if (!encryptedText) return encryptedText
    let result = cipher.update(encryptedText, 'base64', 'utf8')
    result += cipher.final('utf8')
    return result
  }
}

export class Algorithm {
  public readonly name: string
  public readonly secretBufferLength: number
  public readonly ivBufferLength: number

  constructor(
    name: string,
    secretBufferLength: number,
    ivBufferLength: number
  ) {
    this.name = name
    this.secretBufferLength = secretBufferLength
    this.ivBufferLength = ivBufferLength
  }

  createSecretBuffer(secret: string) {
    return Buffer.from(secret, 'utf8').slice(0, this.secretBufferLength)
  }
  createIvBuffer(secret: string) {
    return Buffer.from(secret, 'utf8').slice(0, this.ivBufferLength)
  }
  createCrypto(secret = process.env.OT_CRYPTO_SECRET) {
    return new Crypto(
      this.name,
      this.createSecretBuffer(secret),
      this.createIvBuffer(secret)
    )
  }
}

export const AES256_CBC = new Algorithm('aes-256-cbc', 32, 16)
// AES는 iv block size가 16으로 고정이지만 ecb모드는 iv를 사용하지 않으므로 0으로 해야한다.
export const AES128_ECB = new Algorithm('aes-128-ecb', 16, 0)
