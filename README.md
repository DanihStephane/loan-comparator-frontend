# MTX Frontend

Application frontend développée avec Next.js 14 et conteneurisée avec Docker pour un déploiement et un développement simplifiés. Interface utilisateur moderne du projet MTX.

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre environnement :

- **Docker** (version 20.10+) et **Docker Compose** (version 2.0+)
- **Make** pour l'exécution des commandes automatisées
- **Git** pour cloner le repository

## 🐳 Pourquoi Docker ?

L'utilisation de Docker apporte de nombreux avantages pour le développement frontend :

- **Isolation complète** : Environnement Node.js identique pour toute l'équipe
- **Portabilité** : Fonctionne sur Windows, macOS et Linux sans configuration
- **Déploiement simplifié** : Même environnement en développement et en production
- **Gestion des dépendances** : Plus de conflits entre versions de Node.js, npm, etc.
- **Setup rapide** : Installation et démarrage en une seule commande
- **Hot reload** : Rechargement automatique des modifications en développement
- **Build optimisé** : Image production légère avec build multi-stage

## 🚀 Quick Start

```bash
# Cloner le repository
git clone https://github.com/votre-username/mtx-frontend.git
cd mtx-frontend

# Construire et démarrer l'application
make build
make up

# Vérifier le bon fonctionnement
curl http://localhost:8081
```

L'application sera accessible sur :
- **Frontend Next.js** : http://localhost:8081
- **Application de développement** : Hot reload activé

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** (App Router + React 18)
- **Node.js 18** (Alpine Linux)
- **TypeScript** (typage statique)
- **Tailwind CSS** (framework CSS utilitaire)
- **React Hook Form + Zod** (gestion formulaires)

### DevOps
- **Docker Multi-stage Build** (optimisation des images)
- **Nginx Alpine** (serveur web léger)
- **Docker Compose** (orchestration des services)
- **Makefile** (automatisation des tâches)

### Qualité de Code
- **ESLint** (linting JavaScript/TypeScript)
- **Prettier** (formatage de code)
- **TypeScript** (vérification de types)

## 📁 Architecture Docker

```
mtx-frontend/
├── docker/
│   └── nginx/
│       └── nginx.conf
├── docker-compose.yml    # Configuration Docker Compose
├── Dockerfile           # Build multi-stage Next.js
├── Makefile            # Commandes automatisées
├── next.config.js      # Configuration Next.js
└── package.json        # Dépendances Node.js
```

### Services Docker

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| **nextjs-app** | `mtx-front` | 3000 | Application Next.js en mode développement |
| **nginx** | `mtx-nginx-front` | 8081→80 | Proxy reverse et serveur statique |

### Réseau Docker
- **mtx-network** : Réseau bridge pour communication inter-services
- Permet la connexion avec le backend MTX si nécessaire

## 📝 Commandes Disponibles

### Gestion Docker
```bash
make help              # Affiche toutes les commandes disponibles
make build             # Construit les images Docker
make up                # Démarre l'environnement de développement
make start             # Démarre les containers existants
make stop              # Arrête tous les containers
make restart           # Redémarre tous les containers
make logs              # Affiche les logs en temps réel
```

### Développement
```bash
make sh                # Accès shell au container Next.js
make clean             # Nettoyage complet (containers + images + volumes)
```

### Commandes dans le Container
```bash
# Accéder au container
make sh

# Commandes npm disponibles
npm run dev            # Mode développement (déjà lancé)
npm run build          # Build de production
npm run start          # Serveur de production
npm run lint           # Linting ESLint
npm run type-check     # Vérification TypeScript
```

## ⚙️ Configuration

### Variables d'Environnement

Les variables sont définies dans `docker-compose.yml` :

```yaml
environment:
  - NODE_ENV=development    # Mode développement
```

### Configuration Next.js

Le fichier `next.config.js` peut inclure :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour Docker
  output: 'standalone',
  
  // Variables d'environnement
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8080'
  },
  
  // Configuration pour production
  distDir: '.next',
  
  // Hot reload pour Docker
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
}

module.exports = nextConfig
```

### Nginx Configuration

Le proxy reverse Nginx (`docker/nginx/nginx.conf`) :

```nginx
events {
    worker_connections 1024;
}

http {
    upstream nextjs {
        server nextjs-app:3000;
    }
    
    server {
        listen 80;
        
        location / {
            proxy_pass http://nextjs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## 🧪 Développement et Tests

### Hot Reload
```bash
# Le hot reload est automatiquement configuré
# Les modifications de code sont immédiatement visibles
make up
# Modifier un fichier et voir les changements sur http://localhost:8081
```

### Debugging
```bash
# Accéder aux logs de l'application
make logs

# Débugger dans le container
make sh
npm run dev -- --inspect=0.0.0.0:9229
```

### Build de Production
```bash
# Build optimisé multi-stage
make build

# Tester le build de production
docker-compose exec nextjs-app npm run build
docker-compose exec nextjs-app npm run start
```

## 📦 Structure du Projet

```
src/
├── app/                 # App Router Next.js 14
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── components/          # Composants React réutilisables
├── lib/                 # Utilitaires et configuration
├── types/               # Types TypeScript
└── hooks/               # Hooks React personnalisés

public/                  # Assets statiques
├── images/
├── icons/
└── favicon.ico

styles/                  # Styles CSS/SCSS
├── globals.css
└── components.css
```

## 🔧 Développement Local

### Premier Démarrage
```bash
# 1. Cloner et se placer dans le dossier
git clone <repo-url> && cd mtx-frontend

# 2. Construire l'image Docker
make build

# 3. Démarrer l'environnement de développement
make up

# 4. Vérifier que tout fonctionne
open http://localhost:8081
```

### Workflow de Développement
```bash
# Démarrer la journée
make up

# Voir les logs pendant le développement
make logs

# Accéder au shell pour des commandes npm
make sh

# Redémarrer si nécessaire
make restart

# Fin de journée
make stop
```

### Ajout de Dépendances
```bash
# Accéder au container
make sh

# Installer une nouvelle dépendance
npm install nouvelle-dependance

# Pour sauvegarder dans package.json depuis l'host
# Les volumes Docker synchronisent automatiquement
```

## 🚀 Production

### Build Optimisé
```bash
# Le Dockerfile utilise un build multi-stage
# Stage 1: Build avec toutes les dépendances
# Stage 2: Image légère avec seulement le nécessaire

make build
```

### Variables de Production
Créer un fichier `.env.local` pour la production :
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

### Déploiement
```bash
# Build de production
docker-compose -f docker-compose.prod.yml build

# Démarrage en production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔗 Intégration avec le Backend MTX

### Communication API
```typescript
// Configuration de base pour l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Exemple d'appel API
export async function fetchData() {
  const response = await fetch(`${API_BASE_URL}/api/endpoint`)
  return response.json()
}
```

### Réseau Docker Partagé
Si le backend et frontend partagent le même réseau Docker :

```yaml
# Dans docker-compose.yml
networks:
  mtx-network:
    external: true  # Utilise le réseau créé par le backend
```

## 🧹 Maintenance

### Nettoyage Complet
```bash
# Supprimer tous les containers, images et volumes
make clean

# Reconstruire complètement
make build
make up
```

### Mise à Jour des Dépendances
```bash
make sh
npm update
npm audit fix
```

## 🤝 Contribution

1. **Fork** le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Tester** le code (`npm run lint && npm run type-check`)
4. **Commit** (`git commit -m 'Ajout nouvelle fonctionnalité'`)
5. **Push** (`git push origin feature/nouvelle-fonctionnalite`)
6. Créer une **Pull Request**

## 📞 Support

- **Issues** : Ouvrir un ticket sur GitHub
- **Documentation Next.js** : [Next.js Documentation](https://nextjs.org/docs)
- **Docker** : [Documentation Docker Compose](https://docs.docker.com/compose/)

---

## 🎯 Points Techniques Clés

- **Next.js 14** avec App Router pour les dernières fonctionnalités
- **Build multi-stage** pour optimiser la taille des images
- **Hot reload** configuré pour Docker avec polling
- **TypeScript strict** pour la sécurité des types
- **Nginx** comme proxy reverse pour la production
- **Volume mapping** pour le développement en temps réel
- **Réseau Docker** pour communication avec d'autres services
- **Standards modernes** React 18, ES2022, CSS moderne

## 💡 Prochaines Améliorations

- [ ] Ajout de tests avec Jest et React Testing Library
- [ ] Configuration Storybook pour la documentation des composants
- [ ] PWA avec Service Workers
- [ ] Optimisation des images avec next/image
- [ ] Analytics avec Google Analytics ou alternatives
- [ ] SEO avancé avec next/head et métadonnées
- [ ] Monitoring avec Sentry
- [ ] CI/CD avec GitHub Actions pour les tests et déploiements

## 🔧 Troubleshooting

### Problèmes Courants

**Hot reload ne fonctionne pas :**
```bash
# Vérifier la configuration webpack dans next.config.js
# Redémarrer le container
make restart
```

**Port 8081 déjà utilisé :**
```bash
# Modifier le port dans docker-compose.yml
ports:
  - "8082:80"  # Utiliser 8082 au lieu de 8081
```

**Build lent :**
```bash
# Utiliser le cache Docker
docker-compose build --parallel
```