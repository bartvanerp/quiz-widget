export { buildQuiz as default };

import shuffle from "/js/utils/shuffle.js"

function buildQuiz(questions, options){

    // variable to store the HTML output 
    const output = [];

    // initialize questions element
    output.push(
        `<div id="questions" class="questions">`
    );

    // shuffle array if desired
    if (options.shuffleQuestions === true){
        var myQuestions = shuffle(questions);
    }
    else{
        var myQuestions = questions;
    }

    // for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for (var letter in currentQuestion.answers) {
                
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
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    // end questions element
    output.push(
        `</div>`
    );

    // append navigation buttons
    output.push(
        `<button id="previous">Previous question</button>
        <button id="next">Next Question</button>`
    );

    // append submission button
    output.push(
        `<button id="submit">Submit Quiz</button>`
    );

    // append results section
    output.push(
        `<div id="results"></div>`
    );

    // append progress bar
    output.push(
        `<div class="progress">
            <div id="progressbar" class="progress-bar progress-bar-striped progress-bar" submitted=false role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax=${myQuestions.length} style="width: 0%">
                <span class="progress-percentage">0% complete</span>
            </div>
        </div>`
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('')

    // return (shuffled) questions
    return myQuestions

}