import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { contextStorage } from 'hono/context-storage'
import { logger } from 'hono/logger'
import { requestId, RequestIdVariables } from 'hono/request-id'
import { Html } from './web/template.html'
import App from './web/app'
import { renderToString } from 'react-dom/server'
import { date } from './web/app.types'

type Env = {
  Variables: RequestIdVariables
}
const app = new Hono<Env>()
app.use('*', requestId())
app.use(contextStorage())

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))
app.use(logger())

app.get('/', (c) => {
  const items = [
    { id: 1, title: "welcome to ssr", dueDate: date(), dueDays: 0 },
    { id: 2, title: "doctor's visit", dueDate: date(2), dueDays: 2 }
  ]
  const content = renderToString(<App items={items} />)
  return c.html(renderToString(<Html content={content} data={items}></Html>));
})

const port = parseInt(process.env.PORT!) || 3000
console.log(`Running at http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch
};
