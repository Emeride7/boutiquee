# Project Hub PWA — emeride7

Tableau de bord GitHub personnel. PWA installable sur mobile.

## Structure des fichiers

```
project-hub/
├── index.html      ← Application principale
├── sw.js           ← Service Worker (cache + offline)
├── manifest.json   ← Manifest PWA (installable)
├── icon-192.png    ← Icône 192×192 px  ← À CRÉER
├── icon-512.png    ← Icône 512×512 px  ← À CRÉER
└── README.md
```

## Déploiement sur GitHub Pages (recommandé)

1. Crée un nouveau repo GitHub : `project-hub`
2. Copie tous les fichiers à la racine du repo
3. Active GitHub Pages : Settings → Pages → Branch: main → / (root)
4. Ton app sera accessible sur :
   `https://emeride7.github.io/project-hub/`

## Créer les icônes

Les icônes sont nécessaires pour l'installation PWA.
Options simples :

### Option A — Générateur en ligne
- Va sur https://favicon.io/favicon-generator/
- Texte : "PH", couleur fond : #00e5a0, texte : #0a0a0f
- Télécharge et renomme en icon-192.png et icon-512.png

### Option B — Image SVG convertie
Utilise https://realfavicongenerator.net/ avec une image de ton choix.

### Option C — Utiliser ton avatar GitHub
```
curl -o icon-192.png "https://avatars.githubusercontent.com/emeride7?size=192"
curl -o icon-512.png "https://avatars.githubusercontent.com/emeride7?size=512"
```

## Installation sur téléphone

### Android (Chrome)
1. Ouvre l'URL dans Chrome
2. Menu ⋮ → "Ajouter à l'écran d'accueil"
3. Ou attends la bannière "Installer" en bas de l'app

### iPhone (Safari)
1. Ouvre l'URL dans Safari
2. Bouton Partager → "Sur l'écran d'accueil"
3. Confirme

## Fonctionnalités

- **API GitHub** : récupère tous les repos publics de emeride7
- **Cache 5 min** : évite les appels API répétés
- **Dark / Light mode** : toggle persisté en localStorage
- **Recherche** : filtre par nom, description et langage
- **Filtres par langage** : chips générées automatiquement
- **PWA installable** : manifest + service worker
- **Mode offline** : shell servi depuis le cache
- **Stats** : nombre de repos, stars totales, langages uniques

## Personnalisation

Dans `index.html`, ligne CONFIG :
```javascript
const CONFIG = {
  username: 'emeride7',   // ← Ton username GitHub
  perPage:  100,           // ← Nombre max de repos
  cacheTTL: 5 * 60 * 1000 // ← Durée du cache (ms)
};
```

## Notes techniques

- Zéro dépendance externe (sauf Google Fonts)
- HTML/CSS/JS vanilla uniquement
- API GitHub publique (60 requêtes/heure sans token)
- Pour dépasser la limite : ajoute un token dans les headers fetch
