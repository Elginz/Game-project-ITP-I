/*
The Game Project Game interaction
*/

// Game character specifications and floor position
var gameChar_x;
var gameCharTX; 
var gameChar_y;
var gameChar_width;
var floorPos_y;

//Actions for Game character
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var cameraPosX; 

//Interactables and background 
var collectable;
var collectables;
var canyon;
var canyons;
var mountain;
var trees_x;
var clouds;
var platforms;
var enemies;
var wall;

var game_score;
var flagpole;
var lives;
var instruct;

var jump_sound;
var collect_sound;
var grass_sound;
var fall_sound;
var failed_sound;
var cleared_sound;
var ohno_sound;
var hooray_sound;
var damage_sound;

//function for sound
function preload()
{
// sound taken from https://pixabay.com/ //
    soundFormats("mp3");
    jump_sound = loadSound("assets/jump.mp3");
    collect_sound = loadSound("assets/coin.mp3");
    grass_sound = loadSound("assets/grass.mp3");
    fall_sound = loadSound("assets/falling.mp3");
    failed_sound = loadSound("assets/wahwah.mp3");
    ohno_sound = loadSound("assets/ohno.mp3");
    cleared_sound = loadSound("assets/cleared.mp3");
    hooray_sound = loadSound("assets/hooray.mp3");
    damage_sound = loadSound("assets/damage.mp3");
    
}

//Set up game
function setup()
{
	createCanvas(1024, 576);
    //initialising floor height
	floorPos_y = height * 3/4;
    //initialising lives
    lives = 3;
    startGame();
}

// function to start game. Initialising game character and includes location of flagpole 
function startGame()
{
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    gameChar_width = 7;
    
    game_score = 0;
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    flagpole= {isReached: false, x_pos: 7000};
    instruct = true;
    instructions();

/////ARRAY OF POSITIONS///
    
    
    //array consisiting objects of collectables
collectables = [{x_pos: 30, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 400, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 820, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 1170, y_pos: floorPos_y-60, isFound: false, counter:0},
                {x_pos: 1600, y_pos: floorPos_y-85, isFound: false, counter:0},
                {x_pos: 1850, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 2150, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 2750, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 3000, y_pos: floorPos_y-85, isFound: false, counter:0},
                {x_pos: 3500, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 3950, y_pos: floorPos_y-130, isFound: false, counter:0},
                {x_pos: 4400, y_pos: floorPos_y, isFound: false, counter:0},
                {x_pos: 5000, y_pos: floorPos_y -70, isFound: false, counter:0},
                {x_pos: 5870, y_pos: floorPos_y -130, isFound: false, counter:0},
                {x_pos: 6450, y_pos: floorPos_y -70, isFound: false, counter:0},
                
               ];
        
    // array consisting objects of canyons of random size and random x positions
canyons =[{x_pos:random(50,70), width: random(70,80),y_pos:floorPos_y},
          {x_pos:random(600,650), width: random(100,130),y_pos:floorPos_y},
          {x_pos:random(1050,1150), width: random(100,120),y_pos:floorPos_y},
          {x_pos:random(1550,1520), width: random(180,200),y_pos:floorPos_y},
          {x_pos: random(1900,1950), width: random(100,150), y_pos:floorPos_y},
          {x_pos: random(2200,2250), width: random(140,160), y_pos:floorPos_y},
          {x_pos: random(2500,2600), width: random(130,140), y_pos:floorPos_y},
          {x_pos: random(2850,2900), width: random(200,275), y_pos:floorPos_y},
          {x_pos: random(3300,3350), width: random(100,110), y_pos:floorPos_y},
          {x_pos: random(3560,3570), width: random(545,550), y_pos:floorPos_y},
          {x_pos: random(4200,4250), width: random(100,125), y_pos:floorPos_y},
          {x_pos: random(4450,4500), width: random(150,175), y_pos:floorPos_y},
          {x_pos: random(4930,4950), width: random(130,170), y_pos:floorPos_y},
          {x_pos: random(5250,5300), width: random(130,130), y_pos:floorPos_y},
          {x_pos: random(5550,5555), width: random(490,520), y_pos:floorPos_y},
          {x_pos: random(6300,6350), width: random(200,220), y_pos:floorPos_y}
             ];

//Array of mountain locations    
    mountain= [230,350,400,390,900,300,400,500,600,700,800,900,1000];

    //Array consisting of various tree position positions which will be repeated later
    trees_x = [800,(canyons[0].x_pos+ canyons[0].x_pos +50),377,477]
    
    //Array consisting of clouds random positions 
    clouds =[random(250,500),random(10,700),random(50,150),random(50,80),random(377,477),random(277,377), random(477,577),random(577,677),random(677,777)];
        
    //Array of enemies 
    enemies = [];
    enemies.push(new Enemy(870,floorPos_y-10, 90));
    enemies.push(new Enemy(1300,floorPos_y-10, 100));
    enemies.push(new Enemy(1750,floorPos_y-10, 60));
    enemies.push(new Enemy(2450,floorPos_y-10, 30));
    enemies.push(new Enemy(3200,floorPos_y-10, 80));
    enemies.push(new Enemy(3690,floorPos_y-80, 80));
    enemies.push(new Enemy(4700,floorPos_y-10, 100));
    enemies.push(new Enemy(5180,floorPos_y-10, 60));
    enemies.push(new Enemy(6100,floorPos_y-10, 150));

    
    //Array of platforms
    platforms =[];
    platforms.push(createPlatforms(600,floorPos_y -70,200));
    platforms.push(createPlatforms(1500,floorPos_y -70,200));
    platforms.push(createPlatforms(2900,floorPos_y -70,200));
    platforms.push(createPlatforms(3600,floorPos_y -70,210));
    platforms.push(createPlatforms(3890,floorPos_y -120,100));
    platforms.push(createPlatforms(5570,floorPos_y -70,150));
    platforms.push(createPlatforms(5800,floorPos_y -125,120));
    platforms.push(createPlatforms(6400,floorPos_y -60,140));
    
    wall = {x_pos:-150,y_pos:floorPos_y - 300, width:100, height: 300}
    
    ///side scrolling///
    cameraPosX = 0;
    gameCharTX = gameChar_x;
    
}


