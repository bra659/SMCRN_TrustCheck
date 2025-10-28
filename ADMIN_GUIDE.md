# Guida Rapida Amministratore - TrustCheck

## 🔐 Primo Accesso

### Credenziali Default
- **URL Admin:** `admin.html`
- **Password:** `SmocarnoAdmin2024!`

⚠️ **CAMBIA IMMEDIATAMENTE LA PASSWORD PRIMA DI ANDARE IN PRODUZIONE!**

---

## 🔑 Come Cambiare la Password

### Metodo Semplice (Consigliato)

1. Apri `generate-password-hash.html` nel browser
2. Inserisci la tua nuova password sicura (min 8 caratteri)
3. Conferma la password
4. Clicca "Genera Hash SHA-256"
5. Copia l'hash generato (lunga stringa esadecimale)
6. Apri `js/admin-auth.js` con un editor di testo
7. Cerca la riga 20 con `PASSWORD_HASH:`
8. Sostituisci il vecchio hash con quello nuovo
9. Salva il file
10. Ricarica la pagina admin e usa la nuova password

### Esempio

**Prima (riga 20 di admin-auth.js):**
```javascript
PASSWORD_HASH: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
```

**Dopo (con il tuo hash):**
```javascript
PASSWORD_HASH: 'a1b2c3d4e5f6...il_tuo_hash_qui',
```

---

## 📊 Funzionalità Dashboard

### Statistiche Real-time
- **Vendor Totali:** Numero di vendor nel database
- **Recensioni Totali:** Somma di tutte le recensioni
- **Rating Medio:** Media ponderata dei rating
- **Azioni Oggi:** Numero di operazioni eseguite oggi

### Gestione Vendor

#### Aggiungere un Vendor
1. Clicca "Aggiungi Vendor"
2. Compila il form:
   - **Nome** (obbligatorio)
   - **Categoria** (dropdown)
   - **Area Geografica** (obbligatorio)
   - **Contatto** (Telegram o Email)
   - **Badge** (opzionale)
3. Clicca "Salva Vendor"

#### Modificare un Vendor
1. Trova il vendor nella tabella
2. Clicca l'icona matita (✏️)
3. Modifica i campi desiderati
4. Clicca "Salva Vendor"

#### Eliminare un Vendor
1. Trova il vendor nella tabella
2. Clicca l'icona cestino (🗑️)
3. Conferma l'eliminazione

⚠️ **Attenzione:** L'eliminazione è permanente!

### Ricerca Vendor
- Usa la barra di ricerca in alto
- Cerca per nome, categoria o area
- Risultati aggiornati in tempo reale

---

## 🏷️ Sistema Badge

### Badge Disponibili

#### ✅ Affidabile (Verified)
- Vendor con buona reputazione
- Rating > 4.5
- Almeno 50 recensioni positive

#### ⭐ Top Rated
- I migliori vendor della community
- Rating > 4.8
- Feedback eccellente costante

#### 🆕 Nuovo (New)
- Vendor appena aggiunti
- Meno di 30 giorni di attività
- Ancora in fase di valutazione

#### ⚠️ Attenzione (Warning)
- Vendor con problemi segnalati
- Rating < 4.0
- Attenzione consigliata

**Come Assegnare Badge:**
1. Modifica vendor
2. Seleziona badge dal dropdown
3. Salva modifiche

---

## 📝 Activity Log

Il log attività registra automaticamente:
- **Login/Logout** admin
- **Aggiunta** vendor
- **Modifica** vendor
- **Eliminazione** vendor

Ogni azione include:
- Timestamp preciso
- Descrizione azione
- Dettagli operazione

Il log conserva le ultime 50 azioni.

---

## 🔒 Sicurezza

### Caratteristiche di Sicurezza Implementate

✅ **Password Hash SHA-256**
- Password mai in chiaro nel codice
- Hash irreversibile

✅ **Session Management**
- Timeout automatico 30 minuti
- Auto-logout su inattività (10 min)
- Token di sessione crittografato

✅ **Rate Limiting**
- Max 3 tentativi di login
- Blocco automatico 5 minuti

✅ **Input Validation**
- Sanitizzazione anti-XSS
- Validazione form completa
- Controllo dati lato client

✅ **Activity Tracking**
- Mouse, keyboard, scroll monitored
- Auto-logout su inattività prolungata

⚠️ **Importante:**
Questa è autenticazione CLIENT-SIDE, adatta per:
- Deployment interno
- Pochi admin fidati
- Community chiusa

Per produzione enterprise, considera:
- Backend con database
- Autenticazione server-side
- JWT tokens
- Rate limiting server

---

## 🚨 Troubleshooting

### Non riesco ad accedere
- Verifica password (default: `SmocarnoAdmin2024!`)
- Controlla se account bloccato (troppi tentativi)
- Aspetta 5 minuti se bloccato
- Cancella cache browser

### Session scade troppo velocemente
- Modifica `js/admin-auth.js`
- Cambia `SESSION_DURATION` (riga 22)
- Valore in millisecondi (es: 60 * 60 * 1000 = 1 ora)

### Password dimenticata
- Genera nuovo hash con `generate-password-hash.html`
- Sostituisci in `js/admin-auth.js`
- Nessun recovery possibile (by design)

### Vendor non si salvano
- Controlla console browser (F12)
- Verifica campi obbligatori compilati
- Assicurati localStorage non sia pieno
- Prova in modalità incognito

---

## 📱 Best Practices

### Sicurezza
- ✅ Cambia password default SUBITO
- ✅ Usa password forte (12+ caratteri, maiuscole, numeri, simboli)
- ✅ Esegui logout quando finisci
- ✅ Non condividere password
- ✅ Usa HTTPS in produzione
- ✅ Backup regolari dati

### Gestione Vendor
- ✅ Verifica informazioni prima di aggiungere
- ✅ Aggiorna badge regolarmente
- ✅ Rimuovi vendor inattivi/problematici
- ✅ Monitora feedback community
- ✅ Mantieni database pulito

### Performance
- ✅ Max 500 vendor consigliati (localStorage limits)
- ✅ Pulizia log attività periodica
- ✅ Export backup mensile
- ✅ Ottimizza immagini se aggiunte

---

## 🆘 Supporto

### Problemi Tecnici
- Controlla console browser (F12)
- Leggi README.md completo
- Verifica file JavaScript non modificati

### Contribuire
- Segnala bug su GitHub Issues
- Proponi miglioramenti
- Condividi feedback

### Community
- Telegram: [link community]
- Email: trustcheck@smocarno.community

---

## 📚 Risorse Utili

- **README.md** - Documentazione completa progetto
- **generate-password-hash.html** - Tool cambio password
- **admin.html** - Pannello amministrativo
- **index.html** - Sito pubblico

---

**Ultima revisione:** 2024-01-15

**Versione:** 1.0.0

**TrustCheck** - SMOCARNO Community 💚🛡️
