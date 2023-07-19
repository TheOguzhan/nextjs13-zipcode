import Link from "next/link"
import postgres from "postgres"

async function fetchBeldeler(city: string, district: string) {
    'use server'
    const sql = await postgres(process.env.DATABASE_URL as string)
    const q = sql`SELECT DISTINCT district, city, town FROM neighborhoods WHERE city=${city} and district=${district};`
    const data = await q
    return data
}

export default async function Page({ params }: { params: { il: string, ilce: string } }) {
    const beldeler = await fetchBeldeler(decodeURI(params.il), decodeURI(params.ilce))
    return (
        <div>
            <h1>
                {decodeURI(params.il)}
            </h1>
            <h2>
                {decodeURI(params.ilce)}
            </h2>
            <ul>

                {
                    beldeler.map(belde => (
                        <li key={belde.town}>
                            <Link
                                href={`/${encodeURI(belde.city)}/${encodeURI(belde.district)}/${encodeURI(belde.town)}`}
                                className="text-white text-lg hover:underline"
                            >
                                {belde.town}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
