document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/content');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        applySettings(data.website);
        renderContent(data.content);
        setupInteractions();
        
        // Remove loader
        document.getElementById('app-loader').style.opacity = '0';
        setTimeout(() => document.getElementById('app-loader').remove(), 300);
        
        // Initialize icons
        lucide.createIcons();
    } catch (error) {
        console.error('Failed to load content:', error);
        document.getElementById('app-loader').innerHTML = '<p class="text-red-500">Failed to load content. Please try again later.</p>';
    }
});

function applySettings(website) {
    if (!website) return;
    
    document.getElementById('meta-title').textContent = website.metaTitle || website.name;
    document.getElementById('meta-description').setAttribute('content', website.metaDescription || '');
    document.getElementById('nav-logo').textContent = website.name;
    document.getElementById('footer-logo').textContent = website.name;
    
    // Apply primary color variable
    if (website.primaryColor) {
        document.documentElement.style.setProperty('--color-primary', website.primaryColor);
    }
}

function renderContent(content) {
    if (!content) return;
    
    // Hero
    handleSection('hero', content.hero, (data) => {
        setText('hero-title', data.title);
        setText('hero-subtitle', data.subtitle);
        setText('hero-description', data.description);
        
        const btn = document.getElementById('hero-btn');
        if (btn) {
            btn.textContent = data.buttonText;
            btn.href = data.buttonUrl;
        }
        
        setImage('hero-image', data.image);
    });

    // About
    handleSection('about', content.about, (data) => {
        setText('about-title', data.title);
        setText('about-description', data.description);
        setImage('about-image', data.image);
    });

    // Services
    handleSection('services', content.services, (data) => {
        setText('services-title', data.title);
        const grid = document.getElementById('services-grid');
        grid.innerHTML = '';
        data.items.filter(item => item.isActive).forEach(item => {
            grid.innerHTML += `
                <div class="card group cursor-pointer">
                    <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <i data-lucide="${item.icon || 'star'}"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-gray-900">${escapeHtml(item.name)}</h3>
                    <p class="text-gray-600 leading-relaxed">${escapeHtml(item.description)}</p>
                </div>
            `;
        });
    });

    // Why Choose Us
    handleSection('whyChooseUs', content.whyChooseUs, (data) => {
        setText('why-title', data.title);
        const grid = document.getElementById('why-grid');
        grid.innerHTML = '';
        data.items.forEach((item, idx) => {
            grid.innerHTML += `
                <div class="p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div class="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 text-xl font-bold">
                        ${idx + 1}
                    </div>
                    <h3 class="text-xl font-bold mb-3">${escapeHtml(item.title)}</h3>
                    <p class="text-gray-400">${escapeHtml(item.description)}</p>
                </div>
            `;
        });
    });

    // Gallery
    handleSection('gallery', content.gallery, (data) => {
        setText('gallery-title', data.title);
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '';
        data.items.forEach(item => {
            grid.innerHTML += `
                <div class="group relative rounded-2xl overflow-hidden shadow-soft aspect-[4/3] bg-gray-200">
                    <img src="/assets/${escapeHtml(item.image)}" alt="${escapeHtml(item.altText)}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div class="p-6">
                            <p class="text-white font-medium text-lg">${escapeHtml(item.caption)}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    // Testimonials
    handleSection('testimonials', content.testimonials, (data) => {
        setText('testimonials-title', data.title);
        const grid = document.getElementById('testimonials-grid');
        grid.innerHTML = '';
        data.items.forEach(item => {
            grid.innerHTML += `
                <div class="card relative p-8">
                    <i data-lucide="quote" class="absolute top-8 right-8 w-12 h-12 text-gray-100"></i>
                    <div class="relative z-10">
                        <p class="text-gray-600 italic mb-6 text-lg leading-relaxed">"${escapeHtml(item.review)}"</p>
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4 border-2 border-white shadow-sm">
                                <img src="/assets/${escapeHtml(item.photo)}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdjItMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+'">
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">${escapeHtml(item.name)}</h4>
                                <p class="text-sm text-gray-500">${escapeHtml(item.position)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    // FAQ
    handleSection('faq', content.faq, (data) => {
        setText('faq-title', data.title);
        const list = document.getElementById('faq-list');
        list.innerHTML = '';
        data.items.forEach((item, index) => {
            list.innerHTML += `
                <div class="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
                    <button class="faq-btn w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" aria-expanded="false" aria-controls="faq-content-${index}">
                        <span class="font-bold text-gray-900 pr-8">${escapeHtml(item.question)}</span>
                        <i data-lucide="chevron-down" class="text-gray-400 transition-transform duration-300 shrink-0 faq-icon"></i>
                    </button>
                    <div id="faq-content-${index}" class="faq-content hidden px-6 pb-5 text-gray-600 leading-relaxed">
                        <p>${escapeHtml(item.answer)}</p>
                    </div>
                </div>
            `;
        });
    });

    // Contact
    handleSection('contact', content.contact, (data) => {
        setText('contact-title', data.title);
        setText('contact-address', data.address);
        setText('contact-phone', data.phone);
        setText('contact-email', data.email);
        
        const waBtn = document.getElementById('contact-whatsapp');
        if (waBtn && data.whatsapp) {
            waBtn.href = `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`;
        }
        
        const mapBox = document.getElementById('contact-map');
        if (mapBox && data.googleMapsEmbed) {
            mapBox.innerHTML = data.googleMapsEmbed;
        }
    });

    // Footer
    if (content.footer) {
        setText('footer-description', content.footer.description);
        setText('footer-copyright', content.footer.copyright);
        
        const socials = document.getElementById('footer-socials');
        if (socials && content.footer.social) {
            socials.innerHTML = '';
            for (const [platform, url] of Object.entries(content.footer.social)) {
                if (url) {
                    socials.innerHTML += `
                        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="${platform}">
                            <i data-lucide="${getSocialIconName(platform)}"></i>
                        </a>
                    `;
                }
            }
        }
    }
}

function handleSection(id, data, renderCallback) {
    const section = document.getElementById(id);
    if (!section) return;
    
    if (data && data.isActive !== false) {
        renderCallback(data);
    } else {
        section.style.display = 'none';
        // Remove from navbar if exists
        const navLinks = document.querySelectorAll(`a[href="#${id}"]`);
        navLinks.forEach(link => link.style.display = 'none');
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
}

function setImage(id, filename) {
    const el = document.getElementById(id);
    if (el && filename) {
        el.src = `/assets/${filename}`;
        // Fallback placeholder if image not found
        el.onerror = () => {
            el.src = 'https://placehold.co/800x600/eeeeee/999999?text=No+Image';
        };
    }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function getSocialIconName(platform) {
    const map = {
        'facebook': 'facebook',
        'instagram': 'instagram',
        'linkedin': 'linkedin',
        'youtube': 'youtube',
        'tiktok': 'music' // Lucide doesn't have tiktok native, use music as fallback or custom svg
    };
    return map[platform.toLowerCase()] || 'link';
}

function setupInteractions() {
    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            // Close all others (optional logic based on DESIGN.md: "Hanya satu item yang terbuka")
            document.querySelectorAll('.faq-content').forEach(c => {
                if (c !== content) c.classList.add('hidden');
            });
            document.querySelectorAll('.faq-btn').forEach(b => {
                if (b !== btn) {
                    b.setAttribute('aria-expanded', 'false');
                    const i = b.querySelector('.faq-icon');
                    if(i) i.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current
            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                btn.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}
