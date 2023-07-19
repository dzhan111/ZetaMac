//https://www.w3schools.com/js/js_input_examples.asp

const TIME_LIMIT = 120;
let score = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let answer = -1;


const startBtn = document.getElementById('start');


const timerElement = document.getElementById('timer');
timerElement.textContent = `Time Left: ${formatTime(timeLeft)}`;

const scoreElement = document.getElementById('score');
scoreElement.textContent = `Score: ${score}`;

const input = document.getElementById('input');
const container = document.getElementById('container');
const finalScore = document.getElementById('final_score');


//main code

input.hidden = true;
finalScore.hidden = true;


function startGame() {
  reset();
  startTimer();
  displayQuestion();
  prepInput();
  startBtn.hidden = true;
  
}

//functions 

function prepInput(){
  input.focus();
  input.addEventListener('input', function() {
    var inputValue = input.value;
    if(inputValue == answer){
      incrementScore();
      displayQuestion()
    } 
  });
}

function showFinalScore(){
  //show final score
  //show replay button
  finalScore.hidden = false;
  finalScore.textContent = `Score: ${score}`
  startBtn.hidden = false;


}

function reset(){
  input.hidden = true;
  finalScore.hidden = true;
  container.hidden = false;
  score = 0;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  answer = -1;
  scoreElement.textContent = `Score: ${score}`;
  
  timerElement.textContent = `Time Left: ${formatTime(timeLeft)}`;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    if (timeLeft >= 0) {
      timerElement.textContent = `Time Left: ${formatTime(timeLeft)}`;
    } else {
      clearInterval(timerInterval);
      
      container.hidden = true;
      showFinalScore();

    }
  }, 1000);
}

function incrementScore(){
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
}



function displayQuestion(){
    input.value = "";
    input.focus();
    
    const questionElement = document.getElementById('question');
    //first number 1 to 4 - chooses +-/*
    let operation = Math.floor(Math.random() * 4)+1;

    //all the math shit
    if(operation == 1){
        var first = Math.floor(Math.random() * 100)+2;
        var second = Math.floor(Math.random() * 100)+2;
        var sign = `+`;
        answer = first + second;
    }else if(operation == 2){
        var first = Math.floor(Math.random() * 100)+2;
        var second = Math.floor(Math.random() * 100)+2;
        var sign = `−`;
        if(first >= second){
            
            answer = first - second;
        }else{
            var temp = second;
            second = first;
            first = temp;
            answer = first-second;
        }

    }else if(operation == 3){
        var first = Math.floor(Math.random() * 10)+2;
        var second = Math.floor(Math.random() * 100)+2;
        var sign = `x`;
        answer = first * second;

    }else if(operation == 4){
        var first = Math.floor(Math.random() * 100)+2;
        var second = Math.floor(Math.random() * 10)+2;
        var sign = `÷`;
        var temp = first
        first = first * second;
        answer = temp;

    }

    questionElement.textContent = `${first} ${sign} ${second}`;
    //displays the text box
    input.hidden = false;
}

