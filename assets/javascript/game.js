const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timerEl = document.getElementById("timer");

var timeLeft = 120;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What should values always be closed in?",
        choice1: "Parenthesis",
        choice2: "Quotation Marks",
        answer: "2"
    },
    {
        question: "What git command allows a user to download a repository from GitHub to a user's computer?",
        choice1: "git commit",
        choice2: "git clone",
        answer: "2"
    },
    {
        question: "How do you stage files for a commit in GitBash?",
        choice1: "git add",
        choice2: "git stage",
        answer: "1"
    },
    {
        question: "How do you round a number (5.25) to the nearest integer?",
        choice1: "Math.round(5.25)",
        choice2: "Math.Round(5.25)",
        answer: "1"
    },
    {
        question: "The '#' symbol specifies that the selector is?",
        choice1: "class",
        choice2: "id",
        answer: "2"
    },
    {
        question: "In CSS, which of the following property is used to set the height of an image?",
        choice1: "width",
        choice2: "height",
        answer: "2"
    },
    {
        question: "In CSS, which of the following property changes the width of top border?",
        choice1: ":border-bottom-width",
        choice2: ":border-top-width",
        answer: "2"
    },    
    {
        question: "In CSS, which of the following property is used to set the height of an image?",
        choice1: "width",
        choice2: "height",
        answer: "2"
    },    
    {
        question: "In CSS, what property is used to change the text color of an element?",
        choice1: "color",
        choice2: "font-color",
        answer: "1"
    },
    {
        question: "What does CSS stand for?",
        choice1: "Colorful Style Sheets",
        choice2: "Cascading Style Sheets",
        answer: "2"
    }
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = function () {
    questionCounter = 0;
    score = 0;
    timer = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function startTimer() {
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        window.alert("Game Over! Save your score and try again!");
        // go to end of page
        return window.location.href("/code-quiz/assets/html/end.html")
      }
    }, 1000);
}

getNewQuestion = function () {
 
    // when there are no more questions left 
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        // save the player score
        localStorage.setItem("mostRecentScore", score);
        // go to end of page
        return window.location.href("/code-quiz/assets/html/end.html");
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

            // correct answer will get additional points
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }
            // incorrect answer will get reduced time
            else if (classToApply !== "correct") {
                timeLeft = timeLeft - 10;
            };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply); 
            getNewQuestion(); 
        }, 1000);
     
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();
startTimer();