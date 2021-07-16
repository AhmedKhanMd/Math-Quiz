let startReset = document.getElementsByClassName("start-reset"); // returns a list with all those classes
let timer = document.getElementsByClassName("timer");
let Score = document.getElementsByClassName("score");
let gameOver = document.getElementsByClassName("game-over");
let remainingTime = document.getElementsByClassName("time-remaining");
let Correct = document.getElementsByClassName("correct");
let Wrong = document.getElementsByClassName("wrong");
let clickedAnswer = document.getElementsByClassName("options");
let operators = ["+", "-", "*", "/", "%"];
let correctAnswers = [];
let isPlaying = false;
let timeRemaining;
let score;
let time;

startReset[0].addEventListener("click", function () {
  if (isPlaying === false) {
    isPlaying = true;               // initializing timer and score and setting playing state to true
    score = 0;
    timeRemaining = 60;
    Score[0].innerHTML = "<p> Score : " + score + "</p>";   // updating HTML Content corresponding to values
    gameOver[0].style.display = "none";
    startReset[0].innerHTML = "Reset Game";
    timer[0].style.display = "block";
    generateQuestionAndOptions();
    reduceTimer();  // Reducing time by 1 seconds
  } else {
    location.reload();
  }
});

for (let i = 0; i < 4; ++i) {
  clickedAnswer[i].addEventListener("click", function () {  // checking which option user has clicked 
    if (isPlaying === true) {
      if (
        clickedAnswer[i].innerHTML == correctAnswers[correctAnswers.length - 1] // comparing user option with correct answer
      ) {
        score += 1;
        Score[0].innerHTML = "<p> Score : " + score + "</p>"; // showing correct alert for 1 sec and increasing score
        Wrong[0].style.display = "none";
        Correct[0].style.display = "block";
        setTimeout(function () {
          Correct[0].style.display = "none";
        }, 1000);
        generateQuestionAndOptions(); // generating new question and options
      } else {
        Correct[0].style.display = "none";
        Wrong[0].style.display = "block"; // showing wrong alert for 1 sec 
        setTimeout(function () {
          Wrong[0].style.display = "none";
        }, 1000);
      }
    }
  });
}

function generateQuestionAndOptions() {
  let num1 = Math.floor(10 * Math.random()) + 1;  // Genarting random numbers and operator
  let num2 = Math.floor(10 * Math.random()) + 1;
  let operator = operators[Math.floor(5 * Math.random())];
  let correctAnswer = calculateAnswer(num1, num2, operator); 

  correctAnswers.push(correctAnswer); // storing the correct answer

  document.getElementsByClassName("question")[0].innerHTML =
    num1 + "    " + operator + "    " + num2;

  generateOptions(correctAnswer);
}

function calculateAnswer(num1, num2, op) { // returns corresponding mathematical operation's result
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return Math.floor(num1 / num2);
    case "%":
      return num1 % num2;
  }
}

function generateOptions(correctAnswer) {
  let options = [];
  let randomChoices = [];

  options.push(correctAnswer); // storing correct option

  while (options.length != 4) { // generating three random options
    let option = generateNumber();

    while (options.includes(option)) {
      option = generateNumber();
    }

    options.push(option);
  }

  do {
    let randomNumber = Math.floor(Math.random() * 4); // stroing these random options in random containers/options

    if (!randomChoices.includes(options[randomNumber])) {
      randomChoices.push(options[randomNumber]);
    }
  } while (randomChoices.length != 4);

  document.getElementsByClassName("option-1")[0].innerHTML = randomChoices[0]; 
  document.getElementsByClassName("option-2")[0].innerHTML = randomChoices[1];
  document.getElementsByClassName("option-3")[0].innerHTML = randomChoices[2];
  document.getElementsByClassName("option-4")[0].innerHTML = randomChoices[3];
}

function generateNumber() {
  let num1 = Math.floor(10 * Math.random()) + 1;
  let num2 = Math.floor(10 * Math.random()) + 1;
  let operator = operators[Math.floor(5 * Math.random())];

  return calculateAnswer(num1, num2, operator);
}

function reduceTimer() { // reducing time by 1 sec
  time = setInterval(function () {
    timeRemaining--;

    remainingTime[0].innerHTML = timeRemaining;

    if (timeRemaining === 0) {  // stop game when timer reaches zero
      clearInterval(time);
      gameOver[0].style.display = "block";
      gameOver[0].innerHTML =
        "<p> Game Over! </p>" + "<p> Your Score is " + score + "</p>";
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
