function randomInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
}

function randomDirection() {
    return (1 - 2 * randomInt(2));
}

function randomColor() {
    let r = randomInt(256);
    let g = randomInt(256);
    let b = randomInt(256);
    return `rgb(${r},${g},${b})`;
}

class Firework {
    #GRAVITY = 1;
    #MAX_SPEED_X = 8;
    #MAX_SPEED_Y = 12;
    #INTERVAL = 20;
    #speedX;
    #speedY;
    #div

    constructor(div, x, y) {
        div.style.backgroundColor = randomColor();
        div.className = "firework";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        document.body.appendChild(div);
        this.#div = div;
        this.#speedX = randomDirection() * (randomInt(this.#MAX_SPEED_X) + 1);
        this.#speedY = randomDirection() * (randomInt(this.#MAX_SPEED_Y) + 1);
    }

    play() {
        let div = this.#div;
        let _this = this;
        let timer = setInterval(function () {
            _this.#speedY += _this.#GRAVITY;
            div.style.left = `${div.offsetLeft + _this.#speedX}px`;
            div.style.top = `${div.offsetTop + _this.#speedY}px`;
            if (
                    div.offsetLeft + div.offsetWidth > window.innerWidth ||
                    div.offsetLeft < 2 ||
                    div.offsetTop + div.offsetHeight > window.innerHeight ||
                    div.offsetTop < 2) {
                div.remove();
                clearInterval(timer);
            }
        }, this.#INTERVAL);
    }
}

class Fireworks {
    constructor(x, y, fireworkCount) {
        for (let i = 0; i < fireworkCount; i++) {
            let div = document.createElement("div");
            let firework = new Firework(div, x, y);
            firework.play();
        }
    }
}

function fireworkShow(interval) {
    const doc = document.documentElement;
    setInterval(function() {
        let x = randomInt(doc.clientWidth);
        let y = randomInt(doc.clientHeight / 3);
        new Fireworks(x, y, 16);
    }, 500);
}

function bindClickToCreateFirework() {
    document.addEventListener("click", function(event) {
        new Fireworks(event.pageX, event.pageY, 16);
    });
}

bindClickToCreateFirework();
fireworkShow();