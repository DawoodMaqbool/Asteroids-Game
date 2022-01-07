function Laser(x, y, angle) {

    this.particle = new Particle(); //calling particle function.
    this.particle.pos.x = x; // giving x and y coordinates.
    this.particle.pos.y = y;
    this.particle.vel = p5.Vector.fromAngle(angle);
    this.particle.vel.setMag(15);

    this.update = function() {
        this.particle.update();
    }

    this.render = function() {
        push();
        stroke('gold');
        strokeWeight(7);
        this.particle.render();
        pop();
    }

    this.hit = function(asteroid) {
        // TODO:
        // Improve collision detection of laser.
        var r = p5.Vector.sub(this.particle.pos, asteroid.particle.pos);
        return r.mag() < asteroid.r;
    }
}
