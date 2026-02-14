# Security Scan

## Trigger: On File Save
## Pattern: **/*.{ts,tsx,js,jsx,env,config.js}

Cuando se guarda cualquier archivo de código o configuración:

**Objetivo:** Detectar vulnerabilidades y secretos expuestos inmediatamente.

**Escanear para:**

1. **Credenciales hardcodeadas:**
- API keys: patrones como `api_key=`, `apikey:`, `API_KEY`
- Passwords: `password=`, `pwd=`, `passwd:`
- Tokens: `token=`, `auth_token`, `bearer`
- Private keys: `-----BEGIN PRIVATE KEY-----`
- AWS credentials: `AKIA[0-9A-Z]{16}`
- JWT tokens: `eyJ[a-zA-Z0-9-_.]+`

2. **Vulnerabilidades comunes:**

**SQL Injection:**
typescript
// Vulnerable
db.query(`SELECT * FROM users WHERE email = '${email}'`)

// Seguro
db.query('SELECT * FROM users WHERE email = ?', [email])


**XSS:**
typescript
// Vulnerable
element.innerHTML = userInput

// Seguro
element.textContent = userInput
// O usa librería de sanitización


**Path Traversal:**
typescript
// Vulnerable
fs.readFile(`./files/${userFilename}`)

// Seguro
const safePath = path.join('./files', path.basename(userFilename))


**Insecure Random:**
typescript
// Vulnerable para seguridad
const token = Math.random().toString(36)

// Seguro
const token = crypto.randomBytes(32).toString('hex')


3. **Configuraciones inseguras:**
- CORS: `Access-Control-Allow-Origin: *` en producción
- HTTPS: `http://` URLs en configuración de producción
- Debug mode habilitado: `DEBUG=true` en producción
- Cookies sin flags seguros: falta `httpOnly`, `secure`, `sameSite`

4. **Datos sensibles:**
- Números de tarjeta (regex de Luhn algorithm)
- Social Security Numbers
- Direcciones IP internas en logs
- PII (Personal Identifiable Information) en logs

**Excepciones:**
- Archivos .env.example (son templates)
- Tests (pueden tener datos fake)
- Archivos con comentario: `// security-scan: ignore-file`
- Líneas con comentario: `// security-scan: ignore-line`
