// import functions
import buildQuiz from "./quiz/buildquiz.js"
import showResults from "./quiz/showresults.js"
import parseQuiz from "./quiz/parsequiz.js"
import { showSlide, showNextSlide, showPreviousSlide, currentSlide } from "./quiz/pagination.js"
    
// fetch path of quiz and load questions and options
const quizPath = "../quizcontent/"+document.getElementById('quizContainer').getAttribute("file")
requirejs([quizPath], function(){

    // parse questions
    questions = parseQuiz(questions)

    // build quiz
    var implemented_questions = buildQuiz(questions, options);

    // set and show current slide
    showSlide(currentSlide)
    
    // convert to LaTeX
    MathJax.typeset()

    // fetch submit button element
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    // add event listener for button to display results 
    submitButton.addEventListener('click', function(){showResults(implemented_questions)});
    nextButton.addEventListener('click', showNextSlide);
    previousButton.addEventListener('click', showPreviousSlide);

});