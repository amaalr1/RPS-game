let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    
    }


let checkAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!checkAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        checkAutoPlaying = true;

    } else {
        clearInterval(intervalId);
        checkAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 's') {
        playGame('Scissors');
    } else if (event.key === 'p') {
        playGame('Paper');
    }
    
})
// in order for addeventlistener to work, you can't put an already made function there. you hvae to create a function. i.e a function to run a function .

function playGame(playerMove) {

    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'Scissors') {
        if (computerMove === 'rock'){
            result = 'You Lose';
        

        }else if (computerMove === 'Paper'){
            result = 'You Win';
        

        }else if (computerMove === 'Scissors'){
            result = 'Tie';
        }

    } else if (playerMove === 'Paper') {
        if (computerMove === 'rock'){
            result = 'You Win';
        

        }else if (computerMove === 'Paper'){
            result = 'Tie';
        

        }else if (computerMove === 'Scissors'){
            result = 'You Lose';
        }

    } else if (playerMove === 'rock') {

        if (computerMove === 'rock'){
            result = 'Tie';
        

        }else if (computerMove === 'Paper') {
            result = 'You Lose';


        }else if (computerMove === 'Scissors'){
            result = 'You Win';
        }

    }

    if (result === 'You Win') {
        score.wins += 1;
    }else if (result === 'You Lose') {
        score.losses += 1;
    }else if (result === 'Tie'){
        score.ties += 1
    }

    localStorage.setItem('score', JSON.stringify(score));


    updateScore();

    document.querySelector('.js-moves').innerHTML = `You: ${playerMove}.Computer: ${computerMove}.`;

    document.querySelector('.js-result').innerHTML = result;




}


function updateScore() {
    document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;

}


function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3 ) {
        computerMove = 'rock';
    } else if ( randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if ( randomNumber >= 2 / 3 && randomNumber < 3 / 3) {
        computerMove = 'Scissors';
    }

    return computerMove;
}