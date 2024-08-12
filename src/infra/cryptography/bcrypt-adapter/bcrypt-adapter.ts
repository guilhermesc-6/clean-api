import type { Hasher } from '@/data/protocols/cryptography/hasher'
import type { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (plainText: string): Promise<string> {
    const hash = await bcrypt.hash(plainText, this.salt)
    return hash
  }

  async compare (plainText: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plainText, digest)
    return isValid
  }
}
