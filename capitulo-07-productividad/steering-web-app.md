# Steering: Web App

## Contexto
Esta es la app web (Next.js) del monorepo.
Comparte código con mobile vía packages/shared.

## Imports de Shared
Importa desde shared así:
import { Button } from '@acme/shared/components';
import { formatDate } from '@acme/shared/utils';

## Web-Specific
Features que NO van a shared (solo web):
- SEO components (meta tags, structured data)
- Server-side rendering logic
- Web-specific analytics (Google Analytics)
