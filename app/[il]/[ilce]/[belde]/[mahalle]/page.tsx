import postgres from "postgres"

async function fetchZipCode(city: string, district: string, town: string, neighborhood: string) {
    'use server'
    const sql = await postgres(process.env.DATABASE_URL as string)
    const q = sql`SELECT DISTINCT district, city, town, neighborhood, zip_code
    FROM neighborhoods WHERE city=${city} and district=${district} and town=${town} and neighborhood=${neighborhood};`
    const data = await q
    return data
}

export default async function Page({ params }: { params: { il: string, ilce: string, belde: string, mahalle: string } }) {
    const zipcode = await fetchZipCode(decodeURI(params.il), decodeURI(params.ilce), decodeURI(params.belde), decodeURI(params.mahalle))
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
            <h4>
                {decodeURI(params.mahalle)}
            </h4>
            <ul>

                <li>
                    {zipcode[0].zip_code}
                </li>


            </ul>
        </div>
    )
}
