let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById('container');
let nextBtn = document.getElementById('next-button');
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById('display-container');
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById('restart');
let userScore = document.getElementById('user-score');
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById('start-button');
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [{
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "German", "English"],
    correct: "Mandarin",
},{
    id: "1",
    question: "What is the most used programming language in the repositories of github?",
    options: ["Java", "Python", "HTML", "Javascript"],
    correct: "Javascript",
},{
    id: "2",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
}];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;
    // if last question
    if(questionCount == quizArray.length){
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
    } else{
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}));

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML= `${count}s`;
        if(count == 0){
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
}

function quizCreator(){
    // Random Sort Question
    quizArray.sort(() =>  Math.random() - 0.5);
    for(let i of quizArray){
        // Random Sort Options
        i.options.sort(() => Math.random() - 0.5);
        // Create card Quiz
        let div = document.createElement('div');
        div.classList.add("container-mid", "hide");
        // Question Number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        // Question
        let question_DIV = document.createElement('p');
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // Options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Verify if option is correct or not
function checker(userOption){
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if(userSolution === quizArray[questionCount].correct){
        userOption.classList.add("correct");
        scoreCount++;
    }else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if(element.innerHTML  == quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        })
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial setup / variables
function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
})

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};