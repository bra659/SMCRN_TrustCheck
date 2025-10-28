# 🚀 TrustCheck - Quick Start Guide

## ⚡ Avvio Rapido in 3 Minuti

### 1️⃣ Apri il Progetto

**Metodo A - Doppio Click (Windows/Mac/Linux):**
- Apri `index.html` con il tuo browser preferito

**Metodo B - Web Server Locale (Consigliato):**

```bash
# Scarica/clona il progetto
cd trustcheck

# Avvia server locale (scegli uno):
python3 -m http.server 8000
# oppure
npx http-server -p 8000
# oppure
php -S localhost:8000
```

Poi visita: **http://localhost:8000**

---

### 2️⃣ Esplora il Sito

✅ **Homepage:** Panoramica sistema e statistiche  
✅ **Vendor:** Lista vendor con filtri  
✅ **Recensione:** Form valutazione multi-dimensionale  
✅ **Info & FAQ:** Domande frequenti e linee guida  

---

### 3️⃣ Accedi al Pannello Admin

1. **Vai a:** `http://localhost:8000/admin.html`
2. **Password:** `SmocarnoAdmin2024!`
3. **Fatto!** Ora puoi gestire i vendor

---

## 🔑 Prima Configurazione Admin

### Cambia Password (OBBLIGATORIO prima del deploy!)

**Metodo Facile - Web Tool:**

1. Apri: `generate-password-hash.html` nel browser
2. Inserisci la tua nuova password sicura
3. Clicca "Genera Hash SHA-256"
4. Copia l'hash generato
5. Apri `js/admin-auth.js` con un editor
6. Sostituisci alla **riga 24** il valore di `PASSWORD_HASH`
7. Salva e ricarica il pannello admin

**Prima:**
```javascript
PASSWORD_HASH: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
```

**Dopo:**
```javascript
PASSWORD_HASH: 'il_tuo_nuovo_hash_qui',
```

---

## 🎮 Test Funzionalità Admin

### Aggiungi un Vendor
1. Click su "Aggiungi Vendor"
2. Compila: Nome, Categoria, Area
3. (Opzionale) Aggiungi contatto e badge
4. Click "Salva Vendor"

### Modifica un Vendor
1. Click sull'icona matita (✏️) nella tabella
2. Modifica i campi desiderati
3. Click "Salva Vendor"

### Elimina un Vendor
1. Click sull'icona cestino (🗑️)
2. Conferma l'eliminazione

### Cerca Vendor
- Usa la barra di ricerca in alto
- Filtra per nome, categoria o area

---

## 📊 Dati di Test

Il progetto include **10 vendor mock** già pronti:

- GreenLeaf Store (Erbe & Fiori) ⭐4.8
- PureExtract Lab (Estratti) ⭐4.9
- SafeTools Shop (Accessori) ⭐4.6
- TestKit Pro (Test Kit) ⭐4.7
- HarmReduction Hub (Riduzione Danno) ⭐5.0
- Alpine Herbs (Erbe & Fiori) ⭐4.5
- QuickDelivery Express (Estratti) ⭐3.8
- NewGen Supplies (Accessori) ⭐4.3
- Organic Select (Erbe & Fiori) ⭐4.7
- Safety First Kit (Test Kit) ⭐4.9

Questi dati sono memorizzati in **localStorage** del browser.

---

## 🎨 Personalizzazione Rapida

### Cambia Colori

Apri `css/style.css` e modifica le variabili CSS:

```css
:root {
    --color-primary: #50623A;    /* Il tuo colore primario */
    --color-accent: #84CC16;     /* Il tuo colore accent */
    /* ... */
}
```

### Cambia Logo/Nome

Cerca e sostituisci "TrustCheck" in tutti i file HTML.

### Modifica Timeouts Admin

Apri `js/admin-auth.js` e modifica le costanti:

```javascript
const AUTH_CONFIG = {
    SESSION_DURATION: 30 * 60 * 1000,     // 30 minuti
    INACTIVITY_TIMEOUT: 10 * 60 * 1000,   // 10 minuti
    MAX_LOGIN_ATTEMPTS: 3,                 // Tentativi
    LOCKOUT_DURATION: 5 * 60 * 1000,      // Blocco
};
```

---

## 🐛 Troubleshooting Rapido

### ❌ "Troppi tentativi falliti"
**Soluzione:** Aspetta 5 minuti o cancella localStorage:
```javascript
// In console browser (F12):
localStorage.clear();
location.reload();
```

### ❌ Password non accettata
**Verifica:**
1. Password corretta: `SmocarnoAdmin2024!`
2. Nessun spazio prima/dopo
3. Maiuscole/minuscole esatte

### ❌ Vendor non si salvano
**Soluzione:** Controlla che tutti i campi obbligatori siano compilati:
- Nome (min 2 caratteri)
- Categoria (selezionata)
- Area (min 2 caratteri)

### ❌ Sessione scade subito
**Causa:** Inattività oltre 10 minuti. Muovi il mouse o premi un tasto per resettare il timer.

---

## 📚 Documentazione Completa

Per maggiori dettagli consulta:

- **README.md** - Documentazione completa progetto
- **ADMIN_GUIDE.md** - Guida amministratore dettagliata
- **PROJECT_SUMMARY.md** - Riepilogo implementazione

---

## 🚀 Deploy Produzione

### Hosting Gratuito (Netlify/Vercel)

**Netlify:**
1. Push progetto su GitHub
2. Vai su netlify.com
3. "New site from Git"
4. Seleziona repository
5. Deploy automatico!

**Vercel:**
```bash
npm i -g vercel
cd trustcheck
vercel --prod
```

### Hosting Tradizionale

1. Upload file via FTP/SFTP
2. Punta document root alla directory progetto
3. Configura SSL/HTTPS
4. **Cambia password admin!**

---

## ✅ Checklist Pre-Deploy

Prima di andare in produzione:

- [ ] Password admin cambiata
- [ ] Tutti i link Telegram aggiornati
- [ ] SSL/HTTPS configurato
- [ ] Backup dati vendor
- [ ] Test su mobile
- [ ] Verifica footer (contatti, link)
- [ ] Privacy policy personalizzata
- [ ] Test tutte le funzionalità admin

---

## 🆘 Supporto

**Problemi tecnici?**
- Leggi ADMIN_GUIDE.md
- Controlla console browser (F12)
- Verifica README.md

**Community:**
- Telegram SMOCARNO (link nel footer)
- GitHub Issues (se applicabile)

---

## 🎯 Primi Step Consigliati

1. ✅ **Avvia progetto localmente**
2. ✅ **Esplora tutte le 4 pagine pubbliche**
3. ✅ **Accedi al pannello admin**
4. ✅ **Prova CRUD: aggiungi, modifica, elimina vendor**
5. ✅ **Cambia la password admin**
6. ✅ **Personalizza colori/testi**
7. ✅ **Configura link Telegram**
8. ✅ **Test finale su mobile**
9. ✅ **Deploy su hosting**

---

## 💡 Tips & Tricks

### Dark Mode
Il sito supporta dark mode nativo. Click sull'icona sole/luna nella navbar.

### Shortcuts Keyboard
- `Ctrl+F` / `Cmd+F` - Cerca nella pagina
- `F12` - Apri console sviluppatore
- `Ctrl+R` / `Cmd+R` - Ricarica pagina

### localStorage
I dati sono salvati nel browser. Per backup:
```javascript
// In console (F12):
const backup = localStorage.getItem('trustcheck_vendors_db');
console.log(backup);
// Copia l'output e salvalo in un file .json
```

### Import/Export Vendor
(Feature da implementare) - Per ora usa backup manuale localStorage.

---

**🎉 Sei Pronto! Buon Lavoro con TrustCheck!**

*Per qualsiasi domanda, consulta la documentazione completa.*

---

**TrustCheck** - SMOCARNO Community 💚🛡️
