function Asteroid(x, y, r) {

    this.minRad = 30 ; //Minimum radius of asteroid
    this.maxRad = 120; //Maximum radius of asteroid
    this.r = r || floor(random(this.minRad, this.maxRad)); //Generates asteroid's radium randomly
    this.particle = new Particle(width/2, height/2);

    // Avoid asteroids from spawning at center,
    // so no initial collission happens.
    var d = dist(width/2, height/2, this.particle.pos.x, this.particle.pos.y); //position peing given as argument to distance function.
    var dMin = 1.2*(this.r + 50);
    if(x && y) {
        this.particle.pos.x = x; 
        this.particle.pos.y = y;
    } else {
        while(d < dMin) {
            this.particle.pos.x = random(width);
            this.particle.pos.y = random(height);
            d = dist(width/2, height/2, this.particle.pos.x, this.particle.pos.y);
        }
    }

    this.particle.vel = p5.Vector.random2D(); //Velocity of particles being defined as an object. 
        this.corners = floor(random(4,9)); //Number of edges of Asteroid.

        this.radii = []; //empty array being defined for radii
        for(var i = 0; i < this.corners; i++) { 
            this.radii.push(random(0.8*this.r, 1.2*this.r));
        }

        this.update = function() {
            this.particle.update();
            this.particle.edges();
        }

    this.render = function() {
        push();
        stroke('snow');
        fill(	(105,105,105));
        translate(this.particle.pos.x, this.particle.pos.y);
        beginShape();
        for(var i = 0; i < this.corners; i++) { //loop for generating multiple asteroids.
            var angle = map(i, 0, this.corners, 0, TWO_PI);
            var radius = this.radii[i];
            var x = radius * cos(angle); //using cos and sin to generate irregular shaped asteroids.
            var y = radius * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);

        pop();
    }

    this.split = function() { //split function is being used to divide asteroids into smaller chunks on colliding with laser.
        var childs = [];
        explosion.play();

        if(this.r > this.minRad*0.5){
            childs.push(new Asteroid(this.particle.pos.x,
                                     this.particle.pos.y,
                                     floor(this.r/2)));
            childs.push(new Asteroid(this.particle.pos.x,
                                     this.particle.pos.y,
                                     floor(this.r/2)));
            childs[0].particle.vel.setMag(this.particle.vel.mag()*1.5);
            childs[1].particle.vel.setMag(this.particle.vel.mag()*1.5);
        }
        return childs;
    }
}
