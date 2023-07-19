import Link from "next/link"
import postgres from "postgres"

async function fetchMahalleler(city: string, district: string, town: string) {
    'use server'
    const sql = await postgres(process.env.DATABASE_URL as string)
    const q = sql`SELECT DISTINCT district, city, town, neighborhood
     FROM neighborhoods WHERE city=${city} and district=${district} and town=${town};`
    const data = await q
    return data 
}

export default async function Page({ params }: { params: { il: string, ilce: string, belde: string } }) {
    const mahalleler = await fetchMahalleler(decodeURI(params.il), decodeURI(params.ilce), decodeURI(params.belde))
    return (
        <div>
            <h1>
                {decodeURI(params.il)}
            </h1>
            <h2>
                {decodeURI(params.ilce)}
            </h2>
            <h3>
                {decodeURI(params.belde)}
            </h3>
            <ul>
                {
                    mahalleler.map(mahalle => (
                        <li key={mahalle.neighborhood}>
                            <Link
                                href={`/${encodeURI(mahalle.city)}/${encodeURI(mahalle.district)}/${encodeURI(mahalle.town)}/${encodeURI(mahalle.neighborhood)}`}
                                className="text-white text-lg hover:underline"
                            >
                                {mahalle.neighborhood}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
