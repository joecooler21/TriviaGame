var trivia = [
    {
        question: "Known for its dark humor, sharp dialogue and non-linear narrative, this film lost 'Best Picture' to 'Forrest Gump' during the 1995 Academy Awards",

        answerList: ["The Shawshank Redemption", "Pulp Fiction", "Ed Wood", "Natural Born Killers"],
        correctAnswer: "answer2"
    },
    {
        question: "This 1978 horror classic has a group of survivors taking shelter in a shopping small during the zombie apocalypse",

        answerList: ["Return of the Living Dead", "Night of the Living Dead", "Dawn of the Dead", "Zombie"],
        correctAnswer: "answer3"
    },
    {
        question: "This 1992 dialogue-heavy film boasts an ensemble cast and the catch phrase 'Always Be Closing'",

        answerList: ["Reservoir Dogs", "Goodfellas", "Tombstone", "Glengarry Glen Ross"],
        correctAnswer: "answer4"
    },
    {
        question: "Billy Bob Thorton is almost unrecognizable in this 1996 rural drama",

        answerList: ["Sling Blade", "Fargo", "A Simple Plan", "The Apostle"],
        correctAnswer: "answer1"
    },

    {
        question: "This 1995 crime mystery took the film world by storm with it's brilliant twist ending and had everyone asking -- 'Who is Keyzer Soze?'",
        answerList: ["Unforgiven", "Mystic River", "Seven", "The Usual Suspects"],
        correctAnswer: "answer4"

    },
]

var currentQuestion = 0;
var timer = document.getElementById("timer");
var resetButton = document.querySelector("button");

var count = 5;
var score = 0;

hideResetButton();

timer.textContent = count;
var gameTimer = setGameTimer();

loadQuestion(trivia[currentQuestion]);

var optionList = document.getElementsByClassName("custom-control-input");

for (let i = 0; i < optionList.length; i++) {
    optionList[i].addEventListener('click', function () {

        if (optionList[i].id === trivia[currentQuestion].correctAnswer) {

            score++;
            currentQuestion++;
            clearInterval(gameTimer);
            showAnswer(true);

            setTimeout(function () {
                gameTimer = setGameTimer();
                loadQuestion(trivia[currentQuestion]);
                clearOptions();
                count = 5;
            }, 3000);

            return;

        } else {
            showAnswer(false);
            currentQuestion++;
            clearInterval(gameTimer);
            setTimeout(function () {
                loadQuestion(trivia[currentQuestion]);
                clearOptions();
                count = 5;
                gameTimer = setGameTimer();
            }, 3000);
        }

    });
}

function showResetButton() {

    resetButton.style.visibility = "visible";

    resetButton.addEventListener("click", function() {
        currentQuestion = 0;
        score = 0;
        count = 5;
        document.getElementById("score").textContent = "";
        gameTimer = setGameTimer();
        loadQuestion(trivia[currentQuestion]);
        
    });
}

function hideResetButton(){
    var resetButton = document.querySelector("button");
    resetButton.style.visibility = "hidden";
}
function loadQuestion(triviaObj) {

    hideResetButton();

    if (currentQuestion > (trivia.length - 1)) {
        clearInterval(gameTimer);
        timer.textContent = "Game Over";
        document.getElementById("score").textContent = "You answered " + score + " out of " + trivia.length + " correctly";
        showResetButton();
        return;
    }
    document.getElementById("question").textContent = triviaObj.question;
    var optionText = document.getElementsByClassName("custom-control-label");

    for (let i = 0; i < optionText.length; i++) {
        optionText[i].style.fontSize = "1rem";
        optionText[i].textContent = triviaObj.answerList[i];
    }
}

function clearOptions() {
    document.activeElement = null;
    for (let i = 0; i < optionList.length; i++) {
        optionList[i].checked = false;
    }
}

function setGameTimer() {
    clearInterval(gameTimer);

    var state = true;

    if (currentQuestion >= trivia.length) {
        return;
    }

    return (setInterval(function () {
        if (currentQuestion >= trivia.length) {
            state = false;
        }

        if (count === 0) {
            count = 5;
            currentQuestion++;
            if (currentQuestion >= trivia.length) {
                clearInterval(gameTimer);
                timer.textContent = "Game Over";
                document.getElementById(getCorrect(currentQuestion-1)).style.fontSize = "2rem";
                document.getElementById("score").textContent = "You answered " + score + " out of " + trivia.length + " correctly";
                showResetButton();
                return;
            }
            state = false;
            timer.textContent = "Time's Up!";
            document.getElementById(getCorrect(currentQuestion-1)).style.fontSize = "2rem";
            setTimeout(function () {
                loadQuestion(trivia[currentQuestion]);
                state = true;
            }, 3000);
        }
        if (state) {
            console.log(count);
            timer.textContent = count;
            count--;
        }
    }, 1000));
}

// show answer screen based on user choice
function showAnswer(answer) {
    clearInterval(gameTimer);

    if (answer) {
        timer.textContent = "Correct!";
    } else {
        timer.textContent = "Incorrect";
        //make the right answer font larger
        document.getElementById(getCorrect(currentQuestion)).style.fontSize = "2rem";
    }
}

//get id of current questions correct answer label
function getCorrect(index) {
    var id = document.getElementById(trivia[index].correctAnswer).id;

    if (id === "answer1")
        id = "option1";
    if (id === "answer2")
        id = "option2";
    if (id === "answer3")
        id = "option3";
    if (id === "answer4")
        id = "option4";

    return (id);
}