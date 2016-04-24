window.onload = function() {
    var oCan = document.getElementById('mycanvas');
    var oBtn = document.getElementById('clear');
    var oBtn_cir = document.getElementById('circle');
    var oBtn_line = document.getElementById('line');
    var oBtn_rand = document.getElementById('radiation');
    var type = 'line';
    var ctx = oCan.getContext("2d");
    if (oCan.getContext) {
        //test(ctx);
    } else {

    }
    oCan.addEventListener('mousedown', function(ev) {
        ev = ev || window.event;
        ev.preventDefault();
        var x_init = ev.clientX - oCan.offsetLeft;
        var y_init = ev.clientY - oCan.offsetTop;
        if (type == 'line') {
            ctx.moveTo(x_init, y_init);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.miterLimit = '20';
            ctx.lineWidth = "1";
            ctx.strokeStyle = "#0012ff";
        } else if (type == 'circle') {
            ctx.strokeStyle = "#123cba";
            var num = 0;
        }
        oCan.onmousemove = function(ev) {
            ev = ev || window.event;
            var x = ev.clientX - oCan.offsetLeft;
            var y = ev.clientY - oCan.offsetTop;
            if (type == 'line') {
                ctx.lineTo(x, y);
            } else if (type == 'circle') {
                if (num > 20) return;
                ctx.beginPath();
                var r = Math.sqrt((x - x_init) * (x - x_init) + (y - y_init) * (y - y_init));
                ctx.arc(x_init, y_init, r / 2, 0, 2 * Math.PI);
                num++;
            } else if (type = 'radiation') {

            }
            ctx.stroke();
        }
        return false;
    }, false)
    oCan.addEventListener('mouseup', function() {
        oCan.onmousemove = null;
    }, false)
    oBtn.onclick = function() {

    };
    oBtn.onclick = function() {
        ctx.clearRect(0, 0, oCan.width, oCan.height);
        ctx.beginPath();
    };
    oBtn_cir.onclick = function() {
        type = 'circle';
    };
    oBtn_line.onclick = function() {
        type = 'line';
    };
    oBtn_rand.onclick = function() {
        type = 'radiation'
    };
};
$(function() {
        var screenW = window.screen.width;
        var screenH = window.screen.height;
        var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
        console.log(docWidth);
        console.log(docHeight);
        $('#mycanvas').attr({
            width: docWidth,
            height: docHeight
        });
    })
 // Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}