function draw()
{
	///////////DRAWING CODE//////////
    
    cameraPosX = gameCharTX -width/2;
    
////SKY////
	background(247,229, 163); 
    fill(255, 163,0);
    rect(0,0,width, height* 0.15);
    fill(255,193,50);
    rect(0,height* 0.15, width, height * 0.10);
    fill(254, 202,90);
    rect(0,height* 0.25, width, height * 0.10);
    
////GROUND////
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
    fill(155,118,83);
	rect(0, floorPos_y * 1.09, width, height - floorPos_y); 
    
//To call draw functions for various objects
    push();
    translate(-cameraPosX,0);
    drawClouds();
    drawMountains();
    drawTrees();
    
//Draw wall
    fill(175, 128,79);
    rect(wall.x_pos, wall.y_pos, wall.width, wall.height);
        
    
    
//Drawing Platforms by calling it's loop  
for (var i =0; i< platforms.length; i++)
    {
        platforms[i].draw();
    }
    
//Draw Collectables by calling it's loop
for (var i =0; i< collectables.length;i++)
    {
    //Ensuring that the collectable is not found before collecting on draw function
    if(!collectables[i].isFound)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }

//Drawing Canyons by calling it's loop  
for(var i =0; i <canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

//Drawing enemies by calling it's loop and check if enemies is in contact with game character.
for(var i =0; i <enemies.length; i++)
{
    enemies[i].draw();
    var isContact = enemies[i].checkContact(gameCharTX,gameChar_y)
    
//Character loses life if is in contact with enemy. Sound is played depending on how many number of lives
    if(isContact)
        {
            if(lives >0)
            {
                    startGame();
                    lives = lives -1;
                    instruct = false;
                    damage_sound.play();
                    if(lives == 1)
                        {
                            ohno_sound.play();
                        }
                    else if (lives == 0)
                        {
                            instruct = true;
                            failed_sound.play();
                        }
                    break;
                }
        }
}
    

//call flagpole function
renderFlagPole();
    
//call function to check if player is dead
checkPlayerDie();
pop();

//call function to draw lives
drawLives();
    
//check if game is over
if (checkIsGameOver())
    {
        drawGameOver();
        return;
    }
    
//call instructions for the game
if (instructions())
    {
        return;
    }
    
//////ON SCREEN DISPLAYS//////
    
fill(0);
noStroke();
textSize(30);
//number of collectables collected
text("Score: " + game_score,30,40);
//How close to flagpole
text("Goal: " + (7000-gameCharTX),width/2,40 );
        
    
////GAME CHARACTER DRAWINGS ////////
    
//Jumping left
	if(isLeft && isFalling)
	{
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
//arms
    rect(gameChar_x- 16, gameChar_y-50, 34,8);
    rect(gameChar_x -20, gameChar_y - 62, 6, 20);
    rect(gameChar_x + 14, gameChar_y - 50, 6,20);
//legs
    rect(gameChar_x - 24, gameChar_y - 27, 36, 8);
    rect(gameChar_x -24, gameChar_y - 22, 8,14);
    rect(gameChar_x +2, gameChar_y -25, 10, 14)
    rect(gameChar_x +2,gameChar_y -17, 20,8);
//leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//eyes
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 3, gameChar_y - 60,4,4);
	}

//Jumping right
	else if(isRight && isFalling)
	{
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
//arms
    rect(gameChar_x- 16, gameChar_y-50, 34,8);
    rect(gameChar_x -20, gameChar_y - 50, 6, 20);
    rect(gameChar_x + 14, gameChar_y - 62, 6,20);
 //legs
    rect(gameChar_x- 12, gameChar_y - 27, 36, 8);
    rect(gameChar_x +16, gameChar_y - 22, 8,14);
    rect(gameChar_x - 12, gameChar_y -25, 10, 14)
    rect(gameChar_x - 22,gameChar_y -17, 20,8);
 //leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//eyes
    fill(0);
    ellipse(gameChar_x - 3, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 7, gameChar_y - 60,4,4);

	}
    
	else if(isLeft)
	{
//Walking left
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
//legs
    quad(gameChar_x -11,gameChar_y -22,
         gameChar_x-20, gameChar_y-3,
         gameChar_x-10,gameChar_y - 3,
         gameChar_x, gameChar_y - 22);
    rect(gameChar_x +2, gameChar_y -25, 10, 14)
    rect(gameChar_x +2,gameChar_y -17, 20,8);
 //arms
   rect(gameChar_x + 13, gameChar_y - 50, 6, 25);
//leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//eyes
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 3, gameChar_y - 60,4,4);
	}

	else if(isRight)
	{
//Walking right
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
//arms
    rect(gameChar_x -19, gameChar_y - 50, 6, 25);
//legs
quad(gameChar_x,gameChar_y -22,
    gameChar_x + 12, gameChar_y-3,
    gameChar_x + 21,gameChar_y - 3,
    gameChar_x +11, gameChar_y - 22);
    rect(gameChar_x - 12, gameChar_y -25, 10, 14)
    rect(gameChar_x - 22,gameChar_y -17, 20,8);
//leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//eyes
    fill(0);
    ellipse(gameChar_x - 3, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 7, gameChar_y - 60,4,4);
        
	}
    
	else if(isFalling || isPlummeting)
	{
//Jumping facing forwards
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
//arms
    rect(gameChar_x -19, gameChar_y - 70, 6, 25);
    rect(gameChar_x + 13, gameChar_y - 70, 6,25);
//legs
    rect(gameChar_x- 18, gameChar_y - 26, 36, 8);
    rect(gameChar_x - 23, gameChar_y - 26, 8,15);
    rect( gameChar_x + 14, gameChar_y - 26, 8,15);    
//leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//eyes
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 5, gameChar_y - 60,4,4);
	}
	else
	{
//Standing front
    fill(150,114,100);
    ellipse(gameChar_x, gameChar_y - 60, 23,23);
    rect( gameChar_x -12, gameChar_y - 50, 24,30);
 //legs 
    rect(gameChar_x -11, gameChar_y - 20, 8,20);
    rect( gameChar_x + 3, gameChar_y- 20, 8, 20);
 //arms
    rect(gameChar_x -19, gameChar_y - 50, 6, 25);
    rect(gameChar_x + 13, gameChar_y - 50, 6, 25);
 //leaf
    fill(58,95,11);
    quad(gameChar_x, gameChar_y- 12,
         gameChar_x-5,gameChar_y-21,
         gameChar_x,gameChar_y - 25,
        gameChar_x+5, gameChar_y-21);
//face
    fill(0);
    ellipse(gameChar_x - 5, gameChar_y - 60,4,4);
    ellipse(gameChar_x + 5, gameChar_y - 60,4,4);
	}

	///////////INTERACTION CODE//////////
    
