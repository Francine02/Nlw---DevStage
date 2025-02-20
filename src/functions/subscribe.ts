import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'

interface Subscribe {
  name: string
  email: string
}

export async function subscribe({ name, email }: Subscribe) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
