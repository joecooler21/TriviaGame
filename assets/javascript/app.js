var trivia = [
    {
        question: "Known for its dark humor, sharp dialogue and non-linear narrative, this film lost 'Best Picture' to 'Forrest Gump' during the 1995 Academy Awards",

        answerList: ["The Shawshank Redemption", "Pulp Fiction", "Ed Wood", "Natural Born Killers"],
        correctAnswer: "answer2"
    },
    {
        question: "This 1978 horror classic has a group of survivors taking shelter in a shopping small during the zombie apocalypse",

        answerList:["Return of the Living Dead", "Night of the Living Dead", "Dawn of the Dead", "Zombie"],
        correctAnswer: "answer3"
    },
    {
        question: "This 1992 dialogue-heavy film boasts an ensemble cast and the catchphrase 'Always Be Closing'",

        answerList:["Reservoir Dogs", "Goodfellas", "Tombstone", "Glengarry Glen Ross"],
        correctAnswer: "answer4"
    },
    {
        question: "Question 4",

        answerList:["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    },
]

var timer = document.getElementById("timer");

var count = 10;
var score = 0;

setInterval(function(){
    if (count === 0)
    count = 10;
    timer.textContent = count;
    count--;
}, 1000);

var currentQuestion = 0;

loadQuestion(trivia[currentQuestion]);

var optionList = document.getElementsByClassName("custom-control-input");

for (let i = 0; i < optionList.length; i++){
    optionList[i].addEventListener('click', function () {
        if (optionList[i].id === trivia[currentQuestion].correctAnswer) {
            
            setTimeout(function(){
                score++;
                document.getElementById("score").textContent = "Score: " + score;
                currentQuestion++;
                loadQuestion(trivia[currentQuestion]);
                document.activeElement = null;
                clearOptions();
                

            }, 3000);
            return;
        }

    });
}

function loadQuestion(triviaObj) {
    document.getElementById("question").textContent = triviaObj.question;
    var optionText = document.getElementsByClassName("custom-control-label");
    for (let i = 0; i < optionText.length; i++) {
        optionText[i].textContent = triviaObj.answerList[i];
    }
}

function clearOptions() {
    for (let i = 0; i < optionList.length; i++)
    {
        optionList[i].checked = false;
    }
}