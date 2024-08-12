import type { Encrypter } from '@/data/protocols/cryptography/encrypter'
import type { Decrypter } from '@/data/protocols/cryptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }

  async encrypt (plainText: string): Promise<string> {
    const cipherText = jwt.sign({ id: plainText }, this.secret)

    return cipherText
  }

  async decrypt (cipherText: string): Promise<string> {
    const plainText: any = jwt.verify(cipherText, this.secret)
    return plainText
  }
}
