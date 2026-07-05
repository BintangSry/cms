let cmsData = {};
let cmsSettings = {};

document.addEventListener('DOMContentLoaded', async () => {
    // Check auth
    const authRes = await fetch('/api/auth/check');
    const authData = await authRes.json();
    if (!authData.authenticated) {
        window.location.href = '/admin/login.html';
        return;
    }

    lucide.createIcons();
    setupSidebar();
    await loadData();
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Setup form listeners
    document.getElementById('form-hero').addEventListener('submit', (e) => saveObjectSection(e, 'hero'));
    document.getElementById('form-about').addEventListener('submit', (e) => saveObjectSection(e, 'about'));
    document.getElementById('form-contact').addEventListener('submit', (e) => saveObjectSection(e, 'contact'));
    document.getElementById('form-footer').addEventListener('submit', (e) => saveFooter(e));
    document.getElementById('form-settings').addEventListener('submit', (e) => saveSettings(e));
    
    // Sync color inputs
    const colorPicker = document.querySelector('input[name="primaryColor"]');
    const colorText = document.querySelector('input[name="primaryColorText"]');
    if(colorPicker && colorText) {
        colorPicker.addEventListener('input', e => colorText.value = e.target.value);
        colorText.addEventListener('input', e => colorPicker.value = e.target.value);
    }
});

function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full', 'hidden');
                sidebar.classList.add('absolute', 'z-50', 'h-full');
            } else {
                sidebar.classList.add('-translate-x-full', 'hidden');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/admin/login.html';
        });
    }
}

function handleHashChange() {
    let hash = window.location.hash.replace('#', '') || 'dashboard';
    
    // Hide all views
    document.querySelectorAll('.cms-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    
    // Show target view
    const target = document.getElementById(`view-${hash}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('block');
    }
    
    // Update sidebar active state
    document.querySelectorAll('#sidebar-nav a').forEach(el => {
        el.classList.remove('bg-gray-100', 'text-primary');
        el.classList.add('text-gray-600');
        if (el.getAttribute('href') === `#${hash}`) {
            el.classList.add('bg-gray-100', 'text-primary');
            el.classList.remove('text-gray-600');
        }
    });
    
    // Render array editors if needed
    if (hash === 'services') renderServices();
    if (hash === 'whyChooseUs') renderWhyChooseUs();
    if (hash === 'gallery') renderGallery();
    if (hash === 'testimonials') renderTestimonials();
    if (hash === 'faq') renderFaq();
}

async function loadData() {
    try {
        const [contentRes, settingsRes] = await Promise.all([
            fetch('/api/admin/content'),
            fetch('/api/admin/settings')
        ]);
        
        cmsData = await contentRes.json();
        cmsSettings = await settingsRes.json();
        
        populateForms();
        document.getElementById('dash-last-updated').textContent = new Date().toLocaleTimeString();
    } catch (e) {
        showToast('Failed to load data', 'error');
    }
}

function populateForms() {
    // Checkboxes
    ['hero', 'about', 'services', 'whyChooseUs', 'gallery', 'testimonials', 'faq', 'contact'].forEach(section => {
        const cb = document.getElementById(`${section === 'testimonials' ? 'testi' : section === 'whyChooseUs' ? 'why' : section}-active`);
        if (cb && cmsData[section]) {
            cb.checked = cmsData[section].isActive !== false;
            cb.onchange = () => toggleSection(section, cb.checked);
        }
    });

    // Hero
    if (cmsData.hero) {
        const f = document.getElementById('form-hero');
        f.title.value = cmsData.hero.title || '';
        f.subtitle.value = cmsData.hero.subtitle || '';
        f.description.value = cmsData.hero.description || '';
        f.buttonText.value = cmsData.hero.buttonText || '';
        f.buttonUrl.value = cmsData.hero.buttonUrl || '';
    }

    // About
    if (cmsData.about) {
        const f = document.getElementById('form-about');
        f.title.value = cmsData.about.title || '';
        f.description.value = cmsData.about.description || '';
    }
    
    // Contact
    if (cmsData.contact) {
        const f = document.getElementById('form-contact');
        f.title.value = cmsData.contact.title || '';
        f.phone.value = cmsData.contact.phone || '';
        f.whatsapp.value = cmsData.contact.whatsapp || '';
        f.email.value = cmsData.contact.email || '';
        f.address.value = cmsData.contact.address || '';
        f.googleMapsEmbed.value = cmsData.contact.googleMapsEmbed || '';
    }
    
    // Footer
    if (cmsData.footer) {
        const f = document.getElementById('form-footer');
        f.copyright.value = cmsData.footer.copyright || '';
        f.description.value = cmsData.footer.description || '';
        if (cmsData.footer.social) {
            f.instagram.value = cmsData.footer.social.instagram || '';
            f.facebook.value = cmsData.footer.social.facebook || '';
            f.linkedin.value = cmsData.footer.social.linkedin || '';
            f.tiktok.value = cmsData.footer.social.tiktok || '';
            f.youtube.value = cmsData.footer.social.youtube || '';
        }
    }
    
    // Settings
    if (cmsSettings) {
        const f = document.getElementById('form-settings');
        f.name.value = cmsSettings.name || '';
        f.metaTitle.value = cmsSettings.metaTitle || '';
        f.metaDescription.value = cmsSettings.metaDescription || '';
        f.primaryColor.value = cmsSettings.primaryColor || '#2563eb';
        f.primaryColorText.value = cmsSettings.primaryColor || '#2563eb';
    }
}

