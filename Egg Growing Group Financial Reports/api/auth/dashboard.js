import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

const SECRET = process.env.SESSION_SECRET || 'jre-financial-secret-2026-xK9mP'

function verifyToken(token) {
  if (!token) return false
  const dotIndex = token.lastIndexOf('.')
  if (dotIndex === -1) return false
  const payload = token.slice(0, dotIndex)
  const sig = token.slice(dotIndex + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  if (sig.length !== expected.length) return false
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return false
  } catch {
    return false
  }
  const expires = parseInt(payload, 10)
  return !isNaN(expires) && Date.now() < expires
}

// Injected into every served page — checks sessionStorage on load.
// sessionStorage is per-tab: new tab = empty = forces re-login.
const AUTH_GUARD = `<script>
(function(){
  if(!sessionStorage.getItem('jre_tab_auth')){
    document.cookie='jre_session=; Max-Age=0; Path=/';
    window.location.replace('/login');
  }
})();
</script>`

const FILE_MAP = {
  '/':                   'pages/full-model.html',
  '/full-model':         'pages/full-model.html',
  '/ceo-report':         'pages/ceo-report.html',
  '/cos-report':         'pages/cos-report.html',
  '/debtors':            'pages/debtors.html',
  '/timesheets':         'pages/timesheets.html',
  '/fortnightly-hours':  'pages/fortnightly-hours.html',
}

export default function handler(req, res) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').filter(Boolean).map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k.trim(), v.join('=')]
    })
  )

  if (!verifyToken(cookies['jre_session'])) {
    res.setHeader('Set-Cookie', 'jre_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0')
    res.setHeader('Cache-Control', 'no-store')
    res.writeHead(302, { Location: '/login' })
    res.end()
    return
  }

  const urlPath = req.url?.split('?')[0] || '/'
  const file = FILE_MAP[urlPath] || 'pages/full-model.html'

  let html = fs.readFileSync(path.join(process.cwd(), file), 'utf8')

  // Inject the per-tab auth guard into the page
  if (html.includes('</head>')) {
    html = html.replace('</head>', AUTH_GUARD + '</head>')
  } else {
    html = AUTH_GUARD + html
  }

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  res.status(200).send(html)
}
