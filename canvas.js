window.onload = function() {
    let canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    function getPos(ev) { //获取鼠标位置封装成函数
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return { x: ev.pageX + scrollLeft - 20, y: ev.pageY + scrollTop - 70 }; //JSON形式返回
    }

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#000';
    curColor = ctx.strokeStyle;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    let isPainting = false;
    let last = null;
    //判断是否是触屏设备
    function is_touch_device() {
        return 'ontouchstart' in window;
    }

    function draw(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    if (is_touch_device()) {
        //触摸设备
        canvas.ontouchstart = (e) => {
            last = [e.touches[0].clientX - 20, e.touches[0].clientY - 70]
        }
        canvas.ontouchmove = (e) => {
            e.preventDefault();
            draw(last[0], last[1], e.touches[0].clientX - 20, e.touches[0].clientY - 70);
            last = [e.touches[0].clientX - 20, e.touches[0].clientY - 70]
        }
    } else {
        //鼠标
        canvas.onmousedown = (e) => {
            var pos = getPos(e);
            isPainting = true;
            last = [pos.x, pos.y];
        }
        canvas.onmousemove = (e) => {
            var pos = getPos(e);

            if (isPainting) {
                draw(last[0], last[1], pos.x, pos.y);
                last = [pos.x, pos.y];
            }
        }
        canvas.onmouseup = () => {
            isPainting = false
        }
    }
    //navBar
    let topNav = document.querySelector('#topNav');
    let navBar = topNav.querySelector('#nav');
    let colorBtn = navBar.querySelector('#penColor');
    let colorChoseDiv = navBar.querySelector('#penColorChose');
    let sizeBtn = navBar.querySelector('#penSize');
    let sizeChoseDiv = navBar.querySelector('#penSizeChose');
    let penEraser = navBar.querySelector('#penEraser');
    let clearBtn = navBar.querySelector('#penClear');
    document.onclick = function() {
        startMove(colorChoseDiv, {
            height: 0
        });
        startMove(sizeChoseDiv, {
            height: 0
        });
    }
    colorBtn.onclick = function(e) {
        startMove(colorChoseDiv, {
            height: 140
        });
        e.cancelBubble = true;
    }
    sizeBtn.onclick = function(e) {
        ctx.strokeStyle = curColor;
        sizeBtn.classList.add('navActive');
        penEraser.classList.remove('navActive');
        startMove(sizeChoseDiv, {
            height: 140
        });
        e.cancelBubble = true;
    }
    penEraser.onclick = function(e) {
        penEraser.classList.add('navActive');
        sizeBtn.classList.remove('navActive');
        ctx.strokeStyle = '#fff';
    }
    clearBtn.onclick = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //颜色的切换
    let redBtn = colorChoseDiv.querySelector('.colorRed');
    let blueBtn = colorChoseDiv.querySelector('.colorBlue');
    let blackBtn = colorChoseDiv.querySelector('.colorBlack');
    redBtn.onclick = function() { //切换红色
        ctx.strokeStyle = 'rgb(143, 6, 6)';
        curColor = ctx.strokeStyle;
    }
    blueBtn.onclick = function() { //切换红色
        ctx.strokeStyle = 'rgb(14, 6, 121)';
        curColor = ctx.strokeStyle;
    }
    blackBtn.onclick = function() { //切换红色
        ctx.strokeStyle = '#000';
        curColor = ctx.strokeStyle;
    }

    //尺寸的切换
    let sSizeBtn = sizeChoseDiv.querySelector('.sSize');
    let mSizeBtn = sizeChoseDiv.querySelector('.mSize');
    let lSizeBtn = sizeChoseDiv.querySelector('.lSize');
    sSizeBtn.onclick = function() {
        ctx.lineWidth = 7;
    }
    mSizeBtn.onclick = function() {
        ctx.lineWidth = 12;
    }
    lSizeBtn.onclick = function() {
        ctx.lineWidth = 17;
    }

}