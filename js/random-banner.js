(function () {
    var banner = document.getElementById('banner');
    if (!banner) return;

    var path = window.location.pathname || '/';
    var isHome = path === '/' || path === '/index.html' || /\/index\.html$/.test(path);
    if (!isHome) return;

    var images = [
        '/img/bg/homepic.jpg',
        '/img/bg/noo_homepic.jpg',
        '/img/bg/leetcode_bg.png'
    ];

    if (!images.length) return;
    var idx = Math.floor(Math.random() * images.length);
    var url = images[idx];

    banner.style.backgroundImage = 'url(' + url + ')';
    banner.style.backgroundRepeat = 'no-repeat';
    banner.style.backgroundPosition = 'center center';
    banner.style.backgroundSize = 'cover';
})();
