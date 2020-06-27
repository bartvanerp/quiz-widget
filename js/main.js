function buildQuiz(){
    
    // variable to store the HTML output 
    const output = [];

    // initialize quiz element
    output.push(
        `<div id="questions"></div>`
    );

    // for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for(letter in currentQuestion.answer){
                
                // ... add an HTML radio button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // add this question and its answer to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // append button
    output.push(
        `<button id="submit">Submit Quiz</button>`
    );

    // append results section
    output.push(
        `<div id="results"></div>`
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('')
}

function showResults(){}



// load quiz
requirejs([quizContainer.getAttribute('file')], function(insertquiz) {

    // build quiz
    buildQuiz();

    // variables
    const questionsContainer = document.getElementById('questions');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // add event listener for button    
    submitButton.addEventListener('click', showResults);

});
