// ========================================
// TrustCheck - Calculate Password Hash
// Utility per calcolare SHA-256 hash
// ========================================

const crypto = require('crypto');

// Password predefinita
const defaultPassword = 'SmocarnoAdmin2024!';

// Calcola SHA-256 hash
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Genera hash
const hash = hashPassword(defaultPassword);

console.log('\n===========================================');
console.log('TrustCheck - Password Hash Generator');
console.log('===========================================\n');
console.log('Password Default: ' + defaultPassword);
console.log('SHA-256 Hash:     ' + hash);
console.log('\n===========================================\n');
console.log('Copia questo hash in js/admin-auth.js alla riga 20');
console.log('PASSWORD_HASH: \'' + hash + '\',');
console.log('\n===========================================\n');

// Test con esempi
console.log('Altri esempi di hash:');
const examples = ['admin123', 'password', 'TrustCheck2024'];
examples.forEach(pwd => {
    console.log(`"${pwd}" => ${hashPassword(pwd)}`);
});
console.log('\n');
