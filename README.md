# TrustCheck - Sistema di Feedback Vendor SMOCARNO

![TrustCheck Logo](https://img.shields.io/badge/TrustCheck-SMOCARNO-50623A?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-SHA256-84CC16?style=for-the-badge)
![License](https://img.shields.io/badge/License-Community-E63946?style=for-the-badge)

Sistema trasparente di recensioni e valutazioni vendor per la community SMOCARNO. Piattaforma dedicata alla riduzione del danno attraverso la condivisione consapevole di esperienze.

---

## 📋 Indice

- [Panoramica](#-panoramica)
- [Funzionalità](#-funzionalità)
- [Struttura Progetto](#-struttura-progetto)
- [Pannello Admin](#-pannello-admin)
- [Sicurezza](#-sicurezza)
- [Installazione](#-installazione)
- [Configurazione](#-configurazione)
- [Utilizzo](#-utilizzo)
- [Privacy & GDPR](#-privacy--gdpr)
- [Roadmap](#-roadmap)
- [Contribuire](#-contribuire)

---

## 🎯 Panoramica

TrustCheck è un sistema web statico (HTML/CSS/JavaScript) progettato per offrire:

- **Valutazioni trasparenti** di vendor basate su feedback reale della community
- **Sistema multi-dimensionale** di rating (Affidabilità, Qualità, Comunicazione, Sicurezza, Tempi)
- **Badge di riconoscimento** automatici basati su performance
- **Pannello amministrativo sicuro** per gestione vendor
- **Integrazione con Telegram** per comunicazione community
- **Privacy-first design** con zero tracking invasivo

### Design System

**Palette Colori:**
- Primary: `#50623A` (Verde militare)
- Accent: `#84CC16` (Verde lime)
- Alert: `#E63946` (Rosso)
- Success: `#52B788` (Verde successo)
- Warning: `#F4A261` (Arancione)

**Tipografia:**
- Display: Space Grotesk
- Body: Inter

**Dark Mode:** Supporto nativo con toggle persistente

---

## ✨ Funzionalità

### Sito Pubblico

#### Homepage (`index.html`)
- Hero section con call-to-action
- Statistiche community in tempo reale
- Sezione "Come Funziona" (4 step)
- Trust elements (Anonimato, Moderazione, Community-Driven, Badge)
- Integrazione Telegram con link ai canali
- Footer con disclaimer e link admin discreto

#### Pagina Vendor (in sviluppo)
- Lista vendor con filtri avanzati
- Ricerca in tempo reale
- Rating visuale con stelle
- Badge categorizzati
- Modale dettaglio vendor
- Recensioni utenti

#### Form Recensione (in sviluppo)
- Rating multi-dimensionale (5 metriche)
- Slider interattivi (0-5, step 0.5)
- Campo commento con counter caratteri
- Preview recensione
- Validazione lato client
- Submit anonimo

#### Info & FAQ (in sviluppo)
- FAQ accordion interattiva
- Sistema badge spiegato
- Linee guida community
- Privacy policy
- Contatti e supporto

### Pannello Admin 🔐

Accesso: `admin.html`

#### Dashboard
- **Statistiche real-time:**
  - Vendor totali
  - Recensioni totali
  - Rating medio
  - Azioni oggi
  
#### Gestione Vendor (CRUD Completo)
- ✅ **CREATE**: Aggiungi nuovo vendor con form validato
- ✅ **READ**: Lista vendor con search e filtri
- ✅ **UPDATE**: Modifica vendor esistente
- ✅ **DELETE**: Elimina vendor con conferma

**Campi Vendor:**
- Nome (required)
- Categoria (Erbe & Fiori, Estratti & Concentrati, Accessori, Test Kit, Riduzione Danno)
- Area geografica (required)
- Contatto (Telegram/Email)
- Badge (Affidabile, Top Rated, Nuovo, Attenzione)

#### Activity Log
- Registro di tutte le azioni admin
- Timestamp con "time ago" relativo
- Icone categorizzate per tipo azione
- Ultimi 20 eventi visualizzati
- Storage persistente in localStorage

#### Ricerca & Filtri
- Search bar con debounce (300ms)
- Ricerca per nome, categoria, area
- Risultati in tempo reale

---

## 📁 Struttura Progetto

```
TrustCheck/
├── index.html                  # Homepage principale
├── vendors.html                # Pagina elenco vendor con filtri
├── recensione.html             # Form recensione multi-dimensionale
├── info.html                   # FAQ, linee guida, privacy policy
├── admin.html                  # Pannello amministratore SICURO
├── generate-password-hash.html # Tool generatore hash password
├── calculate-hash.js           # Script Node.js calcolo hash (utility)
├── README.md                   # Documentazione completa (17KB)
├── ADMIN_GUIDE.md              # Guida amministratore (6KB)
├── css/
│   ├── style.css              # Stili base e layout (12KB)
│   ├── components.css         # Componenti riutilizzabili (12KB)
│   └── admin.css              # Stili pannello admin (14KB)
└── js/
    ├── main.js                # JavaScript core (theme, menu, toast) (5KB)
    ├── vendors-display.js     # Visualizzazione vendor pubblica (12KB)
    ├── admin-auth.js          # Autenticazione sicura SHA-256 (13KB)
    └── admin-panel.js         # Gestione vendor e dashboard (21KB)
```

### Dati Mock Inclusi

**10 Vendor di esempio:**
1. GreenLeaf Store (Erbe & Fiori) - ⭐ 4.8
2. PureExtract Lab (Estratti) - ⭐ 4.9 (Top Rated)
3. SafeTools Shop (Accessori) - ⭐ 4.6
4. TestKit Pro (Test Kit) - ⭐ 4.7
5. HarmReduction Hub (Riduzione Danno) - ⭐ 5.0 (Top Rated)
6. Alpine Herbs (Erbe & Fiori) - ⭐ 4.5
7. QuickDelivery Express (Estratti) - ⭐ 3.8 (Attenzione)
8. NewGen Supplies (Accessori) - ⭐ 4.3 (Nuovo)
9. Organic Select (Erbe & Fiori) - ⭐ 4.7
10. Safety First Kit (Test Kit) - ⭐ 4.9 (Top Rated)

**Storage:**
- Vendor database: `localStorage` → `trustcheck_vendors_db`
- Activity log: `localStorage` → `trustcheck_activity_log`

---

## 🔐 Pannello Admin

### Accesso

**URL:** `admin.html`

**Password Predefinita:** `SmocarnoAdmin2024!`

⚠️ **IMPORTANTE:** Cambia la password prima del deployment in produzione!

### Come Cambiare la Password

**Metodo 1 - Generatore Web (Consigliato):**

1. Apri `generate-password-hash.html` nel browser
2. Inserisci la tua nuova password (min 8 caratteri)
3. Conferma la password
4. Clicca "Genera Hash SHA-256"
5. Copia l'hash generato
6. Apri `js/admin-auth.js` con un editor
7. Sostituisci `PASSWORD_HASH` alla riga 20 con il nuovo hash
8. Salva e ricarica la pagina admin

**Metodo 2 - Console Browser:**

1. Apri la console browser (F12)
2. Esegui questo comando sostituendo `TUA_NUOVA_PASSWORD`:

```javascript
AdminAuth.hashPassword('TUA_NUOVA_PASSWORD').then(hash => console.log(hash));
```

3. Copia l'hash generato
4. Apri `js/admin-auth.js`
5. Sostituisci il valore di `PASSWORD_HASH` alla riga 20:

```javascript
PASSWORD_HASH: 'QUI_IL_TUO_HASH_SHA256',
```

6. Salva e ricarica

### Funzionalità di Sicurezza Implementate

#### 🔒 Autenticazione
- **Password Hash SHA-256**: Password mai in chiaro nel codice
- **Token di sessione**: Generato con `crypto.randomUUID()`
- **Session timeout**: 30 minuti automatico
- **Inactivity logout**: 10 minuti senza attività
- **Rate limiting**: Max 3 tentativi login, blocco 5 minuti
- **Attempts tracking**: Visualizzazione tentativi rimasti

#### 🛡️ Protezione Dati
- **Input sanitization**: Anti-XSS su tutti gli input
- **Form validation**: Validazione lato client completa
- **Data persistence**: localStorage con prefix namespace
- **Audit logging**: Tutte le azioni registrate con timestamp

#### 🔔 Monitoring
- **Session timer**: Countdown visivo tempo rimanente
- **Activity tracking**: Mouse, keyboard, scroll, touch
- **Auto-logout**: Su scadenza o inattività
- **HTTPS warning**: Alert se connessione non sicura

---

## 🔐 Sicurezza

### Architettura di Sicurezza

**Questo è un sistema di autenticazione CLIENT-SIDE.**

✅ **Adatto per:**
- Ambienti trusted (admin singolo/pochi utenti fidati)
- Prototipazione rapida
- Deployment interno/community chiusa
- Protezione base da accessi casuali

❌ **NON adatto per:**
- Produzione con accessi multipli non fidati
- Gestione dati sensibili critici
- Compliance rigorosa (HIPAA, PCI-DSS)
- Scenari ad alto rischio sicurezza

### Best Practices Produzione

Per un deployment sicuro in produzione:

1. **Backend Authentication**
   - Implementa autenticazione server-side (Node.js + JWT, PHP + Sessions, etc.)
   - Password hashing con bcrypt/Argon2
   - Database sicuro per utenti/vendor

2. **HTTPS Obbligatorio**
   - Certificato SSL/TLS valido
   - HSTS header abilitato
   - Redirect HTTP → HTTPS

3. **Hosting EU Privacy-Oriented**
   - Hetzner Cloud (Germania)
   - OVH (Francia)
   - Scaleway (Francia)
   - Infomaniak (Svizzera)

4. **Web Application Firewall**
   - Cloudflare con regole firewall
   - Rate limiting a livello server
   - DDoS protection

5. **Tor Hidden Service (Opzionale)**
   - Mirror .onion per massima privacy
   - Nginx reverse proxy
   - Anonymizzazione traffico

6. **Monitoring & Backups**
   - Log centralizzati (ELK Stack, Graylog)
   - Backup automatici giornalieri
   - Disaster recovery plan

### Configurazione Nginx (Esempio)

```nginx
server {
    listen 443 ssl http2;
    server_name trustcheck.smocarno.org;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=admin:10m rate=10r/m;
    
    location / {
        root /var/www/trustcheck;
        index index.html;
    }
    
    location = /admin.html {
        limit_req zone=admin burst=5;
        root /var/www/trustcheck;
    }
}
```

---

## 🚀 Installazione

### Requisiti

- Browser moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Web server (per produzione: Nginx, Apache, Caddy)
- (Opzionale) Node.js 16+ per build tools

### Installazione Locale

1. **Clone/Download progetto**
```bash
git clone https://github.com/smocarno/trustcheck.git
cd trustcheck
```

2. **Apri con web server locale**

Opzione A - Python:
```bash
python3 -m http.server 8000
# Visita: http://localhost:8000
```

Opzione B - Node.js:
```bash
npx http-server -p 8000
# Visita: http://localhost:8000
```

Opzione C - PHP:
```bash
php -S localhost:8000
# Visita: http://localhost:8000
```

3. **Testa il pannello admin**
- Vai a: `http://localhost:8000/admin.html`
- Password: `SmocarnoAdmin2024!`

### Deploy Produzione

#### Netlify (Gratis)
1. Push su GitHub/GitLab
2. Collega repository a Netlify
3. Deploy automatico su push
4. Configura custom domain

#### Vercel (Gratis)
```bash
npm i -g vercel
vercel --prod
```

#### Hosting Tradizionale
1. Upload via FTP/SFTP
2. Punta document root a directory progetto
3. Configura HTTPS/SSL
4. Cambia password admin

---

## ⚙️ Configurazione

### Personalizzazione Password Admin

Modifica `js/admin-auth.js`:

```javascript
// Linea 20
PASSWORD_HASH: 'IL_TUO_HASH_SHA256_QUI',
```

### Personalizzazione Timeouts

Modifica `js/admin-auth.js`:

```javascript
const AUTH_CONFIG = {
    SESSION_DURATION: 30 * 60 * 1000,     // 30 minuti
    INACTIVITY_TIMEOUT: 10 * 60 * 1000,   // 10 minuti
    MAX_LOGIN_ATTEMPTS: 3,                 // Tentativi max
    LOCKOUT_DURATION: 5 * 60 * 1000,      // 5 minuti blocco
};
```

### Personalizzazione Colori

Modifica `css/style.css`:

```css
:root {
    --color-primary: #50623A;      /* Verde militare */
    --color-accent: #84CC16;        /* Verde lime */
    --color-alert: #E63946;         /* Rosso */
    /* ... */
}
```

### Integrazione Telegram

Modifica i link nei file HTML:

```html
<a href="https://t.me/tuocanale">Chat Aperta</a>
```

---

## 📖 Utilizzo

### Per Utenti Community

1. **Esplora vendor**: Vai alla pagina Vendor, usa filtri e ricerca
2. **Leggi recensioni**: Clicca su un vendor per vedere dettagli e feedback
3. **Lascia recensione**: Compila il form anonimo con le tue esperienze
4. **Consulta FAQ**: Leggi le domande frequenti nella pagina Info

### Per Amministratori

1. **Accedi ad admin.html**
2. **Inserisci password** (default: SmocarnoAdmin2024!)
3. **Dashboard**: Visualizza statistiche in tempo reale
4. **Aggiungi vendor**: Click su "Aggiungi Vendor", compila form
5. **Modifica vendor**: Click su icona matita nella tabella
6. **Elimina vendor**: Click su icona cestino, conferma eliminazione
7. **Cerca vendor**: Usa search bar per filtrare risultati
8. **Monitora attività**: Consulta il log attività in fondo alla pagina
9. **Logout**: Click su "Logout" quando finito

---

## 🔒 Privacy & GDPR

### Commitment Privacy

TrustCheck è progettato con **privacy-by-design**:

✅ **Zero Tracking Invasivo**
- No Google Analytics
- No Facebook Pixel
- No Cookie di profilazione
- Consigliato: Plausible/Matomo self-hosted

✅ **Anonimato Garantito**
- Recensioni completamente anonime
- No IP logging
- No fingerprinting
- No identificazione utenti

✅ **Data Minimization**
- Solo dati essenziali raccolti
- Storage locale (localStorage)
- No database centralizzato (per default)
- Dati cancellabili facilmente

✅ **GDPR Compliance Ready**
- Cookie banner minimalista
- Privacy policy chiara
- Diritto all'oblio implementabile
- Data export possibile

### Disclaimer

TrustCheck promuove la **riduzione del danno** e la condivisione responsabile di informazioni.

⚠️ **Non incoraggiamo attività illegali.**

Consultare sempre:
- Leggi locali vigenti
- Fonti sanitarie ufficiali
- Professionisti medici qualificati

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completato)
- [x] Homepage con statistiche
- [x] Design system completo
- [x] Dark mode funzionante
- [x] Pannello admin sicuro
- [x] CRUD vendor completo
- [x] Activity logging
- [x] Autenticazione SHA-256
- [x] Pagina vendor con filtri avanzati
- [x] Sistema di recensioni funzionante
- [x] Rating multi-dimensionale
- [x] Pagina Info & FAQ completa
- [x] Badge system implementato
- [x] Generatore password hash

### 🚧 Fase 2 - Enhanced Features (Prossimi Step)
- [ ] Backend per storage recensioni reali
- [ ] Sistema di moderazione recensioni
- [ ] Badge automatici calcolati da metriche
- [ ] Integrazione Telegram Bot API
- [ ] Notifiche push per nuove recensioni
- [ ] Sistema di segnalazioni

### 🔮 Fase 3 - Advanced Features (Future)
- [ ] Backend con database (Node.js + PostgreSQL)
- [ ] API RESTful per vendor/recensioni
- [ ] Autenticazione multi-admin con ruoli
- [ ] Sistema di moderazione recensioni
- [ ] Export dati (JSON, CSV, PDF)
- [ ] Notifiche push (PWA)
- [ ] Versione multilingua (EN, ES, DE)
- [ ] Mobile app (React Native)

### 🌟 Fase 4 - Enterprise (Long-term)
- [ ] Blockchain per immutabilità recensioni
- [ ] Sistema di reputazione vendor on-chain
- [ ] Integrazione con altri progetti SMOCARNO
- [ ] AI-powered fraud detection
- [ ] Analytics dashboard avanzata
- [ ] White-label per altre community

---

## 🤝 Contribuire

TrustCheck è un progetto **community-driven**. Contributi benvenuti!

### Come Contribuire

1. **Fork del repository**
2. **Crea branch feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit cambiamenti** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Apri Pull Request**

### Aree di Contribuzione

- **Sviluppo frontend**: React/Vue components, UI improvements
- **Backend**: Node.js API, database schema, autenticazione
- **Design**: UI/UX, illustrazioni, icone custom
- **Documentazione**: Guide, tutorial, traduzioni
- **Testing**: Unit tests, E2E tests, security audit
- **Community**: Moderazione, supporto, feedback

### Code Style

- **HTML**: Semantic, indentazione 4 spazi
- **CSS**: BEM naming convention, mobile-first
- **JavaScript**: ES6+, functional programming, JSDoc comments
- **Commit**: Conventional Commits (feat/fix/docs/style/refactor)

---

## 📞 Supporto & Contatti

### Community SMOCARNO

- **Telegram Chat**: [Link non ancora disponibile]
- **Telegram Guide**: [Link non ancora disponibile]
- **Telegram Vendor**: [Link non ancora disponibile]
- **Telegram Feedback**: [Link non ancora disponibile]

### TrustCheck Specifico

- **GitHub Issues**: Per bug e feature request
- **Email**: trustcheck@smocarno.community (placeholder)
- **Forum**: community.smocarno.org (placeholder)

---

## 📜 Licenza

Questo progetto è rilasciato per la **community SMOCARNO** sotto licenza open source.

Filosofia: **Condivisione Libera, Uso Responsabile**

- ✅ Usa liberamente per scopi non commerciali
- ✅ Modifica e adatta alle tue esigenze
- ✅ Condividi con altre community
- ⚠️ Attribuisci crediti a SMOCARNO
- ⚠️ Non usare per attività illegali
- ⚠️ Non vendere come prodotto commerciale

---

## 🙏 Ringraziamenti

- **Community SMOCARNO**: Per la visione e il supporto
- **Open Source Contributors**: Per gli strumenti utilizzati
- **Harm Reduction Advocates**: Per l'ispirazione e i valori

---

## 🔄 Changelog

### v1.0.0 (2024-01-15)
- ✨ Primo rilascio pubblico
- ✅ Homepage completa
- ✅ Pannello admin sicuro
- ✅ CRUD vendor funzionante
- ✅ Autenticazione SHA-256
- ✅ Dark mode
- ✅ Activity logging

---

<div align="center">

**TrustCheck** - *Costruiamo fiducia, riduciamo i danni* 💚🛡️

Progetto della **SMOCARNO Community**

[Website](#) • [Telegram](#) • [GitHub](#)

</div>
