const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

var timerEl = document.getElementById("countdown");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Question #1",
        choice1: "Pick Me!",
        choice2: "No, just don't",
        answer: "1"
    },
    {
        question: "Question #2",
        choice1: "Pick Me!",
        choice2: "Go Away!",
        answer: "1"
    },
    {
        question: "Question #3",
        choice1: "Don't even try it!",
        choice2: "Pick Me!",
        answer: "2"
    },
    {
        question: "Question #4",
        choice1: "I said, DON'T click me!",
        choice2: "Pick Me!",
        answer: "2"
    }
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = function () {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = function () {
 
    // when there are no more questions left 
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        // save the player score
        localStorage.setItem("mostRecentScore", score);
        // go to end of page
        return window.location.assign("end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS; 

    // questions displayed randomly
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    }

    // when timer is 0, get next question


// choices if they got the correct or incorrect answer
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply =
        // giving it a default value
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            // calling the score
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply); 
            getNewQuestion(); 
        }, 1000);
     
    });
});

// Timer that counts down from 5
function countdown() {
    var timeLeft = 5;
  
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
};

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();