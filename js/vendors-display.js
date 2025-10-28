// ========================================
// TrustCheck - Vendors Display
// Visualizzazione pubblica vendor
// ========================================

// Load vendors from localStorage (populated by admin panel)
function loadVendors() {
    try {
        const stored = localStorage.getItem('trustcheck_vendors_db');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading vendors:', e);
    }
    
    // Return mock data if nothing in storage
    return getMockVendors();
}

function getMockVendors() {
    return [
        {
            id: 'vendor_001',
            name: 'GreenLeaf Store',
            category: 'Erbe & Fiori',
            area: 'Nord Italia',
            contact: '@greenleaf_tg',
            rating: 4.8,
            reviewsCount: 156,
            badge: 'verified'
        },
        {
            id: 'vendor_002',
            name: 'PureExtract Lab',
            category: 'Estratti & Concentrati',
            area: 'Centro Italia',
            contact: '@pureextract',
            rating: 4.9,
            reviewsCount: 203,
            badge: 'top'
        },
        {
            id: 'vendor_003',
            name: 'SafeTools Shop',
            category: 'Accessori',
            area: 'Sud Italia',
            contact: 'safetools@mail.com',
            rating: 4.6,
            reviewsCount: 87,
            badge: 'verified'
        },
        {
            id: 'vendor_004',
            name: 'TestKit Pro',
            category: 'Test Kit',
            area: 'Europa',
            contact: '@testkitpro',
            rating: 4.7,
            reviewsCount: 142,
            badge: 'verified'
        },
        {
            id: 'vendor_005',
            name: 'HarmReduction Hub',
            category: 'Riduzione Danno',
            area: 'Italia & EU',
            contact: '@harmreduction',
            rating: 5.0,
            reviewsCount: 98,
            badge: 'top'
        },
        {
            id: 'vendor_006',
            name: 'Alpine Herbs',
            category: 'Erbe & Fiori',
            area: 'Nord Italia',
            contact: '@alpineherbs',
            rating: 4.5,
            reviewsCount: 67,
            badge: ''
        },
        {
            id: 'vendor_007',
            name: 'QuickDelivery Express',
            category: 'Estratti & Concentrati',
            area: 'Nord & Centro',
            contact: '@quickdelivery',
            rating: 3.8,
            reviewsCount: 234,
            badge: 'warning'
        },
        {
            id: 'vendor_008',
            name: 'NewGen Supplies',
            category: 'Accessori',
            area: 'Italia',
            contact: '@newgensupplies',
            rating: 4.3,
            reviewsCount: 23,
            badge: 'new'
        },
        {
            id: 'vendor_009',
            name: 'Organic Select',
            category: 'Erbe & Fiori',
            area: 'Centro Italia',
            contact: 'organic@select.it',
            rating: 4.7,
            reviewsCount: 112,
            badge: 'verified'
        },
        {
            id: 'vendor_010',
            name: 'Safety First Kit',
            category: 'Test Kit',
            area: 'Europa',
            contact: '@safetyfirstkit',
            rating: 4.9,
            reviewsCount: 178,
            badge: 'top'
        }
    ];
}

// Render vendor card
function renderVendorCard(vendor) {
    const badgeHTML = renderBadge(vendor.badge);
    const starsHTML = renderStars(vendor.rating);
    
    return `
        <div class="vendor-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: var(--spacing-xl); transition: transform var(--transition-base), box-shadow var(--transition-base);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-md);">
                <h3 style="font-size: var(--font-size-xl); color: var(--color-primary); margin: 0;">${vendor.name}</h3>
                ${badgeHTML}
            </div>
            
            <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>${vendor.area}</span>
            </div>
            
            <div style="display: inline-flex; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-xs) var(--spacing-md); background: var(--color-bg-secondary); border-radius: var(--border-radius-sm); margin-bottom: var(--spacing-lg); font-size: var(--font-size-sm);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                ${vendor.category}
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; padding-top: var(--spacing-md); border-top: 1px solid var(--color-border);">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                    ${starsHTML}
                    <span style="font-weight: 600; color: var(--color-accent); font-size: var(--font-size-lg);">${vendor.rating.toFixed(1)}</span>
                </div>
                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    ${vendor.reviewsCount} recensioni
                </div>
            </div>
            
            <div style="margin-top: var(--spacing-md);">
                <a href="recensione.html?vendor=${vendor.id}" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: var(--font-size-sm);">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Lascia Recensione
                </a>
            </div>
        </div>
    `;
}

function renderBadge(badgeType) {
    const badges = {
        verified: '<span class="badge badge-verified" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: rgba(82, 183, 136, 0.15); color: var(--color-success); border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Affidabile</span>',
        top: '<span class="badge badge-top" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: rgba(132, 204, 22, 0.15); color: var(--color-accent); border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Top Rated</span>',
        new: '<span class="badge badge-new" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: rgba(244, 162, 97, 0.15); color: var(--color-warning); border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">🆕 Nuovo</span>',
        warning: '<span class="badge badge-warning" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: rgba(230, 57, 70, 0.15); color: var(--color-alert); border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Attenzione</span>'
    };
    
    return badges[badgeType] || '';
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    
    for (let i = 0; i < fullStars; i++) {
        html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="color: var(--color-accent);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }
    
    if (hasHalfStar) {
        html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-border);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }
    
    return html;
}

// Filter vendors
function filterVendors() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minRating = parseFloat(document.getElementById('ratingFilter').value);
    
    const allVendors = loadVendors();
    
    const filtered = allVendors.filter(vendor => {
        const matchesSearch = !searchTerm || 
            vendor.name.toLowerCase().includes(searchTerm) ||
            vendor.area.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || vendor.category === category;
        
        const matchesRating = vendor.rating >= minRating;
        
        return matchesSearch && matchesCategory && matchesRating;
    });
    
    return filtered;
}

// Render vendors grid
function renderVendors() {
    const vendors = filterVendors();
    const grid = document.getElementById('vendorsGrid');
    const countElement = document.getElementById('resultCount');
    
    if (countElement) {
        countElement.textContent = vendors.length;
    }
    
    if (vendors.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-3xl); color: var(--color-text-secondary);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin: 0 auto var(--spacing-lg); opacity: 0.3;">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <h3 style="margin-bottom: var(--spacing-sm);">Nessun vendor trovato</h3>
                <p>Prova a modificare i filtri di ricerca</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = vendors.map(vendor => renderVendorCard(vendor)).join('');
    
    // Add hover effect
    document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderVendors();
    
    // Setup filter listeners
    document.getElementById('searchInput')?.addEventListener('input', renderVendors);
    document.getElementById('categoryFilter')?.addEventListener('change', renderVendors);
    document.getElementById('ratingFilter')?.addEventListener('change', renderVendors);
});
