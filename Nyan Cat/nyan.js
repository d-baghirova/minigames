let ul = document.querySelector('ul');
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.font="12px Comic Sans MS";
ctx.strokeStyle="black";

let x = 30;
let y = 0;
let nya = new Audio('./mp3/nyancattheme.mp3');

let nyan = {
  x_paddind: 0,
  tick_count: 0,
  x_pos: 30,
  y_pos: 80,
}

let obs = [];
obs[0] = {
  x : canvas.width-20,
  y : 80
}

let bg  = new Image();
let asteroid = new Image();
let cat = new Image();

bg.src = './images/bg.gif';
asteroid.src = './images/as.png';
cat.src = './images/nyansprite1.png';
 
const moveUp = () => {
    y -= 5;
}

let op = false;

window.addEventListener('keydown', moveUp);
window.addEventListener('mousedown', () => {op = true;})

function colizia() {
  for (let i = 0; i < obs.length; i ++){
    if ((x <= obs[i].x + 20 && x + 60 >= obs[i].x) && (y <= obs[i].y + 20 && y + 30 >= obs[i].y) || y>=canvas.height ||
    y<=-20){
      return 'colizia';
    }
  }
}

function start(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nya.play();
  nyan.x_paddind = (nyan.x_paddind === 120 ? 0 : nyan.x_paddind + 60);

  y += 10;
  
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < obs.length; i ++){
    ctx.drawImage(asteroid, obs[i].x, obs[i].y, 20, 20);
    obs[i].x -= 20;

    if (obs[i].x + 20 <= 0){
        obs.push({
            x : canvas.width-20,
            y : Math.floor(Math.random()*(canvas.height-23))
      })
    }

    colizia();

    if (colizia()==='colizia'){
      location.reload();
      op = false;
      colizia() = 0;
    }

    if (obs.length > 1){
        obs.shift();
    }
  }

  ctx.drawImage(cat, nyan.x_paddind, 0, 60, 30, x, y, 60, 30);
}

function oppa() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  nyan.x_paddind = (nyan.x_paddind === 120 ? 0 : nyan.x_paddind + 60);
  ctx.drawImage(cat, nyan.x_paddind, 0, 60, 30, canvas.width/2-30, canvas.height/2-30, 60, 30);
  ctx.fillStyle='white';
  let but = ctx.fillRect(canvas.width/2-30, canvas.height/2, 60, 15);
  ctx.fillStyle = 'black';
  ctx.fillText('Play', canvas.width/2-10, canvas.height/2+11);
}

function draw() {
  if (op){
    start();
  } else {
    oppa();
  }
}

function tick() {
  if (nyan.tick_count > 20){
    draw();
    nyan.tick_count = 0;
  }
  nyan.tick_count += 1;
  let anime = requestAnimationFrame(tick);
}

function running() {
  if (colizia()=='colizia'){
  }

  cat.onload = function() {
    tick();
    requestAnimationFrame(tick);
  }
}

running();