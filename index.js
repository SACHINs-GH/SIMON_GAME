var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
$(document).keypress(function (){
    if(level===0){
        $("h1").text("Level "+level);
        nextSequence();
    } 
});
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).animate({opacity : 0.5},20);
    $("#"+randomChosenColor).animate({opacity : 1},20);
    playSound(randomChosenColor);
}
function playSound(color){
    new Audio("./sounds/"+color+".mp3").play();
}
function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function() {$("#"+color).removeClass("pressed");},100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {nextSequence();}, 1000);
        }
    }
    else gameOver();
}
function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() { $("body").removeClass("game-over");},200);
    playSound("wrong");
    startOver();
}
function startOver(){
    gamePattern=[];
    level=0;
}