import { Hono } from 'hono'
import gps from 'database/gps.json'

const app = new Hono()

app.get('/', ctx => ctx.json(gps))

export default app
