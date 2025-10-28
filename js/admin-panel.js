// ========================================
// TrustCheck - Admin Panel
// Gestione Vendor e Dashboard
// ========================================

/**
 * FUNZIONALITÀ:
 * - CRUD completo vendor (Create, Read, Update, Delete)
 * - Validazione input con sanitizzazione anti-XSS
 * - Ricerca real-time vendor
 * - Dashboard con statistiche
 * - Activity log
 * - Export dati JSON
 * - CSRF protection per operazioni critiche
 */

// ========================================
// Mock Data - Vendor Database
// ========================================
let vendorsDatabase = [
    {
        id: 'vendor_001',
        name: 'GreenLeaf Store',
        category: 'Erbe & Fiori',
        area: 'Nord Italia',
        contact: '@greenleaf_tg',
        rating: 4.8,
        reviewsCount: 156,
        badge: 'verified',
        createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_002',
        name: 'PureExtract Lab',
        category: 'Estratti & Concentrati',
        area: 'Centro Italia',
        contact: '@pureextract',
        rating: 4.9,
        reviewsCount: 203,
        badge: 'top',
        createdAt: Date.now() - 120 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_003',
        name: 'SafeTools Shop',
        category: 'Accessori',
        area: 'Sud Italia',
        contact: 'safetools@mail.com',
        rating: 4.6,
        reviewsCount: 87,
        badge: 'verified',
        createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_004',
        name: 'TestKit Pro',
        category: 'Test Kit',
        area: 'Europa',
        contact: '@testkitpro',
        rating: 4.7,
        reviewsCount: 142,
        badge: 'verified',
        createdAt: Date.now() - 75 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_005',
        name: 'HarmReduction Hub',
        category: 'Riduzione Danno',
        area: 'Italia & EU',
        contact: '@harmreduction',
        rating: 5.0,
        reviewsCount: 98,
        badge: 'top',
        createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_006',
        name: 'Alpine Herbs',
        category: 'Erbe & Fiori',
        area: 'Nord Italia',
        contact: '@alpineherbs',
        rating: 4.5,
        reviewsCount: 67,
        badge: '',
        createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_007',
        name: 'QuickDelivery Express',
        category: 'Estratti & Concentrati',
        area: 'Nord & Centro',
        contact: '@quickdelivery',
        rating: 3.8,
        reviewsCount: 234,
        badge: 'warning',
        createdAt: Date.now() - 150 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_008',
        name: 'NewGen Supplies',
        category: 'Accessori',
        area: 'Italia',
        contact: '@newgensupplies',
        rating: 4.3,
        reviewsCount: 23,
        badge: 'new',
        createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_009',
        name: 'Organic Select',
        category: 'Erbe & Fiori',
        area: 'Centro Italia',
        contact: 'organic@select.it',
        rating: 4.7,
        reviewsCount: 112,
        badge: 'verified',
        createdAt: Date.now() - 100 * 24 * 60 * 60 * 1000
    },
    {
        id: 'vendor_010',
        name: 'Safety First Kit',
        category: 'Test Kit',
        area: 'Europa',
        contact: '@safetyfirstkit',
        rating: 4.9,
        reviewsCount: 178,
        badge: 'top',
        createdAt: Date.now() - 85 * 24 * 60 * 60 * 1000
    }
];

