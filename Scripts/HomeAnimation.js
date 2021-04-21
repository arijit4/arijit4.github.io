function preload() {
    this.img = loadImage("Arijit.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight - 150);

    let resizeRatio = 0.8;
    let imgaeRatio = this.img.height / this.img.width;
    this.img.resize(width * resizeRatio, width * resizeRatio * imgaeRatio);

    // for aligning to the center!!
    this.bufferX = (width - this.img.width) / 2;
    this.bufferY = (height - this.img.height) / 2;

    //    this.r = width * 0.15;
    this.r = 6;
    this.movers = [];
    this.img.loadPixels();
    this.grid = this.convert(this.img.pixels, this.img.height, this.img.width);
    this.img.updatePixels();

    for (let i = 0; i < this.img.height - this.r; i += this.r) {
        for (let j = 0; j < this.img.width - this.r; j += this.r) {
            let tmp = getAverage(this.grid, i, j, i + r - 1, j + r - 1);
            if (brightness(tmp) <= 60) {
                this.movers.push(new Mover(this.bufferX + j, this.bufferY + i));
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    //    let resizeRatio = 0.8;
    //    let imgaeRatio = this.img.height / this.img.width;
    //    this.img.resize(width * resizeRatio, width * resizeRatio * imgaeRatio);
    //
    //    this.r = width * 0.15;
    //
    //    this.grid = [];
    //    this.img.loadPixels();
    //    this.grid = this.convert(this.img.pixels, this.img.height, this.img.width);
    //    this.img.updatePixels();
}

function draw() {
    background(0);

    for (let i = 0; i < this.movers.length; i++) {
        this.movers[i].run();
        this.movers[i].move();
        this.movers[i].show(this.r);
    }
}

function convert(arr, row, col) {
    let res = [];
    let r, g, b, a;

    let k = 0;
    for (let i = 0; i < row; i++) {
        let tmp = [];
        for (let j = 0; j < col; j++) {
            r = arr[k++];
            g = arr[k++];
            b = arr[k++];
            a = arr[k++];
            tmp.push(color(r, g, b, a));
        }
        res.push(tmp);
    }
    return res;
}

function getAverage(arr, r1, c1, r2, c2) {
    let r = 0,
        g = 0,
        b = 0;

    let c = 0;
    for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
            c++;
            r += red(arr[i][j]);
            g += green(arr[i][j]);
            b += blue(arr[i][j]);
        }
    }

    r /= c;
    g /= c;
    b /= c;
    return color(r, g, b);
}
