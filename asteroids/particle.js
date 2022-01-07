function Particle(x, y) {

    this.pos = createVector();
    this.pos.x = x ;
    this.pos.y = y ;
    this.vel = createVector();
    this.acc = createVector();

    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0.0);
    }

    this.applyForce = function(f) { //function for acceleration of ship.
        this.acc.add(f);
    }

    this.render = function(){
        point(this.pos.x, this.pos.y);
    }

    this.edges = function(){ //function for particles to reappear from edges after travelling away to the end of screen. 
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;
    }
}