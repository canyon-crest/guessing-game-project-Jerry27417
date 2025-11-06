// global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();
// add event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", userGiveUp);

function play(){
    score=0; //sets score to 0 every new game
    playBtn.disabled=true;
    guessBtn.disabled=false;
    guess.disabled = false;
    giveUp.disabled = false;
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-"+level;
    answer = Math.floor(Math.random()*level)+1;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)||userGuess <1||userGuess>level){
        msg.textContent ="Enter a valid #1-" +level;
        return;
    }
    score++; //valid guess add 1 to score
    if(userGuess > (answer+10)||userGuess<(answer-10)){
        msg.textContent ="Cold";
    }
    else if(userGuess<answer||userGuess>answer){
        msg.textContent ="Warm";
    }
    else{
        updateScore();
        reset(); //jumps to reset function
        if(score<=5){
            msg.textContent = "Good job. It took you " + score + " tries. Press play to play again.";
        }
        else if(score<=10){
            msg.textContent = "Okay. It took you " + score + " tries. Press play to play again.";
        }
        else{
            msg.textContent = "Bad. It took you " + score + " tries . Press play to play again.";
        }
    }
}
function userGiveUp(){
    reset();
}
function reset(){
    guessBtn.disabled=true;
    guess.disabled=true;
    giveUp.disabled=true;
    guess.value = "";
    playBtn.disabled=false;
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled=false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); // sort increasing order
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(let i =0;i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent= "Average Score: " + avg.toFixed(2);
}
function time(){
    let d = new Date();

    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    
    
    let monthName = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    let seconds = d.getSeconds();
    return monthName + " " + addSuffix(day) + ", " + year + ", " + seconds;
}
function addSuffix(day) {
    if (day >= 11 && day <= 13) {
        return day + "th";
    }
    switch (day % 10) {
        case 1: return day + "st";
        case 2: return day + "nd";
        case 3: return day + "rd";
        default: return day + "th";
    }
}
function updateTimeDisplay() {
    date.textContent = time();
}

updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);