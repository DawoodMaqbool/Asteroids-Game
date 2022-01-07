function GameLevel(level) {

    this.level = level || 0;
    this.ship = new Ship(width / 2, height / 2);
    this.turn = 0;
    this.thrust = 0;
    this.asteroids = [];
    this.initialAsteroids = 5 + 2*this.level;
    for (var i = 0; i < this.initialAsteroids; i++) { //loop being used for calling asteroid function and defining other properties.
        this.asteroids.push(new Asteroid());
        var speed = 1.0 + random() * this.level / 5.0; //defining speed
        this.asteroids[i].particle.vel.mult(speed); //increasing difficulty by multiplying with particles velocity.
    }

    this.lasers = []; 

    this.score = 0;
    this.gameOver = false; //boolean variables being declared.
    this.levelCleared = false;

    this.update = function () { //function being called to update all the properties of asteroids, lasers and ships simultaneously.
        this.asteroids.forEach(function (asteroid) {
            asteroid.update();
        });
        this.lasers.forEach(function (laser) {
            laser.update();
        });
        this.ship.turn(this.turn);
        this.ship.thrust(this.thrust);
        this.ship.update();

        this.laserCollision();
        this.shipCollision();

        if(this.asteroids.length == 0) { //if all asteroids are destroyed then level is cleared.
            console.log("LEVEL " + this.level + " CLEARED");
            this.levelCleared = true;
        }
    }


    this.render = function (bgd) { //function for rendering ship,lasers and asteroids.

        this.asteroids.forEach(function (asteroid) {
            asteroid.render();
        });

        this.lasers.forEach(function (laser) {
            laser.render();
        });

        this.ship.render();
        this.renderHUD();
    }

    
    this.renderHUD = function () { //function for displaying all the text on screen.
        push();
        textSize(25);
        textFont('Georgia');
        fill(173,255,47);
        text("LEVEL : " + this.level, (width/2) -100, 100);
        text("POINTS : " + this.score, (width/2) -100, 150  );
        textSize(20);
        text("Use WASD to Navigate", (width/2) - 150 , height - 50);
        text("Press Spacebar to FIRE",(width/2) - 150, height - 15);
        if(this.gameOver) {
            textSize(35);
            fill(220,20,60);
            text("YOU DIED", width/2 - 125, height/2);
            text("Press the Spacebar to Restart ", width/2 - 275, height/2 + 50);
        }
        pop();
    }

    this.laserCollision = function () {
        for (var i = this.lasers.length - 1; i >= 0; i--) {
            // Laser leaving from ship.
            if (this.lasers[i].particle.pos.x < 0 ||
                this.lasers[i].particle.pos.x > width ||
                this.lasers[i].particle.pos.y < 0 ||
                this.lasers[i].particle.pos.y > height) {
                    this.lasers.splice(i, 1);
                    continue;
            }
            // Laser and Asteroids collision will be detected here.
            for (var j = this.asteroids.length - 1; j >= 0; j--) {
                if (this.lasers[i].hit(this.asteroids[j])) {
                    // if Laser hits asteroid then asteroid would split and score would be updated.
                    this.score += 100 - this.asteroids[j].r;
                    console.log("Score: " + this.score);
                    var childs = this.asteroids[j].split();
                    this.asteroids = this.asteroids.concat(childs);
                    this.asteroids.splice(j, 1);
                    this.lasers.splice(i, 1);
                    break;
                }
            }
        }
    }

    this.shipCollision = function () { // Ship and Asteroid collision would be detected here.
        for (var i = 0; i < this.asteroids.length; i++) {
            if (this.ship.hit(this.asteroids[i])) {
                // Game Over
                dead.play();
                console.log("GAME OVER");
                this.gameOver = true;
            }
        }

    }

    this.keyPressed = function(key) { //defining keys which would be used to play game.

        if (key == 'D') {
            this.turn = 1.7;
        } if (key == 'A') {
            this.turn = -1.7;
        } if (key == 'W') {
            this.thrust = 1.5;
        } if (key == 'S') {
            this.thrust = -1.5;
        } if (key == ' ') {
            this.lasers.push(new Laser(this.ship.particle.pos.x,
                                       this.ship.particle.pos.y,
                                       this.ship.theta));
           laser_sound.play();

        }
    }

    this.keyReleased = function() { //maintaining ships position after keys are released.
        this.turn = 0;
        this.thrust = 0;
    }
}