///GAME CHARACTERS MOVEMENT
    
//Walking left
    if (isLeft == true)
        {
            gameCharTX -= 5;
        }
//Walking right
    if (isRight == true)
        {
            gameCharTX +=5;
        }

//A loop to the platform array to determine if Game character is on platform. if it is, return true value
    if(floorPos_y > gameChar_y)
        {
        var isContact = false;
        for(var i =0; i < platforms.length; i++)
            {
               if( platforms[i].checkContact(gameCharTX,gameChar_y) == true)
                   {
                       isContact = true;
                       break;
                   }
            }
    
// To determine if Game Character is at the wall, if it is then game character cannot keep moving left
    if (gameCharTX <= wall.x_pos + wall.width)
        {
            gameCharTX = wall.x_pos + wall.width;
            console.log('returned');
        }
            
            
//If false, Game character should remain falling or on the floor
    if(isContact == false)
        {
        gameChar_y +=2;
        isFalling = true; 
        }
        }
    else
        {
            isFalling = false;
        }   

//Check if game character has reached the flagpole.
    if (flagpole.isReached == false)
        {
            checkFlagPole();
        }
    
//check if game character is plummeting. if so, call check if player is dead function
    if(isPlummeting == true)
        {
            gameChar_y +=1;            
            checkPlayerDie();
            return;
        }
}

