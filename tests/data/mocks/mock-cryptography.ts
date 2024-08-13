import type { Decrypter, Encrypter, HashComparer, Hasher } from '@/data/protocols'
import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
  digest = faker.string.uuid()
  plainText: string

  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return await Promise.resolve(this.digest)
  }
}

export class HashComparerSpy implements HashComparer {
  digest: string
  plainText: string
  isValid = true

  async compare (plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText
    this.digest = digest

    return await Promise.resolve(this.isValid)
  }
}

export class EncrypterSpy implements Encrypter {
  cipherText = faker.string.uuid()
  plainText: string

  async encrypt (plainText: string): Promise<string> {
    this.plainText = plainText
    return await Promise.resolve(this.cipherText)
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (cipherText: string): Promise<string> {
    this.ciphertext = cipherText
    return await Promise.resolve(this.plaintext)
  }
}
