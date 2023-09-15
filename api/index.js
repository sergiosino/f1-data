import { Hono } from 'hono'
import { cors } from 'hono/cors'
import gps from 'database/gps.json'
import gpsInfo from 'database/gpsInfo.json'
import gpsResults from 'database/gpsResults.json'

const app = new Hono()

app.use(cors({ origin: '*' }))

app.get('/', (ctx) =>
    ctx.json([
        {
            name: 'gps',
            endpoint: '/gps',
            description: 'Returns all the GPs of the season'
        }
    ])
)

app.get('/gps', (ctx) => {
    const response = []

    gps.forEach(gp => {
        const { id, round, image, name, circuitName } = gp

        // Prepare gp info
        const gpInfo = gpsInfo.find(x => x.id === id)
        const start = gpInfo.calendar[0].start
        const end = gpInfo.calendar[gpInfo.calendar.length - 1].end

        // Prepare gp results
        const gpResults = gpsResults.find(x => x.id === id)
        const isCompleted = gpResults.isCompleted
        let topThree = []
        if(isCompleted) {
            const gpRaceResults = gpResults.events.find(x => x.shortName === 'Race')?.results ?? []
            const gpRaceResultsTopThree = gpRaceResults.slice(0, 3)
            topThree = gpRaceResultsTopThree.map(({rank, driver}) => {
                const { nameCode } = driver
                const nameCodeLowerCase = nameCode.toLowerCase()
                return {
                    rank,
                    nameCode,
                    image: `${nameCodeLowerCase}.png`
                }
            })
        }

        response.push({
            id,
            round,
            image,
            name,
            circuitName,
            start,
            end,
            isCompleted,
            topThree
        })
    })
    
    return ctx.json(response)
})

export default app