//Functions when key's are pressed
function keyPressed()
{
    
//moving left, check if behind wall if character is, then return back to after wall
    if(keyCode == 65)
        {
            if (gameCharTX <= wall.x_pos + wall.width)
                {
                    gameCharTX = wall.x_pos + wall.width;
                }
            else
            {
            isLeft = true;
            grass_sound.play();
            }

//Instructions to be gone if character moves
            if (instruct == true)
                {
                    instruct = false;
                }
        }
    
//moving right
    if(keyCode == 68)
        {
            isRight = true;
            grass_sound.setVolume(0.1);
            grass_sound.play();
            
//Instructions to be gone if character moves
            if (instruct == true)
                {
                    instruct = false;
                }
        }
    
//plummeting 
    if(isPlummeting == true)
        {
            isRight = false;
            isLeft = false;

        }
//jumping
    if (keyCode == 87 && isFalling == false && isPlummeting == false)
        {
            gameChar_y -= 100;
            jump_sound.play();
            
//Instructions to be gone if character moves
            if (instruct == true)
                {
                    instruct = false;
                }
        }

// restart game if spacebar is hit when player loses. Instructions will reappear
    if(lives == 0)
        {
            if(keyCode == 32)
                {
                    startGame();
                    lives = 3;
                }
        }
    
}

//Function when key is released
function keyReleased()
{
    
//moving left, check character is behind wall, then return back to after wall
    if(keyCode == 65)
        {
            if (gameCharTX <= wall.x_pos + wall.width)
                {
                    gameCharTX = wall.x_pos + wall.width;
                }
            isLeft = false;
        }
    
//moving right
    if(keyCode == 68)
        {
            isRight = false;
        }
}

////////DRAWING FUNCTIONS///////////

//draw clouds by calling a loop
function drawClouds()
{    
    for(var i =0; i<clouds.length; i++)
        {
        fill(255);
        ellipse(clouds[0]*i+clouds[1]+40, clouds[2],clouds[3]*1.2,clouds[3]);
        ellipse(clouds[0]*i+clouds[1], clouds[2],clouds[3]*1.2,clouds[3]);
        ellipse(clouds[0]*i+clouds[1]+20, clouds[2]-clouds[3]/3,clouds[3]*1.2,clouds[3])*1.2;
        ellipse(clouds[0]*i+clouds[1]+70, clouds[2]-clouds[3]/4,clouds[3]*1.2,clouds[3]*1.2);
        }
}

