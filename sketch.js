var gameState = "round1"


var quiz = 0

var score = 0
var keyCount = 0

var background1 , background1Img ;
var ray,rayImg,rayJump
var inVisibleGround;
var obstaclesGroup,obstical,obstical1,obstical2,obstical3,obstical4,obstical5;
var slowGroup ;
var jumpSound,dieSound,gameOverSound,clSound;
var life1 , life2,life3,life4,life5,lifeImg;
var fruit1,fruitIMG ,fruit2,fruit3;
var fruitCount = 0 ;
var lifeCount = 0 ;

var key,keyImg;
var gameOverImg;

var question1,  question2,question3,question4;
var q1Img,q2Img,q3Img,q4Img

function preload(){
  background1Img = loadImage("a6.jpg")
  rayImg = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png")
  rayJump = loadImage("jump.png")
  falseimg = loadImage("FALSE.png")
  TERUEIMG = loadImage("TRUE.png")
  keyImg = loadImage("a4.png")
  gameOverImg = loadImage("game over.jpg")
  fruitIMG = loadImage("fruit.png")

  //ROUND1 OBSTACLE
  obstacle1 = loadImage("a 1.gif");
  obstacle2 = loadImage("a2.gif");
  obstacle3 = loadImage("a3.png");

  //ROUND2 OBSTACLE
   q1Img = loadImage("q1.png");
lifeImg = loadImage("heart.png")

  
 
  jumpSound = loadSound("jump.wav")
  dieSound = loadSound("die.wav")
  gameOverSound = loadSound("game over sound.wav")
  clSound =   loadSound("COMPLETE LEVLE.wav")
  
}

function setup() {
  createCanvas(1400,900);
  background1 = createSprite(0, 0, 1400, 700);
  background1.addImage(background1Img);
  background1.velocityX = -7
  background1.scale = 3;

  background2 = createSprite(0, 0, 1400, 700);
  background2.addImage(background1Img);
  background2.velocityX = -7
  background2.scale = 3;

  ray = createSprite(100,530,10,10);
  ray.addAnimation("running",rayImg);
  ray.scale = 1.5
  inVisibleGround = createSprite(700,770,1200,20);
  inVisibleGround.visible = false ;



  key = createSprite(700,100,20,10)
  key.addImage(keyImg);
  key.scale = .2

  obstaclesGroup = createGroup();
  slowGroup = createGroup();
  fruitGroup = new Group()

  life1 = createSprite(700,200,20,10)
  life1.addImage(lifeImg);
  life1.scale = .2

  life2 = createSprite(730,200,20,10)
  life2.addImage(lifeImg);
  life2.scale = .2

  life3 = createSprite(760,200,20,10)
  life3.addImage(lifeImg);
  life3.scale = .2

  life4 = createSprite(790,200,20,10)
  life4.addImage(lifeImg);
  life4.scale = .2

  life5 = createSprite(820,200,20,10)
  life5.addImage(lifeImg);
  life5.scale = .2

  fruit1 = createSprite(900,100,20,10);
  fruit1.addImage(fruitIMG);
  fruit1.visible = false ;
  fruit1.scale = .2

  fruit2 = createSprite(950,100,20,10);
  fruit2.addImage(fruitIMG);
  fruit2.visible = false ;
  fruit2.scale = .2

fruit3 =createSprite(1000,100,20,10)
fruit3.addImage(fruitIMG);
  fruit3.visible = false;
  fruit3.scale = .2

}

function draw() {
  background("black");  


if(gameState === "round1"){

  

  if(background1.x<0){
    background1.x = background1.x + 700 ;
  }
 
  
  
  score = score + 1
  

  if (keyDown("space") && ray.collide(inVisibleGround)
  )
  {
    ray.velocityY = -30;
    ray.addImage(rayJump);
    jumpSound.play();
  }
  ray.velocityY = ray.velocityY + .9;

  spawnFruit();
  spawnObstacles();
  
 

  ray.collide(inVisibleGround);

  
    

  


  
  
  if(obstaclesGroup.isTouching(ray)){
   
    obstaclesGroup.destroyEach();
    lifeCount ++

    switch(lifeCount) {
      case 1: life1.destroy();
              break;
      case 2: life2.destroy();
              break;
      case 3: life3.destroy();
              break;
       case 4: life4.destroy();
              break;
      case 5: life5.destroy();
              break;

      default: break;
      
    }
}

if(fruitGroup.isTouching(ray)){
  fruitGroup.destroyEach();
  fruitCount ++ ;
console.log(fruitCount)
  switch(fruitCount) {
    case 1: fruit1.visible = true;
            break;
    case 2: fruit2.visible = true;
            break;
    case 3: fruit3.visible = true;
            break;
    default: break;
    
  }
}

  if(lifeCount >5){
    ray.destroy();
    gameState = "end"
    dieSound.play();
  }

  if(fruitCount > 3){
    gameState = "quizTime"
  }
    if(gameState === "quizTime"){
      background(gameOverImg)
      question();
    }
}


if(gameState ==="round2"){
  if(background2.x<0){
   // background2.x = background2.x + 700 ;
    spawnObstacles();

  }
}
if(gameState === "end"){
  
  background(gameOverImg)
 ;

}




  drawSprites();
  
   fill("white")
  text("score"+score,300,60);
  textSize = 20;
  text("score"+score,300,60);

  

  
  text("="+keyCount
,750,100);

}
if(gameState === "end"){
  gameOverSound.play()
}

function spawnObstacles(){
if (frameCount % 200 === 0){
  var obstacle = createSprite(1500,700,10,30);
 

  obstacle.velocityX = - (4 + 3* score/100)
  
   //generate random obstacles

   var rand = Math.round(random(1,3));
   if(gameState === "round1"){
   switch(rand) {
     case 1: obstacle.addImage(obstacle1);
             break;
     case 2: obstacle.addImage(obstacle2);
             break;
     case 3: obstacle.addImage(obstacle3);
             break;
     default: break;
     
   }
  } 
  else if(gameState === "round2"){

    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
      
    }

  }

  else if(gameState === "round3"){

    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
      
    }

  }
  



obstacle. collide(inVisibleGround);
    obstaclesGroup.add(obstacle);
    
  
  }
 
}


function spawnFruit(){

  if(frameCount % 50 === 0){
    var fruit = createSprite(1500,300,100,100);
    fruit.scale = .1
    fruit.addImage(fruitIMG);
    fruit.y = Math.round(random(50,350));
    fruit.velocityX = -6 ;
    fruitGroup.add(fruit);
    }
   
    


}


function question(){

  if(gameState === "quizTime"){

    var rand = Math.round(random(1,3));

    switch(rand){
  case 1:question1 = createSprite(300,100,10,20);
  fill("white");
text("chose f key for false & chose t key for true",300,300)
 question1.addImage(q1Img);
  question1.scale = 0.3 ;
  //question1.lifetime = 10
  if (keyDown("t")){
    gameState ="end";
question1.destroy();
}
  if (keyDown("f")){
    gameState ="round2";
    question1.destroy();
}
break;

  
case 2:question2 = createSprite(300,90,10,20);
    //question2.addImage()
    question2.scale = 0.3 ;
  question2.lifetime = 10;
  break;


    case 3: question3 = createSprite(300,90,10,20);
    //question3.addImage()
    question3.scale = 0.3 ;
  question3.lifetime = 10
  default: break;

}
  }


    
      question4 = createSprite(300,90,10,20);
       //question4.addImage()
       question4.scale = 0.3 ;
     question4.lifetime = 10;
   

  }   





