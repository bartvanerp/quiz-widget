function buildQuiz(){
    
    // variable to store the HTML output 
    const output = [];

    // initialize questions element
    output.push(
        `<div id="questions">`
    );

    // for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for(letter in currentQuestion.answers){
                
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

    // end questions element
    output.push(
        `</div>`
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