//draw mountains my calling a loop
function drawMountains()
{
    for(var i =0; i < mountain.length; i++)
        {
    stroke(0);
    strokeWeight(0.05);
    fill(190);
    triangle(mountain[0] + mountain[1] * 0.4 + i * 450, floorPos_y,
             mountain[0] + mountain[1] * 1.3 + i * 450, floorPos_y - mountain[1] * 0.6,
             mountain[0] + mountain[1] * 2.3 + i * 450, floorPos_y);
    fill(210);//shadow
    triangle(mountain[0] + mountain[1] * 1.1 + i * 450, floorPos_y,
             mountain[0] + mountain[1] * 1.3 + i * 450, floorPos_y - mountain[1] * 0.6,
             mountain[0] + mountain[1] * 2.3 + i * 450, floorPos_y);
            
    fill(150);
    triangle(mountain[0] + i * 1050,floorPos_y,
             mountain[0] + mountain[1]/2 + i * 1050, floorPos_y - mountain[1],
             mountain[0] + mountain[1] + i * 1050, floorPos_y);
    fill(175)///shadows///
    triangle(mountain[0] + mountain[1] * 0.3 + i * 1050,floorPos_y,
             mountain[0] + mountain[1]/2 + i * 1050, floorPos_y - mountain[1],
             mountain[0] + mountain[1] + i * 1050, floorPos_y);
            
    fill(140)
    triangle(mountain[0] + mountain[1] -70 + i * 450, floorPos_y,
             mountain[0] + mountain[1] + mountain[1] * 0.2 + i * 450, floorPos_y - mountain[1] * 0.5,
             mountain[0] + mountain[1] + mountain[1] * 0.6 + i * 450, floorPos_y);
    fill(175)       
    triangle(mountain[0] + mountain[1] * 1.4 + i * 450, floorPos_y,
             mountain[0] + mountain[1] + mountain[1] * 0.2 + i * 450, floorPos_y - mountain[1] * 0.5,
             mountain[0] + mountain[1] + mountain[1] * 0.6 + i * 450, floorPos_y);   
                        
    fill(150);
    triangle(mountain[4] + mountain[5] * 0.4 + i * 370, floorPos_y,
             mountain[4] + mountain[5] * 1.3 + i * 370, floorPos_y - mountain[5] * 0.6,
             mountain[4] + mountain[5] * 2.3 + i * 370, floorPos_y);
    fill(190);//shadow
    triangle(mountain[4] + mountain[5] * 1.1 + i * 370, floorPos_y,
             mountain[4] + mountain[5] * 1.3 + i * 370, floorPos_y - mountain[5] * 0.6,
             mountain[4] + mountain[5] * 2.3 + i * 370, floorPos_y);


    fill(175);
    triangle(mountain[2] + mountain[3] * 0.4, floorPos_y,
             mountain[2] + mountain[3] * 1.3, floorPos_y - mountain[3] * 0.6,
             mountain[2] + mountain[3] * 2.3, floorPos_y);
    fill(210);//shadow
    triangle(mountain[2] + mountain[3] * 1.1, floorPos_y,
             mountain[2] + mountain[3] * 1.3, floorPos_y - mountain[3] * 0.6,
             mountain[2] + mountain[3] * 2.3, floorPos_y);  
        }
}

//drawing trees by calling a loop

function drawTrees()
{
    for (var i = 0; i < 10 ; i++)
        {
            noStroke();
    ///larger trees////
            fill(175, 128,79);
            rect(trees_x[1]+ i*660,floorPos_y - 150, 33, 170);
            fill(0, 120, 64);
            triangle(trees_x[1] - 35 + i*660, floorPos_y - 120,
                    (trees_x[1] + 15+i*660),floorPos_y - 250,
                     trees_x[1] + 65+ i*660, floorPos_y - 120)
            triangle(trees_x[1] - 35 + i*660, floorPos_y - 70,
                    (trees_x[1] + 15+i*660),floorPos_y - 200,
                     trees_x[1] + 65+ i*660, floorPos_y - 70)
            
    ///short trees///
            
//trees on Right side
            fill(150, 128,79);
            rect(trees_x[0] + i*550,floorPos_y - 100, 30, 100);
            fill(0, 144, 64);
            ellipse(trees_x[0]- 20 + i*550, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 50 * 0.2 + i*550, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 50 * 0.8 + i*550, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 50 * 0.5 + i*550, floorPos_y - 100 * 1.5, 50, 50);
            ellipse(trees_x[0] + 50 * 0.1 + i*550, floorPos_y - 100 * 1.5, 50 * 1.2, 50 * 1.2);
// trees on left side
            fill(150, 128,79);
            rect(trees_x[0] - i*250,floorPos_y - 100, 30, 100);
            fill(0, 144, 64);
            ellipse(trees_x[0]- 20 - i*250, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 10 - i*250, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 40 - i*250, floorPos_y - 100 * 1.15, 50, 50);
            ellipse(trees_x[0] + 25 - i*250, floorPos_y - 100 * 1.5, 50, 50);
            ellipse(trees_x[0] + 5 - i*250, floorPos_y - 100 * 1.5, 50 * 1.2, 50 * 1.2);
        }
}