async function toggleSection(section, isActive) {
    if (!cmsData[section]) return;
    cmsData[section].isActive = isActive;
    await updateSection(section, { isActive });
}

async function saveSectionTitle(section) {
    const idPrefix = section === 'testimonials' ? 'testi' : section === 'whyChooseUs' ? 'why' : section;
    const titleInput = document.getElementById(`${idPrefix}-title`);
    if (!titleInput) return;
    cmsData[section].title = titleInput.value;
    await updateSection(section, { title: titleInput.value });
}

// Save basic object sections
async function saveObjectSection(e, section) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // preserve existing image and isActive
    const current = cmsData[section] || {};
    data.image = current.image; 
    data.isActive = current.isActive !== false;
    
    cmsData[section] = data;
    await updateSection(section, data);
}

// Save Footer (nested social)
async function saveFooter(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
        copyright: f.copyright.value,
        description: f.description.value,
        social: {
            instagram: f.instagram.value,
            facebook: f.facebook.value,
            linkedin: f.linkedin.value,
            tiktok: f.tiktok.value,
            youtube: f.youtube.value
        }
    };
    cmsData.footer = data;
    await updateSection('footer', data);
}

// Save Settings
async function saveSettings(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
        name: f.name.value,
        metaTitle: f.metaTitle.value,
        metaDescription: f.metaDescription.value,
        primaryColor: f.primaryColorText.value
    };
    cmsSettings = data;
    try {
        const res = await fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) showToast('Settings updated successfully', 'success');
        else showToast(result.message, 'error');
    } catch (e) {
        showToast('Update failed', 'error');
    }
}

