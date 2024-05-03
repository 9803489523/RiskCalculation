import type { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer({
  target: `http://localhost:8080/`,
  changeOrigin: true,
})

export default function (req: IncomingMessage, res: ServerResponse, next) {
  const prefix = '/api'
  if (req.url.startsWith(prefix)) {
    const extraOptions = {}
    proxy.web(req, res, extraOptions)
  } else {
    next()
  }
}