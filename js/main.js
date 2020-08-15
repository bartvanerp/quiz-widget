// import functions
import buildQuiz from "../js/quiz/buildquiz.js"
import showResults from "../js/quiz/showresults.js"
import parseQuiz from "../js/quiz/parsequiz.js"
import { showSlide, showNextSlide, showPreviousSlide } from "../js/quiz/pagination.js"
import { buildProgressBar } from "./quiz/progressbar.js"

// fetch quizes on the page
var quizes = document.getElementsByClassName("quiz-container")

// loop through quizes on the page
for (let currentQuiz of quizes) {

    // create path to quiz file
    const quizPath = "./quizcontent/"+currentQuiz.getAttribute("file")

    // parse questions and build quiz
    requirejs([quizPath], function(){
    
        // parse questions
        var currentOptions = options
        var currentQuestions = parseQuiz(questions, options)
    
        // build quiz
        buildQuiz(currentQuestions, currentOptions, currentQuiz);
        buildProgressBar(currentQuiz);
    
        // set and show current slide
        showSlide(1, currentQuiz)
        
        // convert to LaTeX
        MathJax.typeset()
    
        // fetch submit button element
        const submitButton = currentQuiz.querySelector('.button-submit');
        const nextButton = currentQuiz.querySelector('.button-next');
        const previousButton = currentQuiz.querySelector('.button-previous');
    
        // add event listener for button to display results 
        submitButton.addEventListener('click', function(){showResults(currentQuestions, currentOptions, currentQuiz)});
        nextButton.addEventListener('click', function(){showNextSlide(currentQuiz)});
        previousButton.addEventListener('click', function(){showPreviousSlide(currentQuiz)});

    });
}



// fetch path of quiz and load questions and options
// const quizPath = "./quizcontent/"+document.getElementById('quizContainer').getAttribute("file")
// requirejs([quizPath], function(){

//     // parse questions
//     questions = parseQuiz(questions, options)

//     // build quiz
//     buildQuiz(questions, options);
//     buildProgressBar();

//     // set and show current slide
//     showSlide(currentSlide)
    
//     // convert to LaTeX
//     MathJax.typeset()

//     // fetch submit button element
//     const submitButton = document.getElementById('submit');
//     const nextButton = document.getElementById('next');
//     const previousButton = document.getElementById('previous');

//     // add event listener for button to display results 
//     submitButton.addEventListener('click', function(){showResults(questions, options)});
//     nextButton.addEventListener('click', showNextSlide);
//     previousButton.addEventListener('click', showPreviousSlide);



// });