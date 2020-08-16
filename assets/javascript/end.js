const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// lcan still save high scores by converting into JSON
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);

// this enables us to save and get the most recent score
finalScore.innerText = mostRecentScore;

// user can add username to keep their score
username.addEventListener("keyup", () => {
    // disables the person to adding a username if there is nothing there
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("clicked the save button!");
    e.preventDefault();

    // presenting score and highpoints together
    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    
    // if b score is higher than a score, put b before a - sorting array
    highScores.sort ((a,b) => b.score - a.score);

    // set a max amount of high scores, only top 5 -- using splice
    highScores.splice(5);

    // update the high score
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // go back home
    window.location.assign("index.html");
};