const STORAGE_KEY = 'gt_current_lang';
const languageCodes = {
    'ko': 'KR', 'en': 'EN', 'ja': 'JP', 'zh-CN': 'CN'
};

function updateActiveButtonState(langCode) {
    const container = document.getElementById('google_translate_element_custom');
    if (!container) return;

    container.querySelectorAll('.translate-btn').forEach(btn => btn.classList.remove('active'));

    container.querySelector(`.translate-btn[data-lang="${langCode}"]`)?.classList.add('active');
}

function createCustomButtons() {
    const container = document.getElementById('google_translate_element_custom');
    const toggleBtn = document.getElementById('translate-toggle-btn');

    if (!container || !toggleBtn) return;

    container.innerHTML = '';
    for (const code in languageCodes) {
        const button = document.createElement('button');
        button.textContent = languageCodes[code];
        button.classList.add('translate-btn');
        button.setAttribute('data-lang', code);

        button.addEventListener('click', function() {
            if (code === 'ko') {
                localStorage.removeItem(STORAGE_KEY);
                setTranslation(code);
                setTimeout(() => {
                    setTranslation(code);
                }, 100);
            } else {
                localStorage.setItem(STORAGE_KEY, code);
                setTranslation(code);
            }

            updateActiveButtonState(code);

            if (window.innerWidth <= 767) {
                container.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
        container.appendChild(button);
    }

    const storedLang = localStorage.getItem(STORAGE_KEY) || 'ko';
    updateActiveButtonState(storedLang);

    toggleBtn.addEventListener('click', function() {
        const isOpen = container.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });
}

function setTranslation(langCode, attempts = 0) {
    const maxAttempts = 20;
    const select = document.querySelector('#google_translate_element .goog-te-combo');

    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    } else if (attempts < maxAttempts) {
        setTimeout(() => setTranslation(langCode, attempts + 1), 50);
    }
}

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'ko',
        includedLanguages: 'ko,en,ja,zh-CN',
        autoDisplay: false
    }, 'google_translate_element');

    createCustomButtons();

    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang && storedLang !== 'ko') {
        setTranslation(storedLang);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
});