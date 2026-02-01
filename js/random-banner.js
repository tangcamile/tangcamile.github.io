(function () {
    var banner = document.getElementById('banner');
    if (!banner) return;

    var path = window.location.pathname || '/';
    var isHome = path === '/' || path === '/index.html' || /\/index\.html$/.test(path);
    if (!isHome) return;

    var images = [
        '/img/bg/bg_1.png',
        '/img/bg/bg_2.png',
        '/img/bg/bg_3.png',
        '/img/bg/bg_4.png',
        '/img/bg/bg_5.png',
        '/img/bg/bg_6.jpg',
        '/img/bg/homepic.jpg',
        '/img/bg/leetcode_bg.png'
    ];

    if (!images.length) return;

    var lastIndex = -1;
    function applyRandomBanner() {
        var idx = Math.floor(Math.random() * images.length);
        if (images.length > 1) {
            while (idx === lastIndex) {
                idx = Math.floor(Math.random() * images.length);
            }
        }
        lastIndex = idx;
        var url = images[idx];

        banner.style.backgroundImage = 'url(' + url + ')';
        banner.style.backgroundRepeat = 'no-repeat';
        banner.style.backgroundPosition = 'center center';
        banner.style.backgroundSize = 'cover';
    }

    applyRandomBanner();
    window.setInterval(applyRandomBanner, 20000);
})();
