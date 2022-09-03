// Progress Loader
var progress = document.querySelector('.progress');
var count = 1;
// var loading = setInterval(animate, 1);

function animate() {
    if (count == 100) {
        clearInterval(loading);
        document.querySelector(".loader-card").style.display = 'none';
    } else {
        count = count + 1;
        progress.style.width = count + '%';
    }
}

var texts = [
    "Incase you're wondering, today is Friday",
    "Crooked sticks still draw straight lines",
    "Don’t forget to stay hydrated",
    "Take a deep breath",
    "Do the things your fear says you can’t",
    "Challenges make your story inspiring",
    "A great past is not required for a great future.",
    "Remember how far you’ve come",
    "Good things take time",
    "Do us a favor, don't hide your magic!",
    "Small progress is still progress",
    "Fall 7 times, stand up 8",
    "Anxiety is lying. Better days are coming",
    "Keep going, you're amazing!",
    "You're your own hero",
    "Prioritise your health and your peace",
    "Late Night",
    "Work while they sleep, live like they dream",
    "These late nights and early mornings will pay off",
    "Please take time to rest",
    "Relax. You are enough",
    "Release your worries, you’ll be okay."
];

var point = 0;

function changeText() {
    const loaderText = document.querySelector('.loader-text');
    loaderText.textContent = texts[point];
    if (point < (texts.length - 1)) {
        point++;
    } else {
        point = 0;
    }
}
// setInterval(changeText, 1500);
// changeText();


// function to show menu 
var openMenu = document.querySelector('.menu-icon');
openMenu.addEventListener('click', function () {
    document.querySelector('.mobile-nav-overlay').classList.add('open');
});

// function to hide menu 
var closeMenu = document.querySelector('.close-icon');
closeMenu.addEventListener('click', function () {
    document.querySelector('.mobile-nav-overlay').classList.remove('open');
});

// share api
const shareButton = document.querySelector('.share-link');
shareButton.addEventListener('click', event => {
    if (navigator.share) {
        navigator.share({
            title: 'WebShare API Demo',
            url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch(err => console.log(err));
    } else {
        alert('Not Supported');
        // shareDialog.classList.add('is-open');
    }
});

        // closeButton.addEventListener('click', event => {
        //     shareDialog.classList.remove('is-open');
        // });