window.onload = function() {
    let canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.lineWidth = 10;
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
            last = [e.touches[0].clientX, e.touches[0].clientY]
        }
        canvas.ontouchmove = (e) => {
            draw(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY);
            last = [e.touches[0].clientX, e.touches[0].clientY]
        }
    } else {
        //鼠标
        canvas.onmousedown = (e) => {
            isPainting = true;
            last = [e.clientX, e.clientY]
        }
        canvas.onmousemove = (e) => {
            if (isPainting) {
                draw(last[0], last[1], e.clientX, e.clientY);
                last = [e.clientX, e.clientY]
            }
        }
        canvas.onmouseup = () => {
            isPainting = false
        }
    }


}