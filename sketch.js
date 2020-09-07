var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground;

function preload(){
  
     monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(400,300);
      monkey = createSprite (75,206,30,30);
      monkey.addAnimation ("swinging",monkey_running);
      monkey.scale=0.1;
  
      ground = createSprite (100,240,790,10);
      ground.x = ground.width/2;
  
      FoodGroup = new Group();
      obstaclesGroup = new Group();
  
      survivalTime = 0;
}

function draw() {
  background(0,240,280);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameRate())
  text("Survival Time: " + survivalTime , 100,50)
  
  
    if (gameState === PLAY) {
      ground.velocityX=-4;

    if (ground.x < 0) {
    ground.x = ground.width/2;
    }
      
    if(keyDown("space") && monkey.y>=160) {
      monkey.velocityY=-11;
    }
      
      if(FoodGroup.isTouching(monkey)) {
       FoodGroup.destroyEach(); 
    }
      
      if(obstaclesGroup.isTouching(monkey)) {
        obstaclesGroup.destroyEach();
        gameState = END;
      }
 }  
  
  
  if(gameState === END ) {
    monkey.velocityX=0;
    monkey.visible=false;
    ground.visible=false;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    FoodGroup.visible=false;
    obstaclesGroup.visible=false;
    
    text("Gameover",150,150);
  }
    spawnFood();
  
    spawnObstacles();  
  
    monkey.velocityY = monkey.velocityY + 0.6;
    monkey.collide(ground); 
  
drawSprites();
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
   obstacle = createSprite (400,216,20,20);
    obstacle.velocityX=-7;
    
    var rand = Math.round(random);
    {
    obstacle.addImage(obstacleImage);
    }
    obstacle.scale=0.1;
    obstacle.lifetime=300;
    
     obstaclesGroup.add(obstacle);
  }
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    
    food = createSprite (400,150,20,20);
    food.velocityX=-7;
    
    var rand = Math.round(random);
    {
    food.addImage(bananaImage);
    }
    
    food.scale=0.1;
    food.lifetime=300;
    food.y=Math.round(random(120,200));
    FoodGroup.add(food);
  }
}

