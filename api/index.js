import { Hono } from 'hono'
import { cors } from 'hono/cors'
import gps from 'database/gps.json'
// import gpsInfo from 'database/gpsInfo.json'
// import gpsResults from 'database/gpsResults.json'

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
    return ctx.json(gps)
})

export default app
