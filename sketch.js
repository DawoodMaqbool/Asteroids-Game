var game;
let bg;
let ship;

let laser_sound;

function preload(){ //preload function being used to make sure that images and sound files get loaded smoothly and efficiently.
  soundFormats('mp3', 'ogg');
  ship  = loadImage('ship.png');
  // laser_sound = loadSound('audio/laser.mp3');
  // explosion = loadSound('audio/explosion-0.mp3');
  // dead = loadSound('audio/dead.mp3');
}


function setup() {
  bg = loadImage('bg.jpg');
  createCanvas(windowWidth, windowHeight);
  game = new AsteroidsGame();
 }

function draw() {
  background(bg);
  game.update();
  game.render();
}

function keyPressed() {
  game.keyPressed(key);
}

function keyReleased() {
  game.keyReleased();
}
