import { redis } from '../redis/client'

interface QuantityInvitesCountParams {
  subscriberId: string
}

export async function QuantityInvitesCount({ subscriberId }: QuantityInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
