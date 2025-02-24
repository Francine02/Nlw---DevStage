import { redis } from '../redis/client'

interface InvitesParams {
  subscriberId: string
}

export async function QuantityInvites({ subscriberId }: InvitesParams) {
  const count = await redis.hget('referral:acess-count', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