//function to draw collectable
function drawCollectable(collectables){
    checkCollectable(collectables);       
}

//function to draw canyon
function drawCanyon(canyons)
{
    checkCanyon(canyons);
}

//function to check if collectable is found or not
function checkCollectable(t_collectable)
{
//if found, collectable is not drawn and game score increases
    if(dist(gameCharTX,gameChar_y,t_collectable.x_pos,t_collectable.y_pos) < 15){
        t_collectable.isFound = true;
        game_score += 0.5;
        collect_sound.play();
        }
    
//if not found, draw collectable
    if(t_collectable.isFound == false){
        fill(255, 168,54);
        ellipse(t_collectable.x_pos,t_collectable.y_pos,random(30,33),random(24,30));
        fill(245,118, 26,);
        ellipse(t_collectable.x_pos,t_collectable.y_pos,random(21,25),random(15,24));
        fill(0);
        ellipse(t_collectable.x_pos,t_collectable.y_pos,random(6,9),random(10,12));
        }
    
}

//function to check if game character will plummet into canyon
function checkCanyon(t_canyon)
{
if(t_canyon.x_pos + 20 < gameCharTX + gameChar_width && (t_canyon.x_pos + t_canyon.width) > gameCharTX + gameChar_width + 10)
    {
        //if game character is below floor position, it will plummet
    if(gameChar_y >= floorPos_y)
        {
            isPlummeting = true;

        }
    }
    //if game character is plummetting, player cannot move character and it will plunge to death
    if(isPlummeting == true)
        {
            gameChar_y += 0.7;
            isRight = false;
            isLeft = false;
        }
    
    //Draw function for canyon
    fill(101,67,33);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, floorPos_y);
    fill(128,197,222);
    rect(t_canyon.x_pos, floorPos_y + 110, t_canyon.width, floorPos_y, 5);


}

//Function to draw flagpole
function renderFlagPole()
{
    push();
//Drawing for flagpole without flag
    strokeWeight (5);
    stroke(255);
    line(flagpole.x_pos, floorPos_y,flagpole.x_pos,floorPos_y- 300);
    noStroke();
    fill(150,0,0);

//if game character reaches flagpole, flag will go up
    if (flagpole.isReached)
        {
        rect(flagpole.x_pos, floorPos_y-300, 70,50);
        fill(150);
        rect(flagpole.x_pos - 30, floorPos_y-20, 60,25);
        }
    
//if game character reaches flagpole, flag will stay down
    else 
        {
        rect(flagpole.x_pos, floorPos_y-50, 70,50);
        fill(150);
        rect(flagpole.x_pos - 30, floorPos_y-20, 60,25);

        }
    pop();
}

//function to determine if game character reached flagpole
function checkFlagPole()
{
    var dist = abs(gameCharTX - flagpole.x_pos);
    
    if (dist < 15)
        {
            flagpole.isReached = true;
            cleared_sound.play();
            hooray_sound.play();

        }
}

//function to draw lives on top right corner
function drawLives()
{
    fill(255,0,0);
    for(var i =0; i<lives; i++)
    {
        ellipse(60*i + 870, 24,24);
        ellipse(60*i + 850, 24,24);
        triangle(60*i + 883,25,
                 60*i + 837,25,
                 60*i + 860,55);
    }
}

//function to check if player is dead
function checkPlayerDie()
{

//if game charater is in canyon, fall sound will play
    if (gameChar_y > height)
        {
        fall_sound.play();
//if player has more than 1 life, deduct a life and restart position
        if (lives>0)
            { lives --;
                startGame();
                instruct = false;
            }
//if player has only 1 life, play 'oh no' sound
        if(lives == 1)
            {
                ohno_sound.play();
            }
//however if player has no lives, play fail sound
        else if (lives == 0)
            {
                failed_sound.play();
            }
            
        }
}

//check if game is over
function checkIsGameOver()
{
    var gameOver = false;
//if player has no lives left, or game character reaches flagpole, the game is over
    if(lives<1 || flagpole.isReached)
        {
            gameOver = true;
        }
    
    return gameOver;
}

//function to draw to draw game over state
function drawGameOver(){
//if player has some lives left, player has cleared the game
    if(lives>0)
    {
    fill(0);
    textSize(50);
    text("Stage Cleared!", width/3,height/2);
    text("score: " + game_score, width/3, height/1.5);
    }
    else
    {
// if player has no lives left, player has lost the game
    fill(0);
    textSize(70);
    text("Game Over", width/3.5, height/6);
    textSize(60);
    text("Stage failed!",width/3,height/3);
    textSize(40);
    text("Press space to restart", width/3.5, height/1.5);
    }
}


//function to check and create instructions in game
function instructions(){
    if (instruct == true)
        {
        fill(0);
        textSize(70);
        text("Jungle game", width/3.5, height/5);
        textSize(50);
        text("Controls: ",width/2.5,height/2.2);
        textSize(40);
        text(" Front: W |"+ " Left: A |" + " Right: D " , width/4, height/1.7);
        }
    else{
        instruct = false;
    }
}

//function to create platforms
function createPlatforms(x,y,length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function() {
//draw platform function
            fill(131,105,83);
            rect(this.x, this.y, this.length,20);
        },
//check if game character is in contact with platform
        checkContact: function(gc_x, gc_y)
        {
            if (gc_x > this.x && gc_x < this.x + this.length + 10)
            {
                var d = this.y - gc_y;
//if in contact with platform, game character will display fall image
                if(d >= 0 && d<8)
                    {
                        isFalling = false;
                        return true;
                    }                  
            }
            return false;
        }
    }
    return p;
}

//function to create enemy
function Enemy (x,y,range)
{   
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.inc = 1;
    this.update =function()
    {
        this.currentX += this.inc;
        
        if (this.currentX >= this.x + this.range)
            {
                this.inc = -1; 
            }
        else if (this.currentX < this.x)
            {
                this.inc = 1;
            }
    }

//DRAW FUNCTION FOR ENEMY
    this.draw = function()
    {
        this.update()
                
    fill(199,128,35);
//Enemy facing left
        if(this.inc == -1)
    {
    ellipse(this.currentX, this.y - 50, 20,20);
    rect( this.currentX -12, this.y - 40, 20,30);
    //legs
    quad(this.currentX -11,this.y -12,
         this.currentX-20, this.y+7,
         this.currentX-10,this.y +7,
         this.currentX, this.y - 12);
    rect(this.currentX +2, this.y -15, 10, 14)
    rect(this.currentX +2,this.y -7, 20,8);
    
    //arms
   rect(this.currentX + 10, this.y - 40, 6, 25);
    rect(this.currentX -19, this.y - 40, 6, 25);

    
    //leaf
    fill(1,50,32);
    quad(this.currentX, this.y- 2,
         this.currentX-5,this.y-11,
         this.currentX,this.y - 15,
        this.currentX+5, this.y-11);
    
    //eyes
    fill(0);
    ellipse(this.currentX - 7, this.y - 50,4,4);
    ellipse(this.currentX + 3, this.y - 50,4,4);
    rect(this.currentX - 7, this.y - 54, 11,1);
    }
    else 
    {
//Enemy facing right
    fill(199,128,35);
    ellipse(this.currentX, this.y - 50, 20,20);
    rect( this.currentX -12, this.y - 40, 20,30);
    //arms
    rect(this.currentX -19, this.y - 40, 6, 25);
    rect(this.currentX + 9, this.y - 40, 6, 25);
    
    //legs
    quad(this.currentX,this.y -12,
    this.currentX + 12, this.y+7,
    this.currentX + 21,this.y +7,
    this.currentX +11, this.y - 12);
    rect(this.currentX - 12, this.y -15, 10, 14)
    rect(this.currentX - 22,this.y -7, 20,8);
    //leaf
    fill(1,50,32);
    quad(this.currentX, this.y- 2,
         this.currentX-5,this.y-11,
         this.currentX,this.y - 15,
        this.currentX+5, this.y-11);
    //eyes
    fill(0);
    ellipse(this.currentX - 3, this.y - 50,3.5,3.5);
    ellipse(this.currentX + 7, this.y - 50,3.5,3.5);
    rect(this.currentX - 3, this.y - 54, 11,1);

    }
    }
    
//check if game character is touches enemy
    this.checkContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        
        if(d<20)
            {
                return true;
            }
    return false;
    }
}