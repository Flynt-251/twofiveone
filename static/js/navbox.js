const navToggle = document.getElementById('navLanding');
const navLinks = document.querySelectorAll('.navLinks');
const navbox = document.getElementById('navbox');
const navImage = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navigationToggle = false;

navToggle.addEventListener('click', () => {
    navigationToggle = !navigationToggle;

    if (navigationToggle) {
        navbox.style.width = '175px';
        navbox.style.height = '350px';
        navList.style.visibility = 'visible';
        navLinks.forEach(link => {
            link.style.opacity = '1';
        });

    } else {
        navLinks.forEach(link => {
            link.style.opacity = '0';
        });
        navList.style.visibility = 'hidden';
        navbox.style.width = '110px';
        navbox.style.height = '110px';
    }


    // alert('Navigation toggle clicked!');
});

