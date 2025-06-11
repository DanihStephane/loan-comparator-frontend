# Project Structure

src/
├── app/                         # Pages principales de l'application (Next.js App Router)
│   ├── (public)/                # Pages accessibles sans authentification
│   │   ├── home/                # Page d'accueil
│   │   │   ├── page.tsx         # Composant principal de la page
│   │   │   ├── styles.module.css# Styles spécifiques à la page
│   │   │   └── index.ts         # Exports des fonctions ou composants liés
│   │   ├── vehicles/            # Liste des véhicules disponibles
│   │   │   ├── page.tsx         # Composant principal
│   │   │   └── VehicleCard.tsx  # Composant pour un véhicule individuel
│   │   ├── booking/             # Réservation
│   │   │   ├── page.tsx         # Page principale
│   │   │   ├── BookingForm.tsx  # Formulaire de réservation
│   │   │   ├── validation.ts    # Validation avec Zod
│   │   │   └── helpers.ts       # Fonctions auxiliaires pour les réservations
│   │   ├── auth/                # Pages liées à l'authentification
│   │   │   ├── login/           # Connexion utilisateur
│   │   │   │   ├── page.tsx
│   │   │   │   └── LoginForm.tsx
│   │   │   └── register/        # Inscription utilisateur
│   │       ├── page.tsx
│   │       └── RegistrationForm.tsx
│   ├── (protected)/             # Pages nécessitant une authentification
│   │   ├── profile/             # Profil utilisateur
│   │   │   ├── page.tsx
│   │   │   └── Settings.tsx
│   │   ├── my-bookings/         # Réservations de l'utilisateur
│   │   │   ├── page.tsx
│   │   │   └── BookingDetails.tsx
│   ├── (admin)/                 # Pages d'administration
│   │   ├── dashboard/           # Tableau de bord
│   │   │   ├── page.tsx
│   │   │   ├── VehicleManagement.tsx
│   │   │   ├── BookingManagement.tsx
│   │   │   └── PricingManagement.tsx
│   │   ├── analytics/           # Analyses et statistiques
│   │   │   ├── page.tsx
│   │   │   └── Charts.tsx
│   ├── layout1.tsx               # Layout principal de l'application
│   ├── error.tsx                # Gestion des erreurs globales
│   └── global.css               # Styles globaux
├── features/                    # Fonctionnalités indépendantes (fonctionnellement isolées)
│   ├── booking/                 # Fonctionnalité de réservation
│   │   ├── components/          # Composants spécifiques
│   │   ├── hooks/               # Hooks spécifiques
│   │   ├── utils/               # Fonctions utilitaires
│   │   └── api.ts               # Appels API liés à la réservation
│   ├── vehicle/                 # Fonctionnalité des véhicules
│   │   ├── components/          # Composants spécifiques
│   │   ├── hooks/               # Hooks spécifiques
│   │   └── api.ts               # Appels API liés aux véhicules
│   └── auth/                    # Fonctionnalité d'authentification
│       ├── components/          # Composants spécifiques
│       ├── hooks/               # Hooks spécifiques
│       └── api.ts               # Appels API liés à l'authentification
├── shared/                      # Ressources partagées dans l'application
│   ├── components/              # Composants réutilisables
│   │   ├── Button.tsx           # Bouton
│   │   ├── Modal.tsx            # Modale
│   │   ├── Navbar.tsx           # Barre de navigation
│   │   └── Footer.tsx           # Pied de page
│   ├── hooks/                   # Hooks personnalisés partagés
│   │   ├── useAuth.ts           # Hook pour la gestion de l'authentification
│   │   ├── useFetch.ts          # Hook pour les appels API
│   │   └── usePagination.ts     # Pagination générique
│   ├── utils/                   # Fonctions utilitaires partagées
│   │   ├── apiClient.ts         # Client HTTP
│   │   ├── validationHelpers.ts # Fonctions de validation
│   │   └── formatters.ts        # Fonctions de mise en forme (dates, prix, etc.)
│   ├── constants/               # Constantes globales
│   │   ├── apiEndpoints.ts      # Endpoints de l'API
│   │   └── appConfig.ts         # Configuration de l'application
│   ├── types/                   # Types TypeScript partagés
│   │   ├── auth.ts              # Types pour l'authentification
│   │   ├── booking.ts           # Types pour les réservations
│   │   └── vehicle.ts           # Types pour les véhicules
├── redux/                       # Gestion de l'état avec Redux
│   ├── store.ts                 # Configuration du store Redux
│   ├── slices/                  # Slices Redux
│   │   ├── authSlice.ts         # Slice pour l'authentification
│   │   ├── bookingSlice.ts      # Slice pour les réservations
│   │   └── vehicleSlice.ts      # Slice pour les véhicules
├── public/                      # Fichiers statiques
│   ├── images/                  # Images statiques
│   ├── icons/                   # Icônes
│   └── favicon.ico              # Favicon
├── styles/                      # Styles globaux et partagés
│   ├── globals.css              # Styles globaux
│   ├── themes.css               # Thèmes (light/dark)
│   ├── variables.css            # Variables CSS
│   └── shadcn.css               # Styles pour ShadCN UI
└── tests/                       # Tests automatisés
    ├── unit/                    # Tests unitaires
    ├── integration/             # Tests d'intégration
    └── e2e/                     # Tests de bout en bout (end-to-end)
