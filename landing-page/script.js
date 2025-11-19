// 1. Tailwind Configuration
// This must run before the DOM is fully painted for the CDN to pick up custom colors.
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            colors: {
                pareto: {
                    mainBlue: '#003255',
                    magenta: '#DE0080',
                    magentaHover: '#B8006A',
                    nordicBlue: '#AFCDD7',
                    thyme: '#729C8C',
                    gold: '#FFC200',
                    darkBlue: '#0F1A2D',
                    darkGrey: '#6A7882',
                    lightGrey: '#EEEEEE',
                    positive: '#00659F',
                    negative: '#CC0000',
                    surface: '#1e293b'
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scan': 'scan 3s linear infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'scroll': 'scroll 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scan: {
                    '0%': { top: '0%', opacity: 0 },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 1 },
                    '100%': { top: '100%', opacity: 0 },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    }
};

// 2. Page Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Simple Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // 3. Pricing Tabs Logic
    const tabInvest = document.getElementById('tab-invest');
    const tabTrade = document.getElementById('tab-trade');
    const pricingInvest = document.getElementById('pricing-invest');
    const pricingTrade = document.getElementById('pricing-trade');

    if (tabInvest && tabTrade && pricingInvest && pricingTrade) {
        const setActive = (activeTab, inactiveTab, activeContent, inactiveContent) => {
            // Update Content Visibility
            activeContent.classList.remove('hidden');
            activeContent.classList.add('grid'); // Ensure grid display is restored
            inactiveContent.classList.add('hidden');
            inactiveContent.classList.remove('grid');

            // Update Tab Styles
            // Active State
            activeTab.classList.add('bg-pareto-magenta', 'text-white', 'shadow-lg');
            activeTab.classList.remove('text-gray-400', 'hover:text-white');

            // Inactive State
            inactiveTab.classList.remove('bg-pareto-magenta', 'text-white', 'shadow-lg');
            inactiveTab.classList.add('text-gray-400', 'hover:text-white');
        };

        tabInvest.addEventListener('click', () => {
            setActive(tabInvest, tabTrade, pricingInvest, pricingTrade);
        });

        tabTrade.addEventListener('click', () => {
            setActive(tabTrade, tabInvest, pricingTrade, pricingInvest);
        });
    }
});