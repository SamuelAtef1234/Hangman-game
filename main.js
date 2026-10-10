const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

// Create Letters Container
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

// Object Of Words / Categories
const words = {
    programming: ["php", "C", "Python", "go", "javascript", "r", "mysql"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Alex", "Samuel", "Gandhi"],
    countries: ["America", "England", "France", "Spain", "Egypt"],
};

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depending On Word
lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");
    if (letter === ' ') {
        span.className = "with-space";
    }
    letterGuessContainer.appendChild(span);
});

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
let guessSpans = document.querySelectorAll(".letters-guess span");
let numberOfGuess = 0;

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = wordLetter;
                        numberOfGuess++;
                    }
                });
            }
        });

        // If Letter Is Correct
        if (theStatus) {
            document.getElementById("succes").play();
            if(numberOfGuess === randomValueValue.length){
                if(wrongAttempts === 0)
                    checkWin("Very Good you are profisional");
                else if(wrongAttempts <= 4)
                    checkWin("Good jop");
                else if(wrongAttempts <= 7)
                    checkWin("Nice but Train to be better in the next time");
            }
        } 
        // If Letter Is Wrong
        else {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            
            if (wrongAttempts === 8) {
                endGame("Game Over, The Word Is ");
                lettersContainer.classList.add("finished");
            }
        }
    }
});

function endGame(message) {
    let div = document.createElement("div");
    let divText = document.createTextNode(`${message} "${randomValueValue}"`);
    div.appendChild(divText);
    div.className = "popup";
    document.body.appendChild(div);
}

function checkWin(message){
    let div = document.createElement("div");
    let divText = document.createTextNode(message);
    div.appendChild(divText);
    div.className = "win";
    document.body.appendChild(div);
}