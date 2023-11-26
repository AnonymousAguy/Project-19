var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 500, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg)
  
}

function draw() {
  background(200);


  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 7;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 7;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      
      ghost.destroy()
    }
    spawnDoors();
    
    drawSprites()
}}


function spawnDoors() {
  if(frameCount % 25 === 0) {
    var door = createSprite(200, -50)
    door.addImage(doorImg)

    door.x = Math.round(random(100, 400))
    door.velocityY = 10
    door.lifeTime = 700
    doorsGroup.add(door)
    

    var climber = createSprite(200,10)
    climber.addImage(climberImg)

    climber.x = door.x
    climber.velocityY = 10
    climber.lifeTime = 700
    climbersGroup.add(climber)
    

    var invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 10
    invisibleBlock.lifeTime = 700
    invisibleBlockGroup.add(invisibleBlock)
    
  }
}