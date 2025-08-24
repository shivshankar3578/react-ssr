export const Html = ({ content, data }: { content: string, data: any }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Hono + React SSR</title>
      <link rel="stylesheet" href="./index.css" />
    </head>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_ITEMS__ = ${JSON.stringify(data)};`,
      }}
    />
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}></div>
      <script type="module" src="/src/web/hydrate.client.tsx"></script>
    </body>
  </html>
);