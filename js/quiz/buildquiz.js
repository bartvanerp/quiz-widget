export { buildQuiz as default };

import shuffle from "../utils/shuffle.js"
import buildAnswers from "../quiz/buildanswers.js"

function buildQuiz(questions, options){

    // variable to store the HTML output 
    const output = [];

    // initialize questions element
    output.push(
        `<div id="questions" class="questions">`
    );

    // for each question
    questions.forEach(
        (currentQuestion, questionNumber) => {

            // and for each available answer...
            const answers = buildAnswers(currentQuestion, questionNumber)

            // get number of points of the question
            let numPoints = ((typeof currentQuestion.points === "undefined" || currentQuestion.points === 1) ? "1 pt" : currentQuestion.points+" pts");

            // add this question and its answer to the output
            output.push(
                `<div class="slide">
                    <div class="question-nr"> <span> Question ${questionNumber+1} </span> <span class="question-nr-pts"> ${numPoints} </span> </div>
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="border-gradient"></div>
                    <div class="answers"> ${answers.join('')} </div>
                    <div class="solution"></div>
                </div>`
            );
        }
    );

    // append results section
    output.push(
        `<div id="results"></div>`
    );

    // end questions element
    output.push(
        `</div>`
    );

    // wrapper for buttons and progressbar
    output.push(`<div class="bottom-wrapper">`);

    // append navigation and submission buttons
    output.push(
        `<div class="buttons-wrapper">
        <button id="previous" class="button button-previous"><svg class="button-icon"><use xlink:href="svg/angle-left.svg#example"></use></svg> previous </button>
        <button id="next" class="button button-next"> next <svg class="button-icon"><use xlink:href="svg/angle-right.svg#example"></use></svg></button>
        <button id="submit" class="button button-submit"> submit </button></div>`
    );

    // append progress bar
    output.push(
        `<div class="progress-container"></div>`
    );

    // end wrapper
    output.push(`</div>`);

    // append confetti block
    output.push(
        `<canvas id="confettiCanvas"></canvas>`
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('')

}