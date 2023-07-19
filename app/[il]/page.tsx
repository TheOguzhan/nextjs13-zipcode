import Link from "next/link"
import postgres from "postgres"

async function fetchIlceler(city: string) {
    'use server'
    const sql = await postgres(process.env.DATABASE_URL as string)
    const q = sql`SELECT DISTINCT district, city FROM neighborhoods WHERE city = ${city};`
    const data = await q
    return data
}

export default async function Il({ params }: { params: { il: string } }) {
    const ilceler = await fetchIlceler(decodeURI(params.il))
    return (
        <div>
            <h1>
                {decodeURI(params.il)}
            </h1>
            <ul>
                {ilceler.map(ilce => (
                    <li key={ilce.district}>
                        <Link
                            href={`/${encodeURI(ilce.city)}/${encodeURI(ilce.district)}`}
                            className="text-white text-lg hover:underline"
                        >
                            {ilce.district}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
