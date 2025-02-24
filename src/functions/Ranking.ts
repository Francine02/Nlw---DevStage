import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { redis } from '../redis/client'
import { subscriptions } from '../drizzle/tables/subscriptions'

export async function Ranking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map(s => {
      return {
        id: s.id,
        name: s.name,
        score: subscriberIdAndScore[s.id],
      }
    })
    .sort((s1, s2) => {
      return s2.score - s1.score
    })

  return { rankingWithScore }
}
