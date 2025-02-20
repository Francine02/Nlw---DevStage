import { redis } from '../redis/client'

interface AcessParams {
  subscriberId: string
}

export async function acess({ subscriberId }: AcessParams) {
  await redis.hincrby('referral:acess-count', subscriberId, 1) //hincrby = hashs {}
}
