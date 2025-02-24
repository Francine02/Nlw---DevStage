import { redis } from '../redis/client'

interface SubscriberRankingPosition {
  subscriberId: string
}

export async function SubscriberRankingPosition({ subscriberId }: SubscriberRankingPosition) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if(rank === null) {
    return { position: null}
  }
  return { position: rank + 1 }
}
