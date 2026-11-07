import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import bcrypt from 'bcryptjs'

export async function hashPassword(
  password: string,
): Promise<string> {
  const saltRounds = 12

  return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}


export function generateToken(
  adminId: string,
  tokenVersion: number,
): string {
  return jwt.sign(
    { adminId, tokenVersion },
    env.jwtSecret,
    { expiresIn: '1d' },
  )
}