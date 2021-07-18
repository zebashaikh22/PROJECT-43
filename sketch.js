var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var monkey_collideImage;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground,groundI, invisibleGround;
var score=0;
var gameOver;


function preload(){
  mImg = loadImage("Monkey_01.png");
  bgImg = loadImage("jungle.jpg");
  bImg = loadImage("banana.png");
  oImg = loadImage("stone.png");
  goImg = loadImage("gameOver.png");
}


function setup(){
  createCanvas(800, 400);

  ground = createSprite(300, 365, 1200, 20);
  ground.velocityX = -3;
  ground.addImage(bgImg);

  monkey = createSprite(100, 335, 40, 40);
  monkey.scale = 0.1;
  monkey.addImage(mImg);

  invisibleGround = createSprite(300, 365, 700, 20);
  invisibleGround.visible = false;

  gameOver = createSprite(400, 200);
  gameOver.addImage(goImg);
  gameOver.visible = false;

  FoodGroup = new Group();
  obsGroup = new Group();
}


function draw(){
  background(bgImg);
  drawSprites();

  if(gameState = PLAY){
  if (keyDown("space") ) {
    monkey.velocityY = -8;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

  monkey.collide(invisibleGround);

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  spawnFood();
  spawnObs();

  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    monkey.scale +=0.01;
    score = score + 2;
  }

  fill("black");
  textSize(20);
  text("SCORE: " + score, 50, 120);

  if (obsGroup.isTouching(monkey)) {
    gameState = END;
  }
}

  if(gameState === END){
    gameOver.visible = true;

    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.scale = 0.1;

    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);

    obsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);

    text("PRESS r TO RESTART", 400, 300); 

    if(keyDown("r")){
      reset();
      gameState = PLAY;
    }
  }
}


function spawnFood(){
  if (frameCount % 140 === 0) {
    var banana = createSprite(600, 320, 20, 20);
    banana.y = Math.round(random(40, 200));
    banana.velocityX = -3;
    banana.scale = 0.1;
    banana.addImage(bImg);
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

function spawnObs() {
  if (frameCount % 160 === 0) {
    var obstacle = createSprite(600, 340, 20, 25);
    obstacle.velocityX = -5;
    obstacle.scale = 0.3;
    obstacle.addImage(oImg);
    obstacle.lifetime = 300;
    obsGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 310, 410);
  }
}


function reset(){
    gameState = PLAY;
    ground.velocityX = -3;
    obsGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
    gameOver.visible = false;
}









