var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse =
{
    x: undefined,
    y: undefined
}

var maxR, minR;

maxR = 40;
minR = 2;

var color = [
    '#590E1C',
    '#32508C',
    '#DCE4F2',
    '#736F39',
    '#F2CE16',
]

window.addEventListener('mousemove', function(e)
{
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function()
{
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;

    init();
})

function Circle(x, y, sx, sy, r)
{
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.r = r;
    this.minR = r;
    this.color = color[Math.floor(Math.random() * color.length)];

    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI *2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function()
    {
        if(this.x + this.r > innerWidth || this.x - this.r < 0)
        {
            this.sx = -this.sx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0)
        {
            this.sy = -this.sy;
        }

        this.x += this.sx;
        this.y += this.sy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
        {
            if(this.r < maxR)
            {
                this.r += 1;
            }
            else if(this.r > minR)
            {
                this.r -=1;
            }

            this.draw();
        }
    }
}

var cArray = [];

function init()
{
    cArray = [];

    for(var i = 0; i < 500; i++)
    {
        var r, x, y, sx, sy
        r = Math.random() * 3 + 1;
        x = Math.random() * (innerWidth - r * 2) + r;
        y = Math.random() * (innerHeight - r * 2) + r;
        sx = Math.random() - 0.5;
        sy = Math.random() - 0.5;
        cArray.push(new Circle(x, y, sx, sy, r));
    }
}

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < cArray.length; i++)
    {
        cArray[i].update();
    }
}

init();
animate();