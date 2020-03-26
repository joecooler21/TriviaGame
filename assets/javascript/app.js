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
]


var currentQuestion = 0;
var timer = document.getElementById("timer");

var count = 10;
var score = 0;

var gameTimer = setGameTimer();



loadQuestion(trivia[currentQuestion]);

var optionList = document.getElementsByClassName("custom-control-input");

for (let i = 0; i < optionList.length; i++) {
    optionList[i].addEventListener('click', function () {

        if (optionList[i].id === trivia[currentQuestion].correctAnswer) {
            showAnswer(true);
            score++;
            currentQuestion++;
            clearInterval(gameTimer);


            setTimeout(function () {


                gameTimer = setGameTimer();
                loadQuestion(trivia[currentQuestion]);
                clearOptions();
                count = 10;



            }, 3000);


            return;

        } else {
            showAnswer(false);
            currentQuestion++;
            clearInterval(gameTimer);
            setTimeout(function () {
                loadQuestion(trivia[currentQuestion]);
                clearOptions();
                count = 10;
                gameTimer = setGameTimer();
            }, 3000);



        }

    });
}

function loadQuestion(triviaObj) {

    if (currentQuestion > (trivia.length - 1)) {
        clearInterval(gameTimer);
        timer.textContent = "Game Over";
        document.getElementById("score").textContent = "You answered " + score + " out of " + trivia.length + " correctly";
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
    return (setInterval(function () {
        if (count === 0)
            count = 10;
        timer.textContent = count;
        count--;
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
        document.getElementById(getCorrect()).style.fontSize = "2rem";
    }


}

//get id of current questions correct answer label
function getCorrect() {
    var id = document.getElementById(trivia[currentQuestion].correctAnswer).id;

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