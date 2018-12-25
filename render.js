//alert("a") ;
let canvas = document.querySelector("#myCanvas") ;
let ctx = canvas.getContext("2d") ;

// test sample draw square :
ctx.beginPath() ;
ctx.rect(20 , 40 , 50 , 50) ;
ctx.fillStyle = "blue" ;
ctx.fill() ;
ctx.closePath() ;

ctx.beginPath() ;
ctx.rect(45 , 15 , 50 , 50) ;
ctx.fillStyle = "red" ;
ctx.fill() ;
ctx.closePath() ;

ctx.beginPath() ;
ctx.arc(100 , 100 , 20 , 0 , 6.28 ) ;
ctx.fillStyle = "green" ;
ctx.fill() ;
ctx.closePath() ;

ctx.beginPath() ;
ctx.arc(150 , 150 , 30 , 0 , 6.28) ;
ctx.strokeStyle = "black" ;
ctx.stroke() ; 
ctx.closePath() ;