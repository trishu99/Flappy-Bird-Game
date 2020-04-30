// select start button, to start and restart the game
var start = document.getElementById("start");

// select divs to show hight score
var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");

// select canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var gameover = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
gameover.src = "images/gameover.png";

// some variables
var game;
var gap = 85;
var constant;
var score = 0

var bX = 10;
var bY = 150;

var gravity = 1.5;

// to save all the score in an array
var scoreArray = [];

// create audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// to help sort integers descending
function sortNumber(a,b) {
    return b - a;
}

// onclick event to start and restart the game when click the button.
start.onclick = function(){
    init();
};


// draw foreGround, bird, score
function render(){    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
}

// draw foreGround, bird, score, when the page is loaded
ctx.drawImage(bg,0,0);
render();


// keydown event to move up the bird
document.addEventListener("keydown",moveUp);
function moveUp(evt){
    if(evt.keyCode == 38){
        bY -= 25;
        fly.play();
    }
}

// intialize the game
function init(){
    
    // set the score to zero, when the game is restarted
    score = 0;

    // pipe coordinates
    var pipe = [];

    pipe[0] = {
        x : cvs.width,
        y : 0
    };

    // draw the game
    function draw(){

        ctx.drawImage(bg,0,0);


        for(var i = 0; i < pipe.length; i++){

            constant = pipeNorth.height+gap;
            ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

            pipe[i].x--;

            if( pipe[i].x == 125 ){
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                }); 
            }

            // detect collision
            if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
                //location.reload(); // reload the page
                scoreArray.push(score);
                scoreArray.sort(sortNumber);
                first.innerHTML = (scoreArray[0]) ? scoreArray[0] : 0;
                second.innerHTML = (scoreArray[1]) ? scoreArray[1] : 0;
                third.innerHTML = (scoreArray[2]) ? scoreArray[2] : 0;
                ctx.drawImage(gameover, cvs.width / 5 + 20, cvs.height/5, 100, 100);
                clearInterval(game);
            }
            if(pipe[i].x == 5){
                score++;
                scor.play();
            }
        }
        render();
        bY += gravity;
    }
    // game loop
    game = setInterval(draw,1000/50);
}

