// load quiz
requirejs(["js/buildquiz.js", "js/pagination.js", "js/showresults.js", quizContainer.getAttribute('file')], function(insertQuiz) {

    // build quiz
    buildQuiz();

    // set and show current slide
    showSlide(currentSlide)

    // fetch submit button element
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    // add event listener for button to display results 
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener('click', showNextSlide);
    previousButton.addEventListener('click', showPreviousSlide);
    
});
