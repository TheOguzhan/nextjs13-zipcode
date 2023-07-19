import Link from "next/link"
import postgres from "postgres"

async function fetchIller() {
  'use server'
  const sql = await postgres(process.env.DATABASE_URL as string)
  const data = await sql`SELECT DISTINCT city FROM neighborhoods;`
  return data
}

export default async function Page() {
  const iller = await fetchIller()
  return (
    <div className="">
      <ul>
        {iller.map(il => (
          <li key={il.city}>
            <Link href={`/${encodeURI(il.city)}`} className="text-white text-lg hover:underline">
              {il.city}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
