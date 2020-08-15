const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');


// this enables us to save and get the most recent score
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

// user can add username to keep their score
username.addEventListener('keyup', () => {
    // disables the person to adding a username if there is nothing there
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("clicked the save button!");
    e.preventDefault();
};