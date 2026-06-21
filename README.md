# Haras Adham — Site web

Site officiel du Haras Adham, haras marocain spécialisé dans l'élevage, la compétition
et la préservation du Cheval Barbe.

- **Production** : https://haras-adham-nypr.vercel.app/
- **Stack** : Next.js 16 (App Router) · React 19 · TypeScript · Supabase · Cloudinary · Vercel
- **Langues** : FR / EN / ES / AR (avec RTL pour l'arabe)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (`next build --webpack`) |
| `npm run start` | Lancer le build de production |
| `npm run lint` | Vérification ESLint |

> Le build force le bundler **webpack** (`--webpack`) pour éviter un bug de Turbopack
> lié au fichier `middleware` lors du build de production.

## Variables d'environnement

À placer dans `.env.local` (et dans Vercel → Settings → Environment Variables) :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RESEND_API_KEY=
```

## Structure

| Chemin | Contenu |
|--------|---------|
| `src/app/` | Pages publiques et espace admin (une route = un dossier) |
| `src/app/api/` | Routes API serveur (auth, données admin, contact) |
| `src/app/admin/` | Espace d'administration |
| `src/components/` | Composants réutilisables |
| `src/lib/` | Supabase, traductions, authentification, types |
| `supabase/` | Scripts SQL (schéma, RLS, migrations) |
| `middleware.ts` | Protection des routes `/admin` |
| `next.config.ts` | Config Next.js + en-têtes de sécurité (CSP, etc.) |

## Administration

L'espace `/admin` est protégé par mot de passe (cookie de session sécurisé, jeton SHA-256).
Le mot de passe se change depuis **Admin → Config → Mot de passe administrateur**.

## Base de données

Supabase (PostgreSQL) avec RLS activée sur toutes les tables : lecture publique sur le
contenu, **aucune écriture anonyme** — toute mutation passe par les routes API serveur
(rôle `service_role`). Les migrations du dossier `supabase/` s'exécutent manuellement
dans Supabase → SQL Editor.

## Documentation

- **Documentation technique** : `Documentation_Technique_Haras_Adham_v2.pdf` (générable via `gen_pdf.py`)
- **Guide d'utilisation** (fonctionnel, pour l'admin) : `Guide_Utilisation_Haras_Adham.pdf` (générable via `gen_guide.py`)

## Déploiement

Déploiement continu sur Vercel : chaque push sur `main` déclenche un build et une mise
en production automatiques.
