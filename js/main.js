// load quiz
requirejs(["js/buildquiz.js", "js/showresults.js", quizContainer.getAttribute('file')], function(insertQuiz) {

    // build quiz
    buildQuiz();

    // fetch submit button element
    const submitButton = document.getElementById('submit');

    // add event listener for button to display results 
    submitButton.addEventListener('click', showResults);

});
