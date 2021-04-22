class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.target = createVector(x, y);

        this.vel = new createVector(0, 0);
        this.acc = new createVector(0, 0);

        this.zero = new createVector(0, 0);

        this.maxSpeed = 10;
        this.maxForce = 1;
    }

    show(d) {
        if (this.vel.mag() <= 5) {
            noStroke();
            fill(148, 15, 188);
        } else { // the mover is moving...
            noFill();
            stroke(219, 7, 124, 100);
            line(mouseX, mouseY, this.pos.x, this.pos.y);
        }
        ellipse(this.pos.x, this.pos.y, d, d);
    }

    move() {
        this.run();
        if (dist(this.pos.x, this.pos.y, this.target.x, this.target.y) > 0.1 || this.acc.mag() > 0.1) {
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.acc.mult(0);
        }
    }

    applyForce(f) {
        this.acc.add(f);
    }

    run() {
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);
        
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        let speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(target, this.pos);
        if (desired.mag() < 60) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return this.zero;
        }
    }
}
