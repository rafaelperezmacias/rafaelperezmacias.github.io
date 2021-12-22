const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {

    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        
        context.fillText( this.text, this.x * this.fontSize, this.y * this.fontSize );
        if ( this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 16;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for ( let i = 0; i < this.columns; i++ ) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    } 
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if ( timer > nextFrame ) {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.textAlign = 'center';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#0aff0a';
        context.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(context));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
}); 
