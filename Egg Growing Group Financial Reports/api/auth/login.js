import crypto from 'crypto'

const SECRET = process.env.SESSION_SECRET || 'jre-financial-secret-2026-xK9mP'
const PASSWORD = process.env.DASHBOARD_PASSWORD || '8997'

function makeToken() {
  const expires = Date.now() + 4 * 60 * 60 * 1000 // 4 hour hard cap
  const payload = `${expires}`
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const body = await new Promise((resolve) => {
    let raw = ''
    req.on('data', chunk => raw += chunk)
    req.on('end', () => resolve(Object.fromEntries(new URLSearchParams(raw))))
  })

  if (body.password === PASSWORD) {
    const token = makeToken()
    // Session cookie — dies when browser closes
    res.setHeader('Set-Cookie', `jre_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`)
    // Redirect to bridge page which sets sessionStorage then goes to dashboard
    res.writeHead(302, { Location: '/auth/bridge' })
    res.end()
  } else {
    res.writeHead(302, { Location: '/login?error=1' })
    res.end()
  }
}
