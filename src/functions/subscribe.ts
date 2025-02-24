import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'
import { redis } from '../redis/client'

interface Subscribe {
  name: string
  email: string
  referral?: string | null
}

export async function Subscribe({ name, email, referral }: Subscribe) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  const [{ subscriberId }] = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning(
      {
        subscriberId: subscriptions.id,
      }
    )

  if (referral) {
    await redis.zincrby('referral:ranking', 1, referral)
  }


  return {
    subscriberId
  }
}
