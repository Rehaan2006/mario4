
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var ground;
var mario;
var obs;
var obsGroup;

var play=1;
var end=0;
var gamestate="play";
var score=0;
var reset;

var mariom1,mariom2,mariom3,mariom4;
var obs1,obs2,obs3,obs4;
var bgimg;
var mariocollid;
var bg;
var restartimg;
var gameover,gameoverimg;

function preload()
{
	mariom1=loadAnimation("images/mario00.png","images/mario01.png","images/mario00.png","images/mario03.png","images/mario00.png");
    mariom2=loadAnimation("images/collided.png");
	obs1=loadAnimation("images/obstacle1.png","images/obstacle2.png","images/obstacle3.png","images/obstacle4.png","images/obstacle1.png");
	bgimg=loadImage("images/bg.png");
    restartimg=loadImage("images/restart.png");
	gameoverimg=loadImage("images/gameOver.png");
}


function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;
	bg=createSprite(200,340,1000,700);
	bg.scale=1.9
	bg.addImage(bgimg);
	bg.velocityX=-2;
    obsGroup=new Group();
	ground=createSprite(200,600,1200,20);
	ground.velocityX=2;
	ground.shapeColor="yellow"
	//Create the Bodies Here.
    mario=createSprite(200,570,50,50);
	mario.scale=2;
	mario.addAnimation("mario_running",mariom1);
	mario.addAnimation("mario_collided",mariom2);
   // mario.shapeColor="red"
	invisibleground=createSprite(200,600,1200,10);
	invisibleground.shapeColor="white";
	invisibleground.visible=false;
	restart=createSprite(420,400,50,30);
    restart.addImage(restartimg);
	restart.shapeColor="red";
	gameover=createSprite(420,350,50,30);
    gameover.addImage(gameoverimg);
	gameover.shapeColor="red";
  
}
 

function draw() {
 // rectMode(CENTER);

    score=Math.round(frameCount/60);
	text("SCORE- "+score,200,100 );
	fill("red");

 if(gamestate==="play"){
	
	if(bg.x<300){
		bg.x=500;
	}
	Engine.update(engine);

	
	
	if(ground.x>600){
		ground.x=400;
	}
  
	if (keyDown ("W") && mario.y>=500){
  
		console.log(mario.y)
		mario.velocityY=-10 ;
	}
	
	mario.velocityY=mario.velocityY+0.5;
	SpwanObstacle();
     restart.visible=false;
	 gameover.visible=false;
	if(obsGroup.isTouching(mario)){
		gamestate="end";
        mario.changeAnimation("mario_collided",mariom2);
	}

}

	if(gamestate==="end"){
		mario.velocityY=0;
		ground.velocityX=0;
		obsGroup.setVelocityXEach(0);
		
        restart.visible=true;
		gameover.visible=true;
		bg.velocityX=0;
	//	mario.changeAnimation("mario_collided",mariom2);
      if(mousePressedOver(restart)){
		   reset();
	   }
	   
	}   
	
 

  mario.collide(invisibleground);
  
  drawSprites();
}

function SpwanObstacle(){
	if(frameCount%150===0){
	obs=createSprite(800,580,30,30);
	obs.addAnimation("obs_moving",obs1);

	obs.shapeColor="brown"
	obs.velocityX=-3;
	obs.lifetime=400;

	obsGroup.add(obs);

	}
}

function reset(){ 
	
		gamestate="play";
	    bg.velocityX=-2;
		mario.changeAnimation("mario_running",mariom1);
		obsGroup.destroyEach();
		score=0;
	
	
}