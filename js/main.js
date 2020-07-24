// import functions
import buildQuiz from "../js/quiz/buildquiz.js"
import showResults from "../js/quiz/showresults.js"
import parseQuiz from "../js/quiz/parsequiz.js"
import { showSlide, showNextSlide, showPreviousSlide, currentSlide } from "../js/quiz/pagination.js"
import { buildProgressBar } from "./quiz/progressbar.js"

    
// fetch path of quiz and load questions and options
const quizPath = "./quizcontent/"+document.getElementById('quizContainer').getAttribute("file")
requirejs([quizPath], function(){

    // parse questions
    questions = parseQuiz(questions, options)

    // build quiz
    buildQuiz(questions, options);
    buildProgressBar();

    // set and show current slide
    showSlide(currentSlide)
    
    // convert to LaTeX
    MathJax.typeset()

    // fetch submit button element
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    // add event listener for button to display results 
    submitButton.addEventListener('click', function(){showResults(questions, options)});
    nextButton.addEventListener('click', showNextSlide);
    previousButton.addEventListener('click', showPreviousSlide);



});