document.addEventListener('DOMContentLoaded', function() {
    let guessesAttempts = 1;
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let isRight = false;

    console.log(randomNumber);

    var hiddenContent = document.querySelector('.hidden_content');

    var tipTextLow = 'Last guess was too low!';
    var tipTextHigh = 'Last guess was too high!';
    var tipTextHolder = document.querySelector('.guess-tip_text');

    var alertWrongText = 'Wrong!';
    var alertRightText = 'Congratulations! You got it right!';   
    var alertTextHolder = document.querySelector('.alert_text');

    let previousGuesses = '';
    var previousGuessesHolder = document.querySelector('.previous-guesses');

    var submitButton = document.querySelector('.submit_button');
    var restartGameButton = document.querySelector('.restart-game_btn');

    var form = document.querySelector('.guess-input_wrapper');
    var input = document.querySelector('.guess_input');
    let inputValue;       

    form.addEventListener('submit', function(evt) {
        evt.preventDefault(); 
        inputValue = input.value;          

        if(inputValue === undefined || inputValue === '') {
            return;
        } 
        
        hiddenContent.classList.remove('hide');
        
        isRight = inputValue === randomNumber;

        previousGuesses = previousGuesses + inputValue + ' ';    
        previousGuessesHolder.textContent = previousGuesses;   

        if(isRight) {             
            hiddenContent.classList.remove('error');           
            hiddenContent.classList.add('guessed');  
            alertTextHolder.textContent = alertRightText;   
            submitButton.disabled = true;
            input.readOnly = true;      
        } else {
            if(guessesAttempts > 9) {
                hiddenContent.classList.add('gameover');
                alertTextHolder.textContent = 'Game Over!';
                submitButton.disabled = true;
                input.readOnly = true;
             } else {                         
                guessesAttempts ++;
                
                input.focus();            

                if(isRight) {             
                    hiddenContent.classList.remove('error');           
                    hiddenContent.classList.add('guessed');  
                    alertTextHolder.textContent = alertRightText;   
                    submitButton.disabled = true;
                    input.readOnly = true;      
                } else {
                    hiddenContent.classList.add('error');
                    alertTextHolder.textContent = alertWrongText;
                    
                    if(inputValue < randomNumber) {
                        tipTextHolder.textContent = tipTextLow;
                    } else {
                        tipTextHolder.textContent = tipTextHigh;
                    }
                }           
             }
        }  
        
        inputValue = '';
        input.value = '';
    });

    function restartGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        inputValue = '';
        isRight = false;
        previousGuesses = '';
        guessesAttempts = 1;
        hiddenContent.classList.remove('gameover');
        hiddenContent.classList.remove('guessed');
        hiddenContent.classList.remove('error');
        hiddenContent.classList.add('hide');
        submitButton.disabled = false;
        input.readOnly = false;
        console.log(randomNumber);
        input.focus(); 
    }

    restartGameButton.addEventListener('click', restartGame);
    
})