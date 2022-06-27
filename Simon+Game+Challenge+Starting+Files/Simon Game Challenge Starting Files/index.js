var userClickedPattern = []
var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var started = false
var level = 0

$(document).keydown(function(){
    if (started===false){
        $("#level-title").text("Level "+level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function(){
    var userChosenColour  = this.id; //= $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern = []
    level++;
    $("#level-title").text("Level "+level)

    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour  = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    $("div #"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        console.log("wrong")
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over")

        setTimeout(function () {
            $("body").removeClass("game-over")
          }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver()
    }

}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    } ,100)
}

