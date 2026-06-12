// After successful login, this page sets sessionStorage then redirects to the dashboard.
// sessionStorage is tab-isolated — opening a new tab clears it, forcing re-login.
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).send(`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<script>
  sessionStorage.setItem('jre_tab_auth', '1');
  window.location.replace('/');
</script>
</body>
</html>`)
}