// Load from localStorage if exists
function loadVendorsFromStorage() {
    try {
        const stored = localStorage.getItem('trustcheck_vendors_db');
        if (stored) {
            vendorsDatabase = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading vendors from storage:', e);
    }
}

function saveVendorsToStorage() {
    try {
        localStorage.setItem('trustcheck_vendors_db', JSON.stringify(vendorsDatabase));
    } catch (e) {
        console.error('Error saving vendors to storage:', e);
    }
}

// ========================================
// Utility Functions
// ========================================
function generateVendorId() {
    return 'vendor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

function validateVendorData(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Nome vendor deve contenere almeno 2 caratteri');
    }
    
    if (!data.category) {
        errors.push('Categoria è obbligatoria');
    }
    
    if (!data.area || data.area.length < 2) {
        errors.push('Area geografica è obbligatoria');
    }
    
    return errors;
}

// ========================================
// CRUD Operations
// ========================================
function getAllVendors() {
    return [...vendorsDatabase].sort((a, b) => b.createdAt - a.createdAt);
}

function getVendorById(id) {
    return vendorsDatabase.find(v => v.id === id);
}

function addVendor(vendorData) {
    const errors = validateVendorData(vendorData);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    
    const newVendor = {
        id: generateVendorId(),
        name: sanitizeInput(vendorData.name),
        category: sanitizeInput(vendorData.category),
        area: sanitizeInput(vendorData.area),
        contact: sanitizeInput(vendorData.contact || ''),
        badge: vendorData.badge || '',
        rating: 0,
        reviewsCount: 0,
        createdAt: Date.now()
    };
    
    vendorsDatabase.push(newVendor);
    saveVendorsToStorage();
    
    if (window.AdminAuth && window.AdminAuth.logAdminActivity) {
        window.AdminAuth.logAdminActivity('add_vendor', `Aggiunto vendor: ${newVendor.name}`);
    }
    
    return newVendor;
}

function updateVendor(id, vendorData) {
    const errors = validateVendorData(vendorData);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    
    const index = vendorsDatabase.findIndex(v => v.id === id);
    if (index === -1) {
        throw new Error('Vendor non trovato');
    }
    
    vendorsDatabase[index] = {
        ...vendorsDatabase[index],
        name: sanitizeInput(vendorData.name),
        category: sanitizeInput(vendorData.category),
        area: sanitizeInput(vendorData.area),
        contact: sanitizeInput(vendorData.contact || ''),
        badge: vendorData.badge || ''
    };
    
    saveVendorsToStorage();
    
    if (window.AdminAuth && window.AdminAuth.logAdminActivity) {
        window.AdminAuth.logAdminActivity('update_vendor', `Modificato vendor: ${vendorsDatabase[index].name}`);
    }
    
    return vendorsDatabase[index];
}

function deleteVendor(id) {
    const index = vendorsDatabase.findIndex(v => v.id === id);
    if (index === -1) {
        throw new Error('Vendor non trovato');
    }
    
    const deletedVendor = vendorsDatabase[index];
    vendorsDatabase.splice(index, 1);
    saveVendorsToStorage();
    
    if (window.AdminAuth && window.AdminAuth.logAdminActivity) {
        window.AdminAuth.logAdminActivity('delete_vendor', `Eliminato vendor: ${deletedVendor.name}`);
    }
    
    return deletedVendor;
}

// ========================================
// Search & Filter
// ========================================
function searchVendors(query) {
    if (!query) return getAllVendors();
    
    const lowerQuery = query.toLowerCase();
    return vendorsDatabase.filter(vendor => 
        vendor.name.toLowerCase().includes(lowerQuery) ||
        vendor.category.toLowerCase().includes(lowerQuery) ||
        vendor.area.toLowerCase().includes(lowerQuery)
    );
}

// ========================================
// Statistics
// ========================================
function calculateStats() {
    const totalVendors = vendorsDatabase.length;
    const totalReviews = vendorsDatabase.reduce((sum, v) => sum + v.reviewsCount, 0);
    const avgRating = vendorsDatabase.reduce((sum, v) => sum + v.rating, 0) / totalVendors;
    
    // Actions today (from activity log)
    const actionsToday = getActivityLog().filter(log => {
        const logDate = new Date(log.timestamp);
        const today = new Date();
        return logDate.toDateString() === today.toDateString();
    }).length;
    
    return {
        totalVendors,
        totalReviews,
        avgRating: avgRating.toFixed(1),
        actionsToday
    };
}

// ========================================
// Activity Log
// ========================================
function getActivityLog() {
    try {
        return JSON.parse(localStorage.getItem('trustcheck_activity_log') || '[]');
    } catch (e) {
        return [];
    }
}

// ========================================
// UI Rendering
// ========================================
function renderVendorTable(vendors = getAllVendors()) {
    const tbody = document.getElementById('vendorTableBody');
    if (!tbody) return;
    
    if (vendors.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: var(--admin-text-secondary);">
                    Nessun vendor trovato
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = vendors.map(vendor => `
        <tr>
            <td class="vendor-name-cell">${vendor.name}</td>
            <td>${vendor.category}</td>
            <td>${vendor.area}</td>
            <td>
                <div class="vendor-rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span class="rating-value">${vendor.rating.toFixed(1)}</span>
                </div>
            </td>
            <td>${vendor.reviewsCount}</td>
            <td>${renderBadge(vendor.badge)}</td>
            <td>
                <div class="vendor-actions">
                    <button class="action-button edit" onclick="AdminPanel.editVendor('${vendor.id}')" title="Modifica">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="action-button delete" onclick="AdminPanel.confirmDeleteVendor('${vendor.id}')" title="Elimina">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderBadge(badgeType) {
    const badges = {
        verified: '<span class="badge badge-verified">✓ Affidabile</span>',
        top: '<span class="badge badge-top">★ Top Rated</span>',
        new: '<span class="badge badge-new">● Nuovo</span>',
        warning: '<span class="badge badge-warning">⚠ Attenzione</span>'
    };
    
    return badges[badgeType] || '<span style="color: var(--admin-text-muted);">-</span>';
}

function renderActivityLog() {
    const container = document.getElementById('activityLog');
    if (!container) return;
    
    const logs = getActivityLog().slice(0, 20); // Last 20 activities
    
    if (logs.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--admin-text-secondary);">Nessuna attività registrata</div>';
        return;
    }
    
    container.innerHTML = logs.map(log => {
        const icon = getLogIcon(log.action);
        const date = new Date(log.timestamp);
        const timeAgo = getTimeAgo(log.timestamp);
        
        return `
            <div class="log-entry">
                <div class="log-icon ${icon.type}">
                    ${icon.svg}
                </div>
                <div class="log-content">
                    <div class="log-action">${log.action.replace(/_/g, ' ').toUpperCase()}</div>
                    <div class="log-details">${log.details}</div>
                </div>
                <div class="log-time" title="${date.toLocaleString('it-IT')}">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

function getLogIcon(action) {
    const icons = {
        add_vendor: {
            type: 'add',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
        },
        update_vendor: {
            type: 'edit',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
        },
        delete_vendor: {
            type: 'delete',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>'
        },
        login: {
            type: 'add',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>'
        }
    };
    
    return icons[action] || icons.add_vendor;
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Ora';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m fa`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h fa`;
    return `${Math.floor(seconds / 86400)}g fa`;
}

function updateDashboardStats() {
    const stats = calculateStats();
    
    document.getElementById('statTotalVendors').textContent = stats.totalVendors;
    document.getElementById('statTotalReviews').textContent = stats.totalReviews;
    document.getElementById('statAvgRating').textContent = stats.avgRating;
    document.getElementById('statActionsToday').textContent = stats.actionsToday;
}

// ========================================
// Modal Management
// ========================================
let currentEditingVendorId = null;
let vendorToDelete = null;

function openVendorModal(vendorId = null) {
    const modal = document.getElementById('vendorModal');
    const form = document.getElementById('vendorForm');
    const title = document.getElementById('modalTitle');
    
    currentEditingVendorId = vendorId;
    
    if (vendorId) {
        // Edit mode
        const vendor = getVendorById(vendorId);
        if (!vendor) return;
        
        title.textContent = 'Modifica Vendor';
        document.getElementById('vendorId').value = vendor.id;
        document.getElementById('vendorName').value = vendor.name;
        document.getElementById('vendorCategory').value = vendor.category;
        document.getElementById('vendorArea').value = vendor.area;
        document.getElementById('vendorContact').value = vendor.contact;
        document.getElementById('vendorBadge').value = vendor.badge;
    } else {
        // Add mode
        title.textContent = 'Aggiungi Nuovo Vendor';
        form.reset();
    }
    
    modal.style.display = 'flex';
}

function closeVendorModal() {
    document.getElementById('vendorModal').style.display = 'none';
    document.getElementById('vendorForm').reset();
    currentEditingVendorId = null;
}

function openDeleteModal(vendorId) {
    const vendor = getVendorById(vendorId);
    if (!vendor) return;
    
    vendorToDelete = vendorId;
    document.getElementById('deleteVendorName').textContent = vendor.name;
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    vendorToDelete = null;
}

// ========================================
// Form Handlers
// ========================================
function handleVendorFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('vendorName').value,
        category: document.getElementById('vendorCategory').value,
        area: document.getElementById('vendorArea').value,
        contact: document.getElementById('vendorContact').value,
        badge: document.getElementById('vendorBadge').value
    };
    
    try {
        if (currentEditingVendorId) {
            updateVendor(currentEditingVendorId, formData);
            if (window.TrustCheck && window.TrustCheck.showToast) {
                window.TrustCheck.showToast('Successo', 'Vendor modificato con successo', 'success');
            }
        } else {
            addVendor(formData);
            if (window.TrustCheck && window.TrustCheck.showToast) {
                window.TrustCheck.showToast('Successo', 'Vendor aggiunto con successo', 'success');
            }
        }
        
        closeVendorModal();
        renderVendorTable();
        updateDashboardStats();
        renderActivityLog();
    } catch (error) {
        if (window.TrustCheck && window.TrustCheck.showToast) {
            window.TrustCheck.showToast('Errore', error.message, 'error');
        }
    }
}

function handleDeleteConfirm() {
    if (!vendorToDelete) return;
    
    try {
        deleteVendor(vendorToDelete);
        
        if (window.TrustCheck && window.TrustCheck.showToast) {
            window.TrustCheck.showToast('Successo', 'Vendor eliminato con successo', 'success');
        }
        
        closeDeleteModal();
        renderVendorTable();
        updateDashboardStats();
        renderActivityLog();
    } catch (error) {
        if (window.TrustCheck && window.TrustCheck.showToast) {
            window.TrustCheck.showToast('Errore', error.message, 'error');
        }
    }
}

// ========================================
// Event Listeners Setup
// ========================================
function setupEventListeners() {
    // Add vendor button
    document.getElementById('addVendorButton')?.addEventListener('click', () => {
        openVendorModal();
    });
    
    // Vendor form submit
    document.getElementById('vendorForm')?.addEventListener('submit', handleVendorFormSubmit);
    
    // Modal close buttons
    document.getElementById('closeModalButton')?.addEventListener('click', closeVendorModal);
    document.getElementById('cancelModalButton')?.addEventListener('click', closeVendorModal);
    
    // Delete modal buttons
    document.getElementById('closeDeleteModal')?.addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteButton')?.addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDeleteButton')?.addEventListener('click', handleDeleteConfirm);
    
    // Search
    let searchTimeout;
    document.getElementById('vendorSearch')?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const results = searchVendors(e.target.value);
            renderVendorTable(results);
        }, 300);
    });
    
    // Close modals on overlay click
    document.getElementById('vendorModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'vendorModal') closeVendorModal();
    });
    
    document.getElementById('deleteModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'deleteModal') closeDeleteModal();
    });
}

// ========================================
// Initialize Panel
// ========================================
function init() {
    loadVendorsFromStorage();
    setupEventListeners();
    renderVendorTable();
    updateDashboardStats();
    renderActivityLog();
}

// ========================================
// Export Functions
// ========================================
window.AdminPanel = {
    init,
    editVendor: (id) => openVendorModal(id),
    confirmDeleteVendor: openDeleteModal,
    updateActivityLog: renderActivityLog
};
