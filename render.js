//alert("a") ;
let canvas = document.querySelector("#myCanvas") ;
let ctx = canvas.getContext("2d") ;

//ball : 
let y = canvas.height / 2  ;
let x = (canvas.width / 2 ) - 20 ;
let ballRadius = 10 ;
let dx = -0.8 ;
let dy = -2.4 ;

//paddle
let paddleHeight = 10 ;
let paddleWidh = 75 ;
let paddleX = (canvas.width - paddleWidh )/2 ;

//keyboard :
let rightPressed = false ;
let leftPressed = false ;

// bricks :
let brickRowCount = 5 ;
let brickColumnCount = 6 ;
let brickWidh = 80 ;
let brickHeight = 20 ;
let brickPadding = 0 ;
let brickOffsetTop = 0 ;
let brickOffsetleft = 00 ;

let bricks = [] ;

for(let c = 0 ; c < brickColumnCount ; c++){
    bricks[c] = [] ;
    for(let r = 0 ; r < brickRowCount ; r++){
        bricks[c][r] = {x : 0 , y : 0 , status : 1} ;
    }
}

const drawBricks = () =>{
    for(let c = 0 ; c < brickColumnCount ; c++){
        for(let r = 0 ; r < brickRowCount ; r++){
            if(bricks[c][r].status == 1){
                let brickX = c*(brickWidh + brickPadding) +brickOffsetleft ;
                let brickY = r*(brickHeight + brickPadding) + brickOffsetTop ;
                let stat = bricks[c][r].status ;
                bricks[c][r] = {x : brickX , y : brickY , status : stat} ;
                ctx.beginPath() ;
                ctx.rect(brickX , brickY , brickWidh , brickHeight) ;
                ctx.fillStyle = "#0095DD" ;
                ctx.fill() ;
                ctx.closePath() ;
            }
        }
    }
}

const collisionDetection = () => {
    for(let c = 0 ; c < brickColumnCount ; c++){
        for(let r = 0 ; r < brickRowCount ; r++){
            let b = bricks[c][r] ;
            let ballEdgeX = x ;
            let ballEdgeY = y - ballRadius ;
            if(bricks[c][r].status == 1  && ballEdgeY < b.y + brickHeight && ballEdgeY > b.y){
                if(ballEdgeX > b.x && ballEdgeX < b.x + brickWidh ){
                    dy = -dy ;
                    //bricks[c][r].x = 0 ;
                    //bricks[c][r].y = 0 ;
                    bricks[c][r].status = 0 ;
                }
            }
        }
    }
}

const keyDownHandler = (e) => {
    if(e.key == "right" || e.key == "ArrowRight"){
        rightPressed = true ;
    }
    else if(e.key == "left" || e.key == "ArrowLeft"){
        leftPressed = true ;
    }
}

const keyUpHandler = (e) => {
    if(e.key == "right" || e.key == "ArrowRight"){
        rightPressed = false ;
    }
    else if(e.key == "left" || e.key == "ArrowLeft"){
        leftPressed = false ;
    }
}

const drawPaddle = () => {
    ctx.beginPath() ;
    ctx.rect(paddleX , canvas.height - 10 , paddleWidh , paddleHeight) ;
    ctx.fillStyle = "blue" ;
    ctx.fill() ;
    ctx.closePath() ;
}

const drawBall = () => {
    ctx.beginPath() ;
    ctx.arc(x , y ,ballRadius , 0 , 6.28) ;
    ctx.fillStyle = "blue" ;
    ctx.fill() ;
    ctx.closePath() ;
}

const checkWallCollision = () => {
    if( ((y + dy - ballRadius) < 0 ) ){
        dy = -dy ;
    }
    if( ((x + dx - ballRadius) < 0 ) || (x + dx + ballRadius) > canvas.width ){
        dx = -dx ;
    }
    if( (y + dy + ballRadius) > canvas.height ){
        if(x + ballRadius > paddleX && x - ballRadius < (paddleX + paddleWidh) ){
            dy = -dy ;
        }
        else{
            alert("GAME OVER");
            clearInterval(interval) ;
            document.location.reload() ;
        }
    }
}

// loop of the game 
const draw = () => {
    ctx.clearRect(0 , 0 , canvas.width , canvas.height ) ;
    checkWallCollision() ;
    drawBall() ;
    x += dx ;
    y += dy ;
    drawBricks() ;
    collisionDetection() ;
    drawPaddle() ;
    if(leftPressed && paddleX > 0 ){paddleX -= 5 ;}
    else if(rightPressed && (paddleX + paddleWidh) < canvas.width ){paddleX +=5 ;}
}

var interval = setInterval(draw , 10) ;

document.addEventListener("keydown" , keyDownHandler , false ) ; // why false parameter ?? 
document.addEventListener("keyup" , keyUpHandler , false ) ;