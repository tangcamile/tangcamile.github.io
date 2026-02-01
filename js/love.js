!function (e, t, a) {
    // 1. 初始化：创建爱心样式 + 绑定点击事件 + 启动动画循环
    function n() {
        // 注入爱心的CSS样式
        c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        // 绑定页面点击事件
        o();
        // 启动爱心的动画帧循环
        r();
    }

    // 2. 动画循环：更新爱心的位置、透明度、缩放，清理失效爱心
    function r() {
        for (var e = 0; e < d.length; e++) {
            // 若爱心透明度<=0，从页面和数组中移除
            if (d[e].alpha <= 0) {
                t.body.removeChild(d[e].el);
                d.splice(e, 1);
            } else {
                // 否则更新爱心的属性（向上移动、轻微放大、透明度降低）
                d[e].y--;
                d[e].scale += .004;
                d[e].alpha -= .013;
                // 应用更新后的样式到DOM元素
                d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999";
            }
        }
        // 递归请求下一帧动画，保持循环
        requestAnimationFrame(r);
    }

    // 3. 绑定页面点击事件：保留原点击事件（若有），并触发爱心创建
    function o() {
        // 保存原始的onclick事件（防止覆盖页面原有点击逻辑）
        var t = "function" == typeof e.onclick && e.onclick;
        // 重写onclick事件
        e.onclick = function (e) {
            // 先执行原始的点击事件
            t && t();
            // 再执行创建爱心的逻辑
            i(e);
        }
    }

    // 4. 创建单个爱心：根据点击位置生成爱心DOM，并存入数组
    function i(e) {
        // 创建爱心DOM元素
        var a = t.createElement("div");
        a.className = "heart";
        // 存储爱心的相关属性（用于动画更新）
        d.push({
            el: a,          // 对应的DOM元素
            x: e.clientX - 5, // 点击位置X（偏移5px居中）
            y: e.clientY - 5, // 点击位置Y（偏移5px居中）
            scale: 1,       // 初始缩放比例
            alpha: 1,       // 初始透明度
            color: s()      // 随机生成颜色
        });
        // 将爱心添加到页面中
        t.body.appendChild(a);
    }

    // 5. 注入CSS样式到页面头部
    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            // 标准浏览器注入样式文本
            a.appendChild(t.createTextNode(e));
        } catch (t) {
            // 兼容旧版IE浏览器
            a.styleSheet.cssText = e;
        }
        // 将样式标签添加到head中
        t.getElementsByTagName("head")[0].appendChild(a);
    }

    // 6. 生成随机RGB颜色
    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
    }

    // 存储所有活跃爱心的数组（用于动画批量更新）
    var d = [];

    // 兼容各浏览器的requestAnimationFrame（动画帧请求）
    e.requestAnimationFrame = function () {
        return e.requestAnimationFrame ||
            e.webkitRequestAnimationFrame ||
            e.mozRequestAnimationFrame ||
            e.oRequestAnimationFrame ||
            e.msRequestAnimationFrame ||
            // 降级方案：使用setTimeout模拟动画帧
            function (e) {
                setTimeout(e, 1e3 / 60);
            }
    }();

    // 执行初始化函数，启动整个功能
    n()
}(window, document);