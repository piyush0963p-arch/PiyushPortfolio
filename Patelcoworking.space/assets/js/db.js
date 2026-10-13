/**
 * Patel Workspace CMS - Simulated Database Engine (db.js)
 * Implements a relational database inside the browser's localStorage.
 */

(function () {
    const DB_KEY = 'patel_workspace_db';

    // Default Seed Data
    const defaultData = {
        users: [
            {
                id: 1,
                username: 'admin',
                email: 'admin@patelworkspace.com',
                password_hash: 'admin123', // Stored plain/simple for mock client side check
                role: 'admin',
                login_attempts: 0,
                last_attempt: null
            },
            {
                id: 2,
                username: 'editor',
                email: 'editor@patelworkspace.com',
                password_hash: 'editor123',
                role: 'editor',
                login_attempts: 0,
                last_attempt: null
            }
        ],
        settings: {
            site_name: 'Patel Workspace',
            site_email: 'info@patelworkspace.com',
            site_phone: '+91 99999 99999',
            whatsapp_number: '919999999999',
            site_address: 'Navrangpura, Ahmedabad, Gujarat, India - 380009',
            primary_color: '#043873',
            secondary_color: '#4F9CF9',
            accent_yellow: '#FFE492',
            dark_text: '#212529',
            font_family: 'Inter',
            font_header: 'Outfit',
            logo_url: '',
            favicon_url: '',
            footer_copyright: '© 2026 Patel Workspace Navrangpura. All Rights Reserved.',
            meta_title: 'Patel Workspace — Premium Virtual Office & Coworking in Navrangpura, Ahmedabad',
            meta_description: 'Book virtual office, coworking cabins, meeting rooms & day passes at Patel Workspace, Navrangpura, Ahmedabad. GST registration address, managed offices & event spaces.',
            meta_keywords: 'coworking, virtual office, Ahmedabad, Navrangpura, GST registration, office space, day pass',
            social_facebook: '#',
            social_twitter: '#',
            social_linkedin: '#'
        },
        sections: [
            {
                id: 1,
                section_identifier: 'hero',
                title: 'Your Premium <span class="underline-highlight">Workspace</span> in Ahmedabad',
                subtitle: '6 fully-furnished private cabins in Navrangpura — perfect for virtual office registration, coworking, meeting rooms & GST address. Starting at just ₹499/day.',
                content_json: {
                    button_1_text: 'Book a Tour',
                    button_1_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20a%20tour%20at%20Patel%20Workspace%20Navrangpura.',
                    button_2_text: 'View Plans',
                    button_2_url: '#pricing'
                },
                sort_order: 1,
                is_visible: true
            },
            {
                id: 2,
                section_identifier: 'on_demand',
                title: 'Book <span class="underline-highlight">On-Demand</span>',
                subtitle: 'Flexible workspace solutions you can book by the hour or day in Navrangpura. No long-term commitments required.',
                content_json: {},
                sort_order: 2,
                is_visible: true
            },
            {
                id: 3,
                section_identifier: 'long_term',
                title: 'Rent <span class="underline-highlight">Longer-Term</span>',
                subtitle: 'Premium dedicated corporate spaces and virtual options for companies aiming to establish a solid footprint in Ahmedabad.',
                content_json: {},
                sort_order: 3,
                is_visible: true
            },
            {
                id: 4,
                section_identifier: 'workflow',
                title: 'Secure Your <span class="underline-highlight">GST Address</span> easily',
                subtitle: 'Get registered in Navrangpura, Ahmedabad\'s top commercial center. Instant compliance documentation, guaranteed acceptance.',
                content_json: {
                    steps: [
                        {
                            num: 1,
                            title: 'Choose Navrangpura Address',
                            desc: 'Select our premium commercial address at Navrangpura to use on your website, marketing collateral, business registration, and official correspondence.'
                        },
                        {
                            num: 2,
                            title: 'Get Complete Paperwork',
                            desc: 'Receive a 100% compliant documentation kit containing a Rent Agreement, No Objection Certificate (NOC), Consent Letters, and a recent municipal Utility Bill.'
                        },
                        {
                            num: 3,
                            title: 'GST Portal Submission',
                            desc: 'Submit the documents to the GST portal or MCA registry. Our team offers dedicated verification support to ensure seamless government approval.'
                        }
                    ]
                },
                sort_order: 4,
                is_visible: true
            },
            {
                id: 5,
                section_identifier: 'cabins',
                title: 'Flagship <span class="underline-highlight">6 Private Cabins</span>',
                subtitle: 'We operate 6 premium, sound-insulated private cabins in our Navrangpura center. Designed for ultimate focus, private client negotiations, and team synergy.',
                content_json: {
                    features: [
                        'Dedicated locking keys for absolute privacy',
                        'Ergonomic premium chairs & broad wooden desks',
                        'Individual multi-split AC environment controls'
                    ],
                    button_text: 'Book a Cabin Tour',
                    button_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20renting%20a%20private%20cabin%20at%20Patel%20Workspace.'
                },
                sort_order: 5,
                is_visible: true
            },
            {
                id: 6,
                section_identifier: 'pricing',
                title: 'Flexible <span class="underline-highlight">Pricing Plans</span>',
                subtitle: 'Choose the perfect tier that matches your business model, scale, and operational requirements in Ahmedabad.',
                content_json: {
                    tiers: [
                        {
                            title: 'Virtual Office',
                            price: '₹999',
                            period: ' / month',
                            desc: 'Billed annually — Save 20%',
                            features: [
                                'Navrangpura Business Address',
                                'NOC & Consent Letter included',
                                'GST & Business Registration docs',
                                'Mail reception & courier scans'
                            ],
                            btn_text: 'Register Now',
                            btn_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20your%20Virtual%20Office%20GST%20Pricing%20Plan.',
                            featured: false
                        },
                        {
                            title: 'Coworking Day Pass',
                            price: '₹499',
                            period: ' / day',
                            desc: 'Perfect for freelancers and nomads',
                            features: [
                                'High-Speed 500Mbps Wi-Fi access',
                                'Ergonomic desk in open zone',
                                'Unlimited premium tea & coffee',
                                'Print/scan station access'
                            ],
                            btn_text: 'Book Desk',
                            btn_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Coworking%20Day%20Pass.',
                            featured: true
                        },
                        {
                            title: 'Private Cabin',
                            price: '₹7,999',
                            period: ' / month',
                            desc: 'Starts from ₹7,999/seat based on size',
                            features: [
                                'Fits 2-6 team members',
                                'Secure lockers and key locks',
                                'Integrated markers whiteboards',
                                'Dedicated LAN ethernet links'
                            ],
                            btn_text: 'Get Quote',
                            btn_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20Private%20Cabin%20at%20Patel%20Workspace.',
                            featured: false
                        }
                    ]
                },
                sort_order: 6,
                is_visible: true
            },
            {
                id: 7,
                section_identifier: 'amenities',
                title: 'All-Inclusive <span class="underline-highlight">Amenities</span>',
                subtitle: 'Focus solely on growing your business while our professional crew handles the facility operations seamlessly.',
                content_json: {
                    amenities: [
                        { title: '500 Mbps Dual Internet', icon: 'wifi' },
                        { title: 'Air Conditioning', icon: 'ac' },
                        { title: 'Unlimited Tea & Coffee', icon: 'coffee' },
                        { title: 'Daily Cleaning', icon: 'cleaning' },
                        { title: 'Power Generator Backup', icon: 'power' },
                        { title: '24/7 CCTV Monitoring', icon: 'cctv' },
                        { title: 'Printing & Scanning Hub', icon: 'print' },
                        { title: 'Front Desk Courier Service', icon: 'courier' }
                    ]
                },
                sort_order: 7,
                is_visible: true
            },
            {
                id: 8,
                section_identifier: 'location',
                title: 'Be at the Beating Heart of <span class="underline-highlight">Ahmedabad</span>',
                subtitle: 'Located in the highly sought-after commercial district of <strong>Navrangpura, Ahmedabad (380009)</strong>. Establishing a presence here boosts corporate credibility for CA networks, IT agencies, and legal consultants.',
                content_json: {
                    coordinates_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20get%20directions%20and%20enquire%20about%20Patel%20Workspace.'
                },
                sort_order: 8,
                is_visible: true
            },
            {
                id: 9,
                section_identifier: 'testimonials',
                title: 'Trusted By <span class="underline-highlight">Local Businesses</span>',
                subtitle: 'Read what successful CAs, technology founders, and consultants in Ahmedabad say about our private cabins and Virtual Office services.',
                content_json: {
                    testimonials: [
                        {
                            name: 'CA Rajendra Shah',
                            role: 'Senior Partner, Shah & Associates',
                            avatar: 'RS',
                            text: '"We registered three client companies at Patel Workspace for their Virtual Office and GST address. The paperwork (NOC, agreement, utility bill) was absolutely flawless, and the GST authority approved it with zero queries. Highly recommended for CAs and corporate lawyers in Ahmedabad!"'
                        },
                        {
                            name: 'Amit Patel',
                            role: 'Founder & CEO, DexaTech Solutions',
                            avatar: 'AP',
                            text: '"Renting Cabin 3 for our engineering team has been a stellar decision. Navrangpura is highly accessible for all our employees, the pantry coffee is top-tier, and the power backup has kept us 100% online. Outstanding hospitality!"'
                        },
                        {
                            name: 'Nisha Mehta',
                            role: 'UI/UX Consultant',
                            avatar: 'NM',
                            text: '"As a freelance designer, the Day Pass is perfect. It gives me a premium, noise-free air-conditioned cabin space that boosts my productivity far more than coffee shops. And the pricing is incredibly reasonable!"'
                        }
                    ]
                },
                sort_order: 9,
                is_visible: true
            },
            {
                id: 10,
                section_identifier: 'cta',
                title: 'Establish Your Premium Address',
                subtitle: 'Book a private cabin tour or register for your GST virtual office today. Leverage Ahmedabad\'s premium corporate location.',
                content_json: {
                    button_1_text: 'Book GST Registration',
                    button_1_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20register%20for%20a%20Virtual%20Office%20GST%20plan%20at%20Patel%20Workspace.',
                    button_2_text: 'Call helpline',
                    button_2_url: 'tel:+919999999999',
                    note: 'Need instant customized cabins? Visit our facility today.'
                },
                sort_order: 10,
                is_visible: true
            }
        ],
        cabins: [
            {
                id: 1,
                name: 'Cabin 1 (Premium 4-Seater)',
                description: 'Spacious executive desks, glass paneling',
                price: 12999,
                price_suffix: '/ month',
                status: 'available',
                capacity: '4 Seats'
            },
            {
                id: 2,
                name: 'Cabin 2 (Standard 2-Seater)',
                description: 'Cozy private workspace with locks',
                price: 8999,
                price_suffix: '/ month',
                status: 'occupied',
                capacity: '2 Seats'
            },
            {
                id: 3,
                name: 'Cabin 3 (Team Cabin 6-Seater)',
                description: 'Integrated marker whiteboard & storage',
                price: 18999,
                price_suffix: '/ month',
                status: 'available',
                capacity: '6 Seats'
            },
            {
                id: 4,
                name: 'Cabin 4 (Standard 3-Seater)',
                description: 'Modern interior, quiet environment',
                price: 10999,
                price_suffix: '/ month',
                status: 'available',
                capacity: '3 Seats'
            },
            {
                id: 5,
                name: 'Cabin 5 (Executive 4-Seater)',
                description: 'Executive furniture set, double lockers',
                price: 14999,
                price_suffix: '/ month',
                status: 'occupied',
                capacity: '4 Seats'
            },
            {
                id: 6,
                name: 'Cabin 6 (Executive 3-Seater)',
                description: 'Window view over Navrangpura Avenue',
                price: 10999,
                price_suffix: '/ month',
                status: 'available',
                capacity: '3 Seats'
            }
        ],
        services: [
            {
                id: 1,
                type: 'on-demand',
                title: 'Day Pass',
                description: 'Desks-by-the-day in our premium Navrangpura coworking layout. Walk in, plug in, get to work with high-speed internet.',
                price: '₹699',
                price_suffix: '/ day',
                icon_svg: 'wifi',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Day%20Pass%20at%20Patel%20Workspace.'
            },
            {
                id: 2,
                type: 'on-demand',
                title: 'Meeting Rooms',
                description: 'Fully equipped, quiet meeting and conference rooms for interviews, presentations, or training sessions.',
                price: '₹499',
                price_suffix: '/ hour',
                icon_svg: 'calendar',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Meeting%20Room%20at%20Patel%20Workspace.'
            },
            {
                id: 3,
                type: 'on-demand',
                title: 'Team Plan',
                description: 'Flexible pass packages tailored for remote and hybrid teams. Grant your employees desk access on their own schedule.',
                price: 'Custom',
                price_suffix: '/ pricing',
                icon_svg: 'team',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20the%20Team%20Plan%20at%20Patel%20Workspace.'
            },
            {
                id: 4,
                type: 'on-demand',
                title: 'Event Spaces',
                description: 'Premium open floor configurations with projection and seating setup for corporate presentations or workshops.',
                price: 'Custom',
                price_suffix: '/ pricing',
                icon_svg: 'building',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20book%20the%20Event%20Space%20at%20Patel%20Workspace.'
            },
            {
                id: 5,
                type: 'long-term',
                title: 'Coworking Space',
                description: 'Rent dedicated desks or premium shared cabins with a high-end corporate identity and comprehensive facilities.',
                price: '₹6,999',
                price_suffix: '/ desk / mo',
                icon_svg: 'desk',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20Long-Term%20Coworking%20at%20Patel%20Workspace.'
            },
            {
                id: 6,
                type: 'long-term',
                title: 'Office / Commercial',
                description: 'Secure spacious layout cabins and customized office configurations suitable for scaling teams and firms.',
                price: '₹15,999',
                price_suffix: '/ cabin / mo',
                icon_svg: 'building',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20Office%20Leasing%20at%20Patel%20Workspace.'
            },
            {
                id: 7,
                type: 'long-term',
                title: 'Managed Office',
                description: 'Fully furnished bespoke workspace built out and managed entirely by our professional site hospitality team.',
                price: 'Custom',
                price_suffix: '/ quote',
                icon_svg: 'briefcase',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20Managed%20Office%20at%20Patel%20Workspace.'
            },
            {
                id: 8,
                type: 'long-term',
                title: 'Virtual Office',
                description: 'Prestigious commercial business registration & GST solutions in Navrangpura, Ahmedabad. Rapid document execution.',
                price: '₹999',
                price_suffix: '/ mo (billed yr)',
                icon_svg: 'virtual',
                link_url: 'https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20Virtual%20Office%20with%20GST%20solutions%20at%20Patel%20Workspace.',
                is_featured: true
            }
        ],
        blogs: [
            {
                id: 1,
                title: 'How to Set Up a Virtual Office for GST in Ahmedabad',
                slug: 'virtual-office-gst-ahmedabad',
                content: '<p>Setting up a virtual office for GST registration in Ahmedabad is an excellent and cost-effective way for small businesses, startups, and remote teams to establish a legal, professional address without the overhead of renting a physical commercial office space.</p><h3>Why choose Navrangpura?</h3><p>Navrangpura is one of the most prestigious commercial neighborhoods in Ahmedabad. Having your business registered here boosts credibility for clients, banks, and government portals.</p><h3>Required compliance documents:</h3><ul><li>NOC (No Objection Certificate) from the owner</li><li>Registered rent or consent agreement</li><li>Latest municipal tax paid receipt / utility bill</li></ul><p>At Patel Workspace, we provide a 100% compliant document package within hours so you can submit your GST application with total confidence.</p>',
                excerpt: 'Learn the exact steps, required documentation, and tips to get your virtual office GST registration approved in Ahmedabad with zero hassle.',
                featured_image: 'assets/images/blog-1.jpg',
                status: 'published',
                meta_title: 'Virtual Office GST Registration Ahmedabad — Setup Guide',
                meta_description: 'Step-by-step guide to setting up virtual office for GST registration in Navrangpura, Ahmedabad. Get NOC, rent agreement & utility bill instantly.',
                author: 'admin',
                created_at: '2026-06-15 14:09:51'
            }
        ],
        media: [
            {
                id: 1,
                filename: 'banner.jpg',
                file_path: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
                file_type: 'image/jpeg',
                file_size: 102400,
                folder: 'general',
                created_at: '2026-06-15 14:09:51'
            },
            {
                id: 2,
                filename: 'cabin-view.jpg',
                file_path: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
                file_type: 'image/jpeg',
                file_size: 94500,
                folder: 'general',
                created_at: '2026-06-15 14:09:51'
            }
        ],
        contact_submissions: [
            {
                id: 1,
                name: 'Ketan Parikh',
                email: 'ketan@parikhassociates.in',
                phone: '+91 98765 43210',
                message: 'Hi, I would like to book a Day Pass for tomorrow at your Navrangpura center.',
                status: 'read',
                created_at: '2026-06-15 15:30:22'
            },
            {
                id: 2,
                name: 'Radhika Sen',
                email: 'radhika@techcorp.io',
                phone: '+91 99887 76655',
                message: 'Interested in booking Cabin 3 (Team Cabin 6-Seater) for a period of 6 months. Please share availability details.',
                status: 'unread',
                created_at: '2026-06-15 18:45:10'
            }
        ],
        activity_logs: [
            {
                id: 1,
                user_id: 1,
                username: 'admin',
                action: 'Database Initialized',
                details: 'Database seeded with default values',
                ip_address: '127.0.0.1',
                created_at: '2026-06-15 20:10:40'
            }
        ],
        revisions: []
    };

    // Load DB helper
    function loadDB() {
        let dbStr = localStorage.getItem(DB_KEY);
        if (!dbStr) {
            localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
            return defaultData;
        }
        try {
            return JSON.parse(dbStr);
        } catch (e) {
            console.error("Failed to parse DB, resetting to defaults", e);
            localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
            return defaultData;
        }
    }

    // Save DB helper
    function saveDB(data) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    }

    // Export DB module
    window.db = {
        // Initialize
        init: function() {
            return loadDB();
        },

        // Auth Operations
        login: function(usernameOrEmail, password) {
            let data = loadDB();
            let user = data.users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
            
            if (!user) {
                return { success: false, message: 'Invalid username/email or password.' };
            }

            let now = Date.now();
            // Check Lockout
            if (user.login_attempts >= 5 && user.last_attempt) {
                let diff = now - new Date(user.last_attempt).getTime();
                if (diff < 900000) { // 15 mins
                    let waitMins = Math.ceil((900000 - diff) / 60000);
                    return { success: false, message: `Account locked. Please wait ${waitMins} minutes.` };
                } else {
                    user.login_attempts = 0;
                }
            }

            if (user.password_hash === password) {
                user.login_attempts = 0;
                user.last_attempt = null;
                saveDB(data);
                
                // Session management
                sessionStorage.setItem('patel_session_user', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    loginTime: now
                }));

                this.addActivityLog('Login', `User ${user.username} logged in successfully`, user.id);
                return { success: true };
            } else {
                user.login_attempts++;
                user.last_attempt = new Date().toISOString();
                saveDB(data);
                return { success: false, message: 'Invalid username/email or password.' };
            }
        },

        logout: function() {
            let user = this.getCurrentUser();
            if (user) {
                this.addActivityLog('Logout', `User ${user.username} logged out`, user.id);
            }
            sessionStorage.removeItem('patel_session_user');
        },

        getCurrentUser: function() {
            let session = sessionStorage.getItem('patel_session_user');
            if (!session) return null;
            try {
                let user = JSON.parse(session);
                // Inactivity timeout: 30 minutes (1800000 ms)
                if (Date.now() - user.loginTime > 1800000) {
                    sessionStorage.removeItem('patel_session_user');
                    return null;
                }
                // Refresh login time on active check
                user.loginTime = Date.now();
                sessionStorage.setItem('patel_session_user', JSON.stringify(user));
                return user;
            } catch (e) {
                return null;
            }
        },

        // Settings
        getSettings: function() {
            let data = loadDB();
            return data.settings;
        },

        saveSettings: function(settingsData) {
            let data = loadDB();
            data.settings = Object.assign({}, data.settings, settingsData);
            saveDB(data);
            this.addActivityLog('Update Settings', 'Branding or SEO settings updated');
            this.applyThemeStyles();
            return true;
        },

        // Apply theme color parameters to DOM root
        applyThemeStyles: function() {
            let settings = this.getSettings();
            if (!settings) return;
            
            // Helper to darken a hex color (simulates PHP hex_brightness)
            function hexBrightness(hex, steps) {
                steps = Math.max(-255, Math.min(255, steps));
                hex = hex.replace('#', '');
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                let r = parseInt(hex.substring(0, 2), 16);
                let g = parseInt(hex.substring(2, 4), 16);
                let b = parseInt(hex.substring(4, 6), 16);

                r = Math.max(0, Math.min(255, r + steps));
                g = Math.max(0, Math.min(255, g + steps));
                b = Math.max(0, Math.min(255, b + steps));

                let rHex = r.toString(16).padStart(2, '0');
                let gHex = g.toString(16).padStart(2, '0');
                let bHex = b.toString(16).padStart(2, '0');

                return `#${rHex}${gHex}${bHex}`;
            }

            let primaryDark = hexBrightness(settings.primary_color, -40);
            let secondaryHover = hexBrightness(settings.secondary_color, -30);
            let yellowHover = hexBrightness(settings.accent_yellow, -30);

            // Inject stylesheet variable mappings dynamically
            let styleId = 'theme-variables-stylesheet';
            let styleEl = document.getElementById(styleId);
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = styleId;
                document.head.appendChild(styleEl);
            }
            
            styleEl.innerHTML = `
                :root {
                    --primary-blue: ${settings.primary_color};
                    --primary-blue-dark: ${primaryDark};
                    --accent-blue: ${settings.secondary_color};
                    --accent-blue-hover: ${secondaryHover};
                    --accent-yellow: ${settings.accent_yellow};
                    --accent-yellow-hover: ${yellowHover};
                    --dark-text: ${settings.dark_text};
                    --font-primary: '${settings.font_family}', sans-serif;
                    --font-header: '${settings.font_header}', sans-serif;
                }
                body {
                    font-family: var(--font-primary) !important;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: var(--font-header) !important;
                }
            `;
        },

        // Sections / Page Builder
        getSections: function() {
            let data = loadDB();
            return data.sections.sort((a, b) => a.sort_order - b.sort_order);
        },

        saveSection: function(id, sectionData) {
            let data = loadDB();
            let index = data.sections.findIndex(s => s.id == id);
            if (index !== -1) {
                // Save revision history record
                this.saveRevision('section', id, data.sections[index]);
                
                data.sections[index] = Object.assign({}, data.sections[index], sectionData);
                saveDB(data);
                this.addActivityLog('Update Section', `Updated section: ${data.sections[index].section_identifier}`);
                return true;
            }
            return false;
        },

        reorderSections: function(orderedIds) {
            let data = loadDB();
            orderedIds.forEach((id, idx) => {
                let section = data.sections.find(s => s.id == id);
                if (section) {
                    section.sort_order = idx + 1;
                }
            });
            saveDB(data);
            this.addActivityLog('Reorder Sections', 'Re-arranged page builder layout order');
            return true;
        },

        // Cabins (Products)
        getCabins: function() {
            let data = loadDB();
            return data.cabins;
        },

        saveCabin: function(id, cabinData) {
            let data = loadDB();
            if (id === 'add') {
                let newId = data.cabins.length > 0 ? Math.max(...data.cabins.map(c => c.id)) + 1 : 1;
                let newCabin = Object.assign({ id: newId }, cabinData);
                data.cabins.push(newCabin);
                saveDB(data);
                this.addActivityLog('Add Cabin', `Created new cabin: ${newCabin.name}`);
                return true;
            }

            let index = data.cabins.findIndex(c => c.id == id);
            if (index !== -1) {
                this.saveRevision('cabin', id, data.cabins[index]);
                data.cabins[index] = Object.assign({}, data.cabins[index], cabinData);
                saveDB(data);
                this.addActivityLog('Edit Cabin', `Updated cabin details: ${data.cabins[index].name}`);
                return true;
            }
            return false;
        },

        deleteCabin: function(id) {
            let data = loadDB();
            let index = data.cabins.findIndex(c => c.id == id);
            if (index !== -1) {
                let name = data.cabins[index].name;
                data.cabins.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete Cabin', `Deleted cabin: ${name}`);
                return true;
            }
            return false;
        },

        toggleCabinStatus: function(id) {
            let data = loadDB();
            let index = data.cabins.findIndex(c => c.id == id);
            if (index !== -1) {
                let status = data.cabins[index].status;
                let newStatus = status === 'available' ? 'occupied' : 'available';
                data.cabins[index].status = newStatus;
                saveDB(data);
                this.addActivityLog('Toggle Cabin Status', `Toggled Cabin ${data.cabins[index].name} to ${newStatus}`);
                return newStatus;
            }
            return null;
        },

        // Services
        getServices: function() {
            let data = loadDB();
            return data.services;
        },

        saveService: function(id, serviceData) {
            let data = loadDB();
            if (id === 'add') {
                let newId = data.services.length > 0 ? Math.max(...data.services.map(s => s.id)) + 1 : 1;
                let newService = Object.assign({ id: newId }, serviceData);
                data.services.push(newService);
                saveDB(data);
                this.addActivityLog('Add Service', `Created new offering: ${newService.title}`);
                return true;
            }

            let index = data.services.findIndex(s => s.id == id);
            if (index !== -1) {
                data.services[index] = Object.assign({}, data.services[index], serviceData);
                saveDB(data);
                this.addActivityLog('Edit Service', `Updated service details: ${data.services[index].title}`);
                return true;
            }
            return false;
        },

        deleteService: function(id) {
            let data = loadDB();
            let index = data.services.findIndex(s => s.id == id);
            if (index !== -1) {
                let title = data.services[index].title;
                data.services.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete Service', `Deleted offering: ${title}`);
                return true;
            }
            return false;
        },

        // Blogs
        getBlogs: function() {
            let data = loadDB();
            return data.blogs;
        },

        saveBlog: function(id, blogData) {
            let data = loadDB();
            let author = this.getCurrentUser() ? this.getCurrentUser().username : 'admin';
            
            // Helper to generate slugs
            function generateSlug(text) {
                return text.toString().toLowerCase().trim()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
            }

            let slug = blogData.slug ? generateSlug(blogData.slug) : generateSlug(blogData.title);

            if (id === 'add') {
                let newId = data.blogs.length > 0 ? Math.max(...data.blogs.map(b => b.id)) + 1 : 1;
                let newBlog = Object.assign({
                    id: newId,
                    slug: slug,
                    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    author: author
                }, blogData);
                
                data.blogs.push(newBlog);
                saveDB(data);
                this.addActivityLog('Add Blog', `Published/Drafted article: ${newBlog.title}`);
                return newBlog;
            }

            let index = data.blogs.findIndex(b => b.id == id);
            if (index !== -1) {
                let updatedBlog = Object.assign({}, data.blogs[index], blogData, { slug: slug });
                data.blogs[index] = updatedBlog;
                saveDB(data);
                this.addActivityLog('Edit Blog', `Updated article: ${updatedBlog.title}`);
                return updatedBlog;
            }
            return null;
        },

        deleteBlog: function(id) {
            let data = loadDB();
            let index = data.blogs.findIndex(b => b.id == id);
            if (index !== -1) {
                let title = data.blogs[index].title;
                data.blogs.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete Blog', `Deleted article: ${title}`);
                return true;
            }
            return false;
        },

        // Submissions
        getSubmissions: function() {
            let data = loadDB();
            return data.contact_submissions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        },

        addSubmission: function(submissionData) {
            let data = loadDB();
            let newId = data.contact_submissions.length > 0 ? Math.max(...data.contact_submissions.map(s => s.id)) + 1 : 1;
            let newSub = Object.assign({
                id: newId,
                status: 'unread',
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }, submissionData);
            
            data.contact_submissions.push(newSub);
            saveDB(data);
            
            // Log public action (no explicit user_id)
            this.addActivityLog('Visitor Message', `Contact query submitted by ${newSub.name} (${newSub.email})`);
            return { success: true, message: 'Your tour request has been submitted successfully! We will contact you soon.' };
        },

        deleteSubmission: function(id) {
            let data = loadDB();
            let index = data.contact_submissions.findIndex(s => s.id == id);
            if (index !== -1) {
                data.contact_submissions.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete Submission', `Removed submission ID: ${id}`);
                return true;
            }
            return false;
        },

        toggleSubmissionStatus: function(id) {
            let data = loadDB();
            let index = data.contact_submissions.findIndex(s => s.id == id);
            if (index !== -1) {
                let status = data.contact_submissions[index].status;
                let newStatus = status === 'unread' ? 'read' : 'unread';
                data.contact_submissions[index].status = newStatus;
                saveDB(data);
                return newStatus;
            }
            return null;
        },

        // Media Manager
        getMedia: function() {
            let data = loadDB();
            return data.media;
        },

        addMedia: function(fileData) {
            let data = loadDB();
            let newId = data.media.length > 0 ? Math.max(...data.media.map(m => m.id)) + 1 : 1;
            let newMedia = Object.assign({
                id: newId,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }, fileData);
            data.media.push(newMedia);
            saveDB(data);
            this.addActivityLog('Upload Media', `Added asset file: ${newMedia.filename}`);
            return newMedia;
        },

        deleteMedia: function(id) {
            let data = loadDB();
            let index = data.media.findIndex(m => m.id == id);
            if (index !== -1) {
                let filename = data.media[index].filename;
                data.media.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete Media', `Deleted asset file: ${filename}`);
                return true;
            }
            return false;
        },

        // Activity Logs
        getActivityLogs: function() {
            let data = loadDB();
            return data.activity_logs.sort((a, b) => b.id - a.id);
        },

        addActivityLog: function(action, details, userId = null) {
            let data = loadDB();
            let uId = userId || (this.getCurrentUser() ? this.getCurrentUser().id : null);
            let uName = this.getCurrentUser() ? this.getCurrentUser().username : 'visitor';
            
            let newId = data.activity_logs.length > 0 ? Math.max(...data.activity_logs.map(l => l.id)) + 1 : 1;
            let log = {
                id: newId,
                user_id: uId,
                username: uName,
                action: action,
                details: details,
                ip_address: '127.0.0.1', // Mock IP
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };
            data.activity_logs.push(log);
            saveDB(data);
        },

        // Revisions Manager
        saveRevision: function(entityType, entityId, content) {
            let data = loadDB();
            let userId = this.getCurrentUser() ? this.getCurrentUser().id : null;
            let newId = data.revisions.length > 0 ? Math.max(...data.revisions.map(r => r.id)) + 1 : 1;
            
            let revision = {
                id: newId,
                entity_type: entityType,
                entity_id: entityId,
                content_json: JSON.stringify(content),
                user_id: userId,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };

            data.revisions.push(revision);
            
            // Limit revisions to top 10 per entity
            let entityRevs = data.revisions
                .filter(r => r.entity_type === entityType && r.entity_id == entityId)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            if (entityRevs.length > 10) {
                let toRemove = entityRevs.slice(10).map(r => r.id);
                data.revisions = data.revisions.filter(r => !toRemove.includes(r.id));
            }
            saveDB(data);
        },

        getRevisions: function(entityType, entityId) {
            let data = loadDB();
            return data.revisions
                .filter(r => r.entity_type === entityType && r.entity_id == entityId)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        },

        // Users
        getUsers: function() {
            let data = loadDB();
            return data.users;
        },

        saveUser: function(id, userData) {
            let data = loadDB();
            if (id === 'add') {
                let newId = data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
                
                // Validate duplicate username/email
                if (data.users.some(u => u.username === userData.username || u.email === userData.email)) {
                    return { success: false, message: 'Username or email already exists.' };
                }

                let newUser = Object.assign({
                    id: newId,
                    login_attempts: 0,
                    last_attempt: null
                }, userData);
                data.users.push(newUser);
                saveDB(data);
                this.addActivityLog('Add User', `Created account for ${newUser.username} (${newUser.role})`);
                return { success: true };
            }

            let index = data.users.findIndex(u => u.id == id);
            if (index !== -1) {
                // Ensure duplicate checks do not hit self
                if (data.users.some(u => u.id != id && (u.username === userData.username || u.email === userData.email))) {
                    return { success: false, message: 'Username or email already exists.' };
                }
                
                data.users[index] = Object.assign({}, data.users[index], userData);
                saveDB(data);
                this.addActivityLog('Edit User', `Updated user settings for ${data.users[index].username}`);
                return { success: true };
            }
            return { success: false, message: 'User not found.' };
        },

        deleteUser: function(id) {
            let data = loadDB();
            let index = data.users.findIndex(u => u.id == id);
            if (index !== -1) {
                let username = data.users[index].username;
                data.users.splice(index, 1);
                saveDB(data);
                this.addActivityLog('Delete User', `Removed user account: ${username}`);
                return true;
            }
            return false;
        },

        // Backup and Restore JSON file utilities
        exportBackup: function() {
            let data = loadDB();
            let dataStr = JSON.stringify(data, null, 4);
            let blob = new Blob([dataStr], { type: 'application/json' });
            let url = URL.createObjectURL(blob);
            
            let a = document.createElement('a');
            a.href = url;
            a.download = `patel_workspace_db_backup_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            this.addActivityLog('Export Backup', 'Downloaded simulated database JSON file');
        },

        importBackup: function(jsonText) {
            try {
                let data = JSON.parse(jsonText);
                
                // Basic validation of schema fields
                if (!data.users || !data.settings || !data.sections || !data.cabins || !data.services || !data.blogs) {
                    return { success: false, message: 'Invalid backup file structure.' };
                }

                saveDB(data);
                this.applyThemeStyles();
                this.addActivityLog('Import Backup', 'Restored simulated database from JSON file');
                return { success: true };
            } catch (e) {
                return { success: false, message: 'Failed to parse JSON file: ' + e.message };
            }
        }
    };

    // Auto init and apply theme styles on page load
    window.db.init();
    window.db.applyThemeStyles();
})();
