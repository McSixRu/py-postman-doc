/**
 * Main JS for py-postman docs
 * Author: McSixDev (mcsixdev)
 * Telegram: @McSixDev
 */

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
