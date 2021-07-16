let startReset = document.getElementsByClassName("start-reset");
let timer = document.getElementsByClassName("timer");
let Score = document.getElementsByClassName("score");
let gameOver = document.getElementsByClassName("game-over");
let remainingTime = document.getElementsByClassName("time-remaining");
let Correct = document.getElementsByClassName("correct");
let Wrong = document.getElementsByClassName("wrong");
let clickedAnswer = document.getElementsByClassName("options");
let isPlaying = false;
let timeRemaining;
let operators = ['+', '-', '*', '/', '%'];
let correctAnswers = []
let score;
let time;

startReset[0].addEventListener('click', function() {
  
  if(isPlaying === false) {
    isPlaying = true;
    score = 0;
    timeRemaining = 60;
    Score[0].innerHTML = "<p> Score : " + score + "</p>";
    gameOver[0].style.display = "none";
    startReset[0].innerHTML = "Reset Game";
    timer[0].style.display = "block";
    generateQuestionAndOptions();
    reduceTimer();
  }
  else {
    location.reload();
  }

});

for(let i = 0; i < 4; ++i)  {

  clickedAnswer[i].addEventListener('click', function () {

    if(isPlaying === true) {
      
      if(clickedAnswer[i].innerHTML == correctAnswers[correctAnswers.length - 1]) {
        score += 1;
        Score[0].innerHTML = "<p> Score : " + score + "</p>";
        Wrong[0].style.display = "none";
        Correct[0].style.display = "block";
        setTimeout(function() {
          Correct[0].style.display = "none";
        }, 1000);
        generateQuestionAndOptions();
      }
      else {
        Correct[0].style.display = "none";
        Wrong[0].style.display = "block";
        setTimeout(function() {
        Wrong[0].style.display = "none";
        }, 1000);
      }

    }
  
  })
  
}

function generateQuestionAndOptions()
{
  let num1 = Math.floor(10 * Math.random()) + 1;
  let num2 = Math.floor(10 * Math.random()) + 1;
  let operator = operators[Math.floor(5 * Math.random())];
  let correctAnswer = calculateAnswer(num1, num2, operator);

  correctAnswers.push(correctAnswer);

  document.getElementsByClassName("question")[0].innerHTML = num1 + "    " +  operator +  "    " + num2; 

  generateOptions(correctAnswer);
}

function calculateAnswer(num1, num2, op)
{
  switch(op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return Math.floor(num1 / num2);
    case '%': return num1 % num2;
  }

}

function generateOptions(correctAnswer)
{
  let options = [];
  let randomChoices = [];

  options.push(correctAnswer);  
  
  while(options.length != 4) {

    let option = generateNumber();

    while(options.includes(option)) {
      option = generateNumber();
    }

    options.push(option);
  }


  do {

    let randomNumber = Math.floor(Math.random() * 4);

    if(!randomChoices.includes(options[randomNumber])) {
      randomChoices.push(options[randomNumber]);
    }

  }while(randomChoices.length != 4);

  document.getElementsByClassName("option-1")[0].innerHTML = randomChoices[0];
  document.getElementsByClassName("option-2")[0].innerHTML = randomChoices[1];
  document.getElementsByClassName("option-3")[0].innerHTML = randomChoices[2];
  document.getElementsByClassName("option-4")[0].innerHTML = randomChoices[3];
}

function generateNumber()
{
  let num1 = Math.floor(10 * Math.random()) + 1;
  let num2 = Math.floor(10 * Math.random()) + 1;
  let operator = operators[Math.floor(5 * Math.random())];

  return calculateAnswer(num1, num2, operator);
}

function reduceTimer()
{
  time = setInterval(function() {
    
    timeRemaining--;

    remainingTime[0].innerHTML = timeRemaining;

    if(timeRemaining === 0) {
      clearInterval(time);
      gameOver[0].style.display = "block";
      gameOver[0].innerHTML = "<p> Game Over! </p>" + "<p> Your Score is " + score + "</p>";
      timer[0].style.display = "none";
      remainingTime[0].innerHTML = 60;
      Correct[0].style.display = "none";
      Wrong[0].style.display = "none";
      startReset[0].innerHTML = "Start Game";
      isPlaying = false;
      score = 0;
      timeRemaining = 60;
    }

  }, 1000); 
}