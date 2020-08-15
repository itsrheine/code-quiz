const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        choice1: "<script>",
        choice2: "<javascript>",
        answer: "1"
    },
    {
        question: "Question2",
        choice1: "<script>",
        choice2: "<javascript>",
        answer: "1"
    },
    {
        question: "Question3",
        choice1: "<script>",
        choice2: "<javascript>",
        answer: "1"
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

    // questions displayed
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
};

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

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();