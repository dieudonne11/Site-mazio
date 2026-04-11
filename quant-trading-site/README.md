# QuantFlow - Plateforme de Trading Quantitatif

## 🚀 Vue d'ensemble

QuantFlow est une Single Page Application (SPA) moderne dédiée au trading quantitatif, conçue avec une interface utilisateur impressionnante et des fonctionnalités de démonstration en temps réel.

## ✨ Fonctionnalités

### Design UI/UX
- **Thème sombre professionnel** inspiré des plateformes fintech modernes
- **Animations fluides** et effets de glow pour une expérience immersive
- **Responsive design** adapté à tous les appareils (mobile, tablette, desktop)
- **Typographie soignée** avec Inter et JetBrains Mono

### Sections du Site
1. **Accueil** - Présentation avec statistiques animées et graphique de performance
2. **Fonctionnalités** - 6 cartes présentant les capacités de la plateforme
3. **Démo Live** - Simulation de trading en temps réel avec:
   - Graphique BTC/USD mis à jour en direct
   - Order Book dynamique (Bid/Ask)
   - Stratégies de trading actives
   - Historique des trades
   - Métriques de performance (P&L, Win Rate, Sharpe Ratio)
   - Terminal de commandes simulé
   - Exemple de code Python
4. **Tarifs** - 3 plans (Starter, Professional, Enterprise)
5. **Contact** - Formulaire fonctionnel et informations de contact

### Interactivités
- Navigation SPA sans rechargement de page
- Graphiques Chart.js animés
- Données de marché simulées en temps réel
- Compteurs statistiques animés
- Effets de hover sur les cartes
- Menu mobile responsive

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **Tailwind CSS** (via CDN) - Framework CSS utilitaire
- **JavaScript Vanilla** - Logique applicative
- **Chart.js** - Visualisation de données
- **Font Awesome** - Icônes
- **Google Fonts** - Typographie (Inter, JetBrains Mono)

## 📁 Structure du Projet

```
quant-trading-site/
├── index.html          # Page principale (SPA)
├── js/
│   └── app.js         # Logique JavaScript
├── css/               # Dossier pour styles personnalisés (optionnel)
├── assets/            # Ressources multimedia (optionnel)
└── README.md          # Documentation
```

## 🚀 Installation et Lancement

### Option 1: Serveur HTTP Python
```bash
cd quant-trading-site
python3 -m http.server 8080
# Accédez à http://localhost:8080
```

### Option 2: Ouvrir directement dans le navigateur
```bash
# Double-cliquez sur index.html ou ouvrez-le avec votre navigateur
```

### Option 3: Extension Live Server (VS Code)
- Installez l'extension "Live Server"
- Clic droit sur index.html → "Open with Live Server"

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `<style>` pour changer la palette:
```css
:root {
    --primary: #00D4AA;      /* Couleur principale (emerald) */
    --secondary: #7C3AED;    /* Couleur secondaire (purple) */
    --accent: #F59E0B;       /* Couleur d'accent (amber) */
}
```

### Contenu
- Les textes sont directement dans `index.html`
- Les données de simulation sont dans `js/app.js` (objet `state`)

## 📊 Fonctionnalités de Démo

La section Démo Live inclut:
- **Mise à jour automatique** des prix BTC toutes les 2 secondes
- **Order Book** rafraîchi chaque seconde
- **Trades aléatoires** générés automatiquement
- **Stratégies** avec P&L fluctuant
- **Terminal** avec messages système

## 🔧 Points Techniques Notables

1. **Architecture SPA** - Navigation sans rechargement via JavaScript
2. **Gestion d'état** - Objet `state` centralisé pour les données
3. **Rafraîchissement efficace** - Utilisation de `setInterval` pour les updates
4. **Charts dynamiques** - Mise à jour en temps réel avec Chart.js
5. **Accessibilité** - Balises sémantiques et contrastes de couleurs

## 📱 Responsive Design

Le site s'adapte automatiquement:
- **Desktop** (> 768px): Menu complet, grille 3 colonnes
- **Mobile** (< 768px): Menu hamburger, grille 1 colonne

## 🎯 Bonnes Pratiques Implémentées

- Code propre et commenté
- Séparation HTML/CSS/JS
- Variables CSS pour la maintenabilité
- Events délégués pour la performance
- Animations CSS optimisées
- Pas de dépendances lourdes

## 📄 Licence

Ce projet est fourni à titre de démonstration.

---

**Développé avec ❤️ pour la Fintech**
