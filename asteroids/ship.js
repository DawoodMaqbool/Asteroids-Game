function Ship(x, y){

    this.particle = new Particle();

    this.particle.pos.x = x ;
    this.particle.pos.y = y ;

    this.theta = PI/2; //theta value for rotating ship.
    this.omega = 0.0;
    this.r = 20; //radius 
    this.thrustForce = 0.3; //force of thrust for ship is defined here.
    this.rotationalTorque = 0.03; // torque for ship is defined rotationally.
    this.rotationalDamp = 0.4; //dampening force of ship rotationally.
    this.velocityDamp = 0.97; //dampening force for velocity of ship.

    this.render = function(){ //function for rendering ship on screen.
        push();
        translate(this.particle.pos.x, this.particle.pos.y);
        rotate(this.theta);
        stroke(255);
        fill(230);
        rotate(PI / 2.0);
        image(ship, -25, -35, ship.width / 14, ship.height / 12);
        pop();
    }



    this.update = function() { //function for calling updating ships properties.
        this.particle.update();

        this.particle.vel.mult(this.velocityDamp);

        this.particle.edges();

        this.theta += this.omega;
        this.omega *= this.rotationalDamp;
    }

    this.turn = function(factor) { 
        this.omega += this.rotationalTorque * factor;
    }

    this.thrust = function(factor) {
        var thrustVector = p5.Vector.fromAngle(this.theta);
        thrustVector.setMag(this.thrustForce * factor);
        this.particle.applyForce(thrustVector);
    }

    this.hit = function(asteroid) {// Improve collision detection of ship on screen.
        var r = p5.Vector.sub(this.particle.pos, asteroid.particle.pos);
        return r.mag() < this.r + asteroid.r;
    }
}
