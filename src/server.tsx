import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import App from './web/app'
import { Html } from './web/template.html'
import { now } from './web/app.types'

const app = new Hono()

app.get('/', (c) => {
  const items = [{ title: "welcome to ssr", dueDate: now, dueDays: 0 }]
  const content = renderToString(<App items={items} />)
  return c.html(renderToString(<Html content={content} data={items} > </Html>));
})

app.get('/health', (c) => {
  return c.json({ status: 200, msg: "server is running good" })
})

export default app