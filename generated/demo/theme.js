const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    console.log(currentTheme)
}
// if (localStorage.theme === 'dark' || window.matchMedia(
//         '(prefers-color-scheme: dark)').matches) {
//     document.documentElement.setAttribute('data-theme', 'dark');
// } else {
//     document.documentElement.setAttribute('data-theme', 'light');
// }
// if (localStorage.getItem("theme")) {
//     if (localStorage.getItem("theme") == "dark") {
//         // var theme = "dark";
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//     }
//     else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
// }
// } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     //OS theme setting detected as dark
//     // var theme = "dark";
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
// } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
// }

function lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    console.log(localStorage.getItem('theme'))
    matchMediaPrefDark.removeEventListener('change', onSystemThemeChange);
}

function darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    console.log(localStorage.getItem('theme'))
    matchMediaPrefDark.removeEventListener('change', onSystemThemeChange);
}


// function systemMode() {

// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     //OS theme setting detected as dark
//     // var theme = "dark";
// document.documentElement.setAttribute('data-theme', 'dark');
// localStorage.setItem('theme', 'dark');
// console.log("it matches")
// }
const matchMediaPrefDark = window.matchMedia('(prefers-color-scheme: dark)');

function systemMode() {
    console.log('hey');

    // if (currentTheme === 'dark' && matchMediaPrefDark.matches) {
    //     document.documentElement.setAttribute('data-theme', 'dark');
    //     localStorage.setItem('theme', 'dark');
    // } else {
    //     document.documentElement.setAttribute('data-theme', 'light');
    //     localStorage.setItem('theme', 'light');
    // }
    matchMediaPrefDark.addEventListener('change', onSystemThemeChange);
}
// matchMediaPrefDark.addEventListener('change', onSystemThemeChange);
// if ((localStorage.theme === 'dark') && matchMediaPrefDark.matches) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
// } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
// }
// const theme = localStorage.getItem('data-theme')
// document.documentElement.setAttribute('data-theme', theme)

function onSystemThemeChange(e) {
    const isDark = e.matches;
    console.log(isDark)

    document.querySelector('html').dataset.theme = `${isDark ? 'dark' : 'light'}`;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}
        // }

        // localStorage.removeItem('theme')
        // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia(
        //         '(prefers-color-scheme: dark)').matches)) {
        //     document.documentElement.setAttribute('data-theme', 'dark');
        // } else {
        //     document.documentElement.setAttribute('data-theme', 'light');
        // }
        // if (localStorage.theme === 'dark' || window.matchMedia(
        //         '(prefers-color-scheme: dark)').matches) {
        //     document.documentElement.setAttribute('data-theme', 'dark');
        // } else {
        //     document.documentElement.setAttribute('data-theme', 'light');
        // }
        // if (localStorage.getItem("theme")) {
        //     if (localStorage.getItem("theme") == "dark") {
        //         // var theme = "dark";
        //         document.documentElement.setAttribute('data-theme', 'dark');
        //         localStorage.setItem('theme', 'dark');
        //     } else {
        //         document.documentElement.setAttribute('data-theme', 'light');
        //         localStorage.setItem('theme', 'light');
        //     }
        // } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //     //OS theme setting detected as dark
        //     // var theme = "dark";
        //     document.documentElement.setAttribute('data-theme', 'dark');
        //     localStorage.setItem('theme', 'dark');
        //     console.log("it matches")
        // } else {
        //     document.documentElement.setAttribute('data-theme', 'light');
        //     localStorage.setItem('theme', 'light');
        // }

        // console.log(localStorage.getItem('theme'));
        // }
        // lightMode();
        // darkMode();

        // console.log(currentTheme)

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia(
        //         '(prefers-color-scheme: dark)').matches)) {
        //     document.documentElement.classList.add('dark')
        // } else {
        //     document.documentElement.classList.remove('dark')
        // }

        // Whenever the user explicitly chooses light mode
        // localStorage.theme = 'light'

        // Whenever the user explicitly chooses dark mode
        // localStorage.theme = 'dark'

        // Whenever the user explicitly chooses to respect the OS preference
        // localStorage.removeItem('theme')

        // const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
        // const currentTheme = localStorage.getItem('theme');
        // if (currentTheme) {
        //     document.documentElement.setAttribute('data-theme', currentTheme);

        //     if (currentTheme === 'dark') {
        //         toggleSwitch.checked = true;
        //     }
        // }

        // function switchTheme(e) {
        //     if (e.target.checked) {
        //         document.documentElement.setAttribute('data-theme', 'dark');
        //         localStorage.setItem('theme', 'dark');
        //     } else {
        //         document.documentElement.setAttribute('data-theme', 'light');
        //         localStorage.setItem('theme', 'light');
        //     }
        // }
        // toggleSwitch.addEventListener('change', switchTheme, false);