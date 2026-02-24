/**
 * Main JS for py-postman docs
 * Author: McSixDev (mcsixdev)
 * Telegram: @McSixDev
 */

hljs.highlightAll();
const themeToggles = document.querySelectorAll('.theme-toggle');
const sunIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
const moonIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    themeToggles.forEach(btn => {
        btn.innerHTML = isDark ? sunIcon : moonIcon;
    });
}
themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        updateThemeIcons();
    });
});
updateThemeIcons();
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
const navLinks = document.querySelectorAll('.nav-link');
function toggleMenu() {
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
}
mobileMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) toggleMenu();
    });
});
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const codeBlock = this.closest('.code-window').querySelector('code:last-of-type');
        const textToCopy = codeBlock ? codeBlock.innerText : this.closest('.code-window').querySelector('code').innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const textSpan = this.querySelector('span');
            const iconCopy = this.querySelector('.icon-copy');
            const iconCheck = this.querySelector('.icon-check');
            const originalText = textSpan.innerText;
            textSpan.innerText = 'Скопировано';
            this.classList.add('copied');
            iconCopy.classList.add('hidden');
            iconCheck.classList.remove('hidden');
            setTimeout(() => {
                textSpan.innerText = originalText;
                this.classList.remove('copied');
                iconCopy.classList.remove('hidden');
                iconCheck.classList.add('hidden');
            }, 2000);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                        const parentDetails = link.closest('details');
                        if (parentDetails && !parentDetails.open) {
                            parentDetails.open = true;
                        }
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(sec => observer.observe(sec));
});
const tableContainer = document.querySelector('.table-container');
const tableWrapper = document.querySelector('.table-wrapper');
if (tableContainer && tableWrapper) {
    const handleTableScroll = () => {
        const maxScrollLeft = tableContainer.scrollWidth - tableContainer.clientWidth;
        if (tableContainer.scrollLeft >= maxScrollLeft - 5) {
            tableWrapper.classList.remove('table-scroll-hint');
        } else {
            tableWrapper.classList.add('table-scroll-hint');
        }
    };
    tableContainer.addEventListener('scroll', handleTableScroll);
    window.addEventListener('resize', handleTableScroll);
    handleTableScroll();
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre, code').forEach(el => {
        el.classList.add('notranslate');
        el.setAttribute('translate', 'no');
    });
    const shadowContainer = document.createElement('div');
    shadowContainer.id = 'shadow-translation-container';
    shadowContainer.style.cssText = 'position: absolute; left: -9999px; top: 0; width: 500px; height: auto; opacity: 0.01; z-index: -999; pointer-events: none;';
    shadowContainer.className = 'translate';
    shadowContainer.setAttribute('translate', 'yes');
    document.body.appendChild(shadowContainer);
    setTimeout(() => {
        const bindings = [];
        document.querySelectorAll('.hljs-comment').forEach(commentNode => {
            const shadowBlock = document.createElement('div');
            shadowBlock.style.marginBottom = '10px';
            shadowBlock.textContent = commentNode.textContent;
            shadowContainer.appendChild(shadowBlock);
            bindings.push({
                original: commentNode,
                shadow: shadowBlock
            });
        });
        const observer = new MutationObserver(() => {
            bindings.forEach(binding => {
                const translatedText = binding.shadow.textContent;
                if (binding.original.textContent !== translatedText) {
                    binding.original.textContent = translatedText;
                }
            });
        });
        observer.observe(shadowContainer, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }, 500);
    const langBtns = document.querySelectorAll('.lang-btn');
    function updateActiveBtn(lang) {
        langBtns.forEach(btn => {
            btn.className = 'lang-btn flex-1 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all';
            if (btn.getAttribute('data-lang') === lang) {
                btn.className = 'lang-btn flex-1 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white transition-all';
            }
        });
    }
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang === 'ru') {
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + location.hostname + "; path=/;";
                location.reload();
                return;
            }
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = targetLang;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                updateActiveBtn(targetLang);
            } else {
                document.cookie = `googtrans=/ru/${targetLang}; path=/`;
                document.cookie = `googtrans=/ru/${targetLang}; domain=${location.hostname}; path=/`;
                location.reload();
            }
        });
    });
    const checkCurrentLang = () => {
        const match = document.cookie.match(/googtrans=\/[^\/]+\/([a-zA-Z-]+)/);
        let currentLang = match ? match[1] : 'ru';
        if (currentLang === 'zh-CN') currentLang = 'zh-CN';
        const select = document.querySelector('.goog-te-combo');
        if (select && select.value) {
            currentLang = select.value;
        }
        updateActiveBtn(currentLang);
    };
    setTimeout(checkCurrentLang, 500);
});
