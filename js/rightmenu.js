// RightMenu 右键菜单
let rmf = {};

// 显示右键菜单
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let rightMenu = document.getElementById('rightMenu');
    if (!rightMenu) return;

    rightMenu.style.top = x + 'px';
    rightMenu.style.left = y + 'px';
    rightMenu.style.display = isTrue ? 'block' : 'none';
};

// 昼夜切换（适配 Fluid 主题）
rmf.switchDarkMode = function () {
    // 直接模拟点击 Fluid 主题的切换按钮
    var colorToggleBtn = document.querySelector('#color-toggle-btn');
    if (colorToggleBtn) {
        colorToggleBtn.click();
    }
};

// 复制选中文字
rmf.copySelect = function () {
    const selected = document.getSelection();
    if (selected.toString().length > 0) {
        document.execCommand('copy');
        // 可选：显示提示
        if (typeof btf !== 'undefined' && btf.snackbarShow) {
            btf.snackbarShow('已复制到剪贴板');
        }
    }
};

// 回到顶部
rmf.scrollToTop = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 右键菜单事件处理
(function () {
    // 移动设备检测
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return;
    }

    window.addEventListener('contextmenu', function (event) {
        event.preventDefault();

        let rightMenu = document.getElementById('rightMenu');
        if (!rightMenu) return;

        // 隐藏文本复制菜单
        let menuText = document.getElementById('menu-text');
        if (menuText) {
            menuText.classList.add('hide');
        }

        // 如果有文字选中，显示复制菜单
        if (document.getSelection().toString()) {
            if (menuText) {
                menuText.classList.remove('hide');
            }
        }

        let pageX = event.clientX;
        let pageY = event.clientY;
        let rmWidth = rightMenu.offsetWidth || 160;
        let rmHeight = rightMenu.offsetHeight || 200;

        // 右边界检测
        if (pageX + rmWidth > window.innerWidth) {
            pageX = window.innerWidth - rmWidth - 10;
        }

        // 下边界检测
        if (pageY + rmHeight > window.innerHeight) {
            pageY = window.innerHeight - rmHeight - 10;
        }

        rmf.showRightMenu(true, pageY, pageX);
        return false;
    });

    // 点击页面其他地方隐藏菜单
    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });

    // ESC 键隐藏菜单
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            rmf.showRightMenu(false);
        }
    });
})();