async function updateSection(section, data) {
    try {
        const res = await fetch(`/api/admin/content/${section}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) showToast(`${section} updated successfully`, 'success');
        else showToast(result.message, 'error');
    } catch (e) {
        showToast('Update failed', 'error');
    }
}

/* ================= ARRAY EDITORS ================= */

// Services
function renderServices() {
    const section = cmsData.services || { items: [], title: 'Our Services' };
    document.getElementById('services-title').value = section.title || '';
    const list = document.getElementById('services-list');
    list.innerHTML = '';
    
    (section.items || []).forEach((item, index) => {
        list.innerHTML += `
            <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col md:flex-row gap-4 relative group">
                <div class="flex-1 space-y-3">
                    <input type="text" value="${escapeHtml(item.name)}" onchange="updateArrayItem('services', ${index}, 'name', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary text-sm font-bold" placeholder="Service Name">
                    <textarea onchange="updateArrayItem('services', ${index}, 'description', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary text-sm" rows="2" placeholder="Description">${escapeHtml(item.description)}</textarea>
                    <div class="flex items-center gap-4">
                        <input type="text" value="${escapeHtml(item.icon)}" onchange="updateArrayItem('services', ${index}, 'icon', this.value)" class="w-48 px-3 py-2 border border-gray-300 rounded text-sm" placeholder="Lucide Icon name (e.g. globe)">
                        <label class="flex items-center text-sm"><input type="checkbox" ${item.isActive !== false ? 'checked' : ''} onchange="updateArrayItem('services', ${index}, 'isActive', this.checked)" class="mr-2"> Active</label>
                    </div>
                </div>
                <button onclick="removeArrayItem('services', ${index})" class="md:absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
            </div>
        `;
    });
    lucide.createIcons();
}

function addServiceItem() {
    if (!cmsData.services.items) cmsData.services.items = [];
    cmsData.services.items.push({ id: Date.now(), name: 'New Service', description: '', icon: 'star', isActive: true });
    updateSection('services', cmsData.services);
    renderServices();
}

// Why Choose Us
function renderWhyChooseUs() {
    const section = cmsData.whyChooseUs || { items: [], title: 'Why Choose Us' };
    document.getElementById('why-title').value = section.title || '';
    const list = document.getElementById('why-list');
    list.innerHTML = '';
    
    (section.items || []).forEach((item, index) => {
        list.innerHTML += `
            <div class="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col md:flex-row gap-4 relative group">
                <div class="flex-1 space-y-3">
                    <input type="text" value="${escapeHtml(item.title)}" onchange="updateArrayItem('whyChooseUs', ${index}, 'title', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm font-bold" placeholder="Title">
                    <textarea onchange="updateArrayItem('whyChooseUs', ${index}, 'description', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows="2" placeholder="Description">${escapeHtml(item.description)}</textarea>
                </div>
                <button onclick="removeArrayItem('whyChooseUs', ${index})" class="md:absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
            </div>
        `;
    });
    lucide.createIcons();
}

function addWhyItem() {
    if (!cmsData.whyChooseUs.items) cmsData.whyChooseUs.items = [];
    cmsData.whyChooseUs.items.push({ title: 'New Item', description: '' });
    updateSection('whyChooseUs', cmsData.whyChooseUs);
    renderWhyChooseUs();
}

// Gallery
function renderGallery() {
    const section = cmsData.gallery || { items: [], title: 'Our Gallery' };
    document.getElementById('gallery-title').value = section.title || '';
    const list = document.getElementById('gallery-list');
    list.innerHTML = '';
    
    (section.items || []).forEach((item, index) => {
        const uid = item.id || `gallery-${index}`;
        list.innerHTML += `
            <div class="border border-gray-200 rounded-xl overflow-hidden bg-white relative group flex flex-col">
                <button onclick="removeArrayItem('gallery', ${index})" class="absolute top-2 right-2 z-10 text-red-500 bg-white p-1.5 rounded-md shadow opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                
                <div class="h-40 bg-gray-100 relative">
                    <img id="gal-img-${index}" src="/assets/${escapeHtml(item.image)}" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdjItMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'">
                </div>
                
                <div class="p-4 space-y-3 flex-1 flex flex-col">
                    <input type="file" id="gal-upload-${index}" accept=".jpg,.jpeg,.png,.webp" class="text-xs w-full text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-100 mb-2">
                    <button onclick="uploadImage('gal-upload-${index}', '${uid}', 'gal-img-${index}')" class="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded mb-3">Upload Image</button>
                    
                    <input type="text" value="${escapeHtml(item.caption)}" onchange="updateArrayItem('gallery', ${index}, 'caption', this.value)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm mb-2" placeholder="Caption">
                    <input type="text" value="${escapeHtml(item.altText)}" onchange="updateArrayItem('gallery', ${index}, 'altText', this.value)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs text-gray-500" placeholder="Alt Text (SEO)">
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function addGalleryItem() {
    if (!cmsData.gallery.items) cmsData.gallery.items = [];
    const id = `gallery-${Date.now()}`;
    cmsData.gallery.items.push({ id, image: `${id}.png`, caption: 'New Image', altText: 'Gallery Image' });
    updateSection('gallery', cmsData.gallery);
    renderGallery();
}

// Testimonials
function renderTestimonials() {
    const section = cmsData.testimonials || { items: [], title: 'Testimonials' };
    document.getElementById('testi-title').value = section.title || '';
    const list = document.getElementById('testi-list');
    list.innerHTML = '';
    
    (section.items || []).forEach((item, index) => {
        const uid = item.photo ? item.photo.split('.')[0] : `user-${Date.now()}-${index}`;
        if (!item.photo) {
            item.photo = `${uid}.png`; // Setup default filename convention
            updateSection('testimonials', cmsData.testimonials); // background save
        }
        
        list.innerHTML += `
            <div class="border border-gray-200 rounded-xl p-4 bg-white relative group">
                <button onclick="removeArrayItem('testimonials', ${index})" class="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="w-24 shrink-0">
                        <div class="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-2">
                            <img id="testi-img-${index}" src="/assets/${escapeHtml(item.photo)}" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdjItMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'">
                        </div>
                        <input type="file" id="testi-upload-${index}" accept=".jpg,.jpeg,.png,.webp" class="hidden">
                        <button onclick="document.getElementById('testi-upload-${index}').click()" class="text-xs text-primary font-medium w-full text-center mb-1">Select</button>
                        <button onclick="uploadImage('testi-upload-${index}', '${uid}', 'testi-img-${index}')" class="text-xs bg-gray-100 py-1 w-full rounded">Upload</button>
                    </div>
                    
                    <div class="flex-1 space-y-3">
                        <div class="grid grid-cols-2 gap-3">
                            <input type="text" value="${escapeHtml(item.name)}" onchange="updateArrayItem('testimonials', ${index}, 'name', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm font-bold" placeholder="Name">
                            <input type="text" value="${escapeHtml(item.position)}" onchange="updateArrayItem('testimonials', ${index}, 'position', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-600" placeholder="Position / Role">
                        </div>
                        <textarea onchange="updateArrayItem('testimonials', ${index}, 'review', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows="3" placeholder="Review content">${escapeHtml(item.review)}</textarea>
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function addTestiItem() {
    if (!cmsData.testimonials.items) cmsData.testimonials.items = [];
    cmsData.testimonials.items.push({ name: 'New Person', position: 'Client', review: '', photo: `user-${Date.now()}.png` });
    updateSection('testimonials', cmsData.testimonials);
    renderTestimonials();
}

// FAQ
function renderFaq() {
    const section = cmsData.faq || { items: [], title: 'FAQ' };
    document.getElementById('faq-title').value = section.title || '';
    const list = document.getElementById('faq-list');
    list.innerHTML = '';
    
    (section.items || []).forEach((item, index) => {
        list.innerHTML += `
            <div class="border border-gray-200 rounded-xl p-4 bg-white flex gap-4 relative group">
                <div class="flex-1 space-y-3">
                    <input type="text" value="${escapeHtml(item.question)}" onchange="updateArrayItem('faq', ${index}, 'question', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm font-bold" placeholder="Question">
                    <textarea onchange="updateArrayItem('faq', ${index}, 'answer', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows="2" placeholder="Answer">${escapeHtml(item.answer)}</textarea>
                </div>
                <button onclick="removeArrayItem('faq', ${index})" class="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity self-start"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
            </div>
        `;
    });
    lucide.createIcons();
}

function addFaqItem() {
    if (!cmsData.faq.items) cmsData.faq.items = [];
    cmsData.faq.items.push({ question: 'New Question?', answer: 'Answer here.' });
    updateSection('faq', cmsData.faq);
    renderFaq();
}

// Array Utils
async function updateArrayItem(section, index, key, value) {
    if (!cmsData[section].items[index]) return;
    cmsData[section].items[index][key] = value;
    await updateSection(section, cmsData[section]);
}

async function removeArrayItem(section, index) {
    if (confirm('Are you sure you want to delete this item?')) {
        cmsData[section].items.splice(index, 1);
        await updateSection(section, cmsData[section]);
        if (section === 'services') renderServices();
        if (section === 'whyChooseUs') renderWhyChooseUs();
        if (section === 'gallery') renderGallery();
        if (section === 'testimonials') renderTestimonials();
        if (section === 'faq') renderFaq();
    }
}

// UPLOAD FUNCTION
async function uploadImage(inputId, targetName, previewId) {
    const input = document.getElementById(inputId);
    if (!input || !input.files || input.files.length === 0) {
        showToast('Please select a file first', 'warning');
        return;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', targetName); // the backend will append the extension

    try {
        const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        
        if (data.success) {
            showToast('Image uploaded and replaced successfully', 'success');
            // Force refresh preview by adding a timestamp query param
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = `/assets/${data.filename}?t=${Date.now()}`;
                preview.style.display = 'block';
            }
            
            // Note: the backend renames it, e.g. targetName + '.png'.
            // If the original data JSON needs updating with the new extension, we should do it.
            // But since Multer in our setup uses original extension, we should update JSON to point to data.filename.
            // Let's figure out which section this is for, and update JSON if needed.
            if (targetName === 'hero') {
                cmsData.hero.image = data.filename;
                await updateSection('hero', cmsData.hero);
            } else if (targetName === 'about') {
                cmsData.about.image = data.filename;
                await updateSection('about', cmsData.about);
            } else if (targetName.startsWith('gallery-')) {
                // Find in gallery
                const item = cmsData.gallery.items.find(i => i.id === targetName);
                if (item) {
                    item.image = data.filename;
                    await updateSection('gallery', cmsData.gallery);
                }
            } else if (targetName.startsWith('user-')) {
                // Find in testimonials
                const item = cmsData.testimonials.items.find(i => i.photo && i.photo.startsWith(targetName));
                if (item) {
                    item.photo = data.filename;
                    await updateSection('testimonials', cmsData.testimonials);
                }
            }
            input.value = ''; // clear input
        } else {
            showToast(data.message || 'Upload failed', 'error');
        }
    } catch (e) {
        showToast('Upload failed due to network error', 'error');
    }
}

// Utils
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    let colorClass = 'bg-gray-800 text-white';
    let icon = 'info';
    
    if (type === 'success') { colorClass = 'bg-green-600 text-white'; icon = 'check-circle'; }
    if (type === 'error') { colorClass = 'bg-red-600 text-white'; icon = 'alert-circle'; }
    if (type === 'warning') { colorClass = 'bg-yellow-500 text-white'; icon = 'alert-triangle'; }
    
    toast.className = `flex items-center p-4 rounded-lg shadow-lg ${colorClass} transition-opacity duration-300 opacity-0 transform translate-y-2`;
    toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 mr-3 shrink-0"></i> <span>${escapeHtml(message)}</span>`;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    // animate in
    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'translate-y-2');
    });
    
    // animate out and remove
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
