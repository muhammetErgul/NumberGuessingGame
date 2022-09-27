window.onload = () => {
    const highScoreP = document.getElementById('highScore');
    const currentScoreP = document.getElementById('currentScore');
    const feedbackP = document.getElementById('feedback');
    const historyP = document.getElementById('history');
    const timeP = document.getElementById('time');

    const guessInput = document.getElementById('guess');
    const guessBtn = document.getElementById('guessBtn')
    const resetBtn = document.getElementById('resetBtn');

    const easyBtn = document.getElementById('easyBtn');
    const normalBtn = document.getElementById('normalBtn');
    const hardBtn = document.getElementById('hardBtn');

    let playing = false;
    let history = [];
    let seconds = 0, minutes = 0, hour = 0;
    let noOfGuessed = 0;
    let bestScore = 0;
    let randomNumber;

    easyBtn.addEventListener('click',easyMod);
    normalBtn.addEventListener('click',normalMod);
    hardBtn.addEventListener('click',hardMod);

    guessBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    
    function easyMod(){
        normalBtn.disabled = true;
        hardBtn.disabled = true;
        feedbackP.textContent = 'Guess a whole number between 1 and 10'
        randomNumber = Math.floor(Math.random()*10) + 1;
        startGame()
    }
    function normalMod(){
        easyBtn.disabled = true;
        hardBtn.disabled = true;
        feedbackP.textContent = 'Guess a whole number between 1 and 100'
        randomNumber = Math.floor(Math.random()*100) + 1;
        startGame()
    }

    function hardMod(){
        easyBtn.disabled = true;
        normalBtn.disabled = true;
        feedbackP.textContent = 'Guess a whole number between 1 and 1000'
        randomNumber = Math.floor(Math.random()*1000) + 1;
        startGame()
    }
    
    function startGame() {
        playing = true;
        guessBtn.innerText = 'Guess';
        guessInput.disabled = false;

        guessBtn.removeEventListener('click', startGame);
        guessBtn.addEventListener('click', guess);

        const duration = setInterval(clock, 1000);

        function clock() {
            if (playing) {
                seconds++;
                if (seconds > 59) {
                    seconds = 0;
                    minutes++;
                } else if (minutes > 59) {
                    seconds = 0;
                    minutes = 0;
                    hour++;
                } else if (hour > 24 || !playing) {
                    clearInterval(duration);
                }
                let currentTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                timeP.innerHTML = currentTime;
            }
        }
    }
    const guess = () => {
        if (playing) {
            giveFeedBack(guessInput.value);
        }
    }

    const giveFeedBack = (guess) => {
        if (checkInputType(parseInt(guess))) {
            if (history.includes(guess)) {
                historyP.innerHTML = `you already guessed <span>${guess}</span>`;
            } else {
                history.push(guess);
                historyP.innerHTML = history.join(',');
                checkGuessedCorrectOrWrong(guess)
            }
        } else {
            feedbackP.textContent = 'You are not playing right';
        }
        guessInput.value = '';
        guessInput.focus();
    }

    const checkInputType = (guess) => {
        if (guess < 1 || guess > 100 || isNaN(guess)) {
            return false;
        } else {
            return true;
        }
    }

    const checkGuessedCorrectOrWrong = (guessed) => {
        noOfGuessed++;
        currentScoreP.innerHTML = noOfGuessed;
        if (guessed > randomNumber) {
            feedbackP.textContent = 'Your guessed is to high';
        } else if (guessed < randomNumber) {
            feedbackP.textContent = 'Your guessed is to low';
        } else {
            playing = false;
            feedbackP.textContent = `CONGRATS! ${guessed} is the correct number.`;

            if (bestScore) {
                bestScore = bestScore > noOfGuessed ? noOfGuessed : bestScore;
            } else {
                bestScore = noOfGuessed;
            }
            highScoreP.innerHTML = bestScore;
        }
    }

    function resetGame() {
        playing = false;
        guessBtn.addEventListener('click', startGame);
        guessBtn.removeEventListener('click', guess);
       
        guessInput.disabled = true;
        feedbackP.textContent = "Guess a whole number between 1 and 100";
        historyP.textContent = "-";
        timeP.textContent = "00:00:00";
        seconds = 0;
        minutes = 0;
        hour = 0;
        noOfGuessed = 0;
        currentScoreP.textContent = noOfGuessed;
        history = [];
    }
}
