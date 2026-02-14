SECURITY ISSUES DETECTED in src/config/database.ts

CRITICAL - Line 5: Hardcoded password
const DB_PASSWORD = "MySecretP@ss123";

Riesgo: Password expuesto en código fuente
Severidad: CRÍTICA
Solución: Usar variable de entorno

Recomendado:
const DB_PASSWORD = process.env.DB_PASSWORD;
if (!DB_PASSWORD) throw new Error('DB_PASSWORD not configured');

HIGH - Line 12: SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;

Riesgo: Inyección SQL permite ejecución de queries arbitrarias
Severidad: ALTA
Solución: Usar parameterized queries

Recomendado:
const query = 'SELECT * FROM users WHERE email = ?';
await db.execute(query, [email]);

MEDIUM - Line 25: Insecure random for security
const resetToken = Math.random().toString(36).substr(2);

Riesgo: Math.random() no es criptográficamente seguro
Severidad: MEDIA
Solución: Usar crypto.randomBytes

Recomendado:
import crypto from 'crypto';
const resetToken = crypto.randomBytes(32).toString('hex');


Total issues: 3 (1 critical, 1 high, 1 medium)

NO COMMITEAR hasta resolver issues críticos y altos
