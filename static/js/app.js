const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 14;

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let u_id = [];


// here i choose questions and put them in availableQuestions
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion;i++){
        availableQuestions.push(quiz[i]);
    }
}

function getNewQuestion(){
    // the question randomly is printed 
    questionNumber.innerHTML = "Ερώτηση " + (questionCounter + 1) + " από " + questionLimit;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    // if it has an image it appears
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }

    const optionLen = currentQuestion.options.length;
    for(let i=0; i<optionLen;i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.1;
    // here it continews draw questions 
    for(let i=0; i<optionLen; i++){
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's' ;
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++;
}

// thow function checks if the uesr's answers is correct and displays the correct or the wrong option
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers);
    }
    else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// here the user after he choosed an option cannot choose another
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

// here we create the indicator that displays all the time if the user was right or not
function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

// here i update the indicator after each question
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

//here when the user presses the button next it draw new question or ends the quiz
function next(){
    if(questionCounter===questionLimit){
        console.log("quiz over")
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

//when the quiz ends it displays the results
function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();

}

// here I calculate the results with the data from previous functions
// unfortunatelly i didn't manage to save these data to my database and after each quiz they disapear :(
function quizResult(){
    
    resultBox.querySelector(".total-question").innerHTML = questionLimit ;
    resultBox.querySelector(".total-attempt").innerHTML = attempt ;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers ;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / questionLimit)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
    
    
    
    
}

// when the user restarts the quiz I clear all the data to start again
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

// when the user wants to try again it draws again questions(so the questions aren't the same)
function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

//when the user wants to quit
function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
    window.location.href = "/";
}


// here is how the quiz starts with drawing questions 
function startQuiz(){
    
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();

}

// this is how the quiz at fist indicates the number of the question he will answer(this can be changed easilly from the value in line 8)
window.onload = function(){
   homeBox.querySelector(".total-question").innerHTML = questionLimit;}