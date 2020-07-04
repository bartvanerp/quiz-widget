export { showResults as default };

import { updateProgressBarSubmitted  } from "/js/quiz/progressbar.js"

function showResults(questions){

    // get some elements
    const questionsContainer = document.getElementById('questions');
    const resultsContainer = document.getElementById('results');

    // gather answer containers from our quiz
    const answerContainers = questionsContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question
    questions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer){
        
            // add to the number of correct answers
            numCorrect++

            // color the answer green
            answerContainers[questionNumber].style.color = 'lightgreen';

        }
        // else if the answer is wrong or blank
        else{

            // color the answer red
            answerContainers[questionNumber].style.color = 'red';
            
        }

    });

    // show the number of correct answers out of the total number of questions
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;

    // fill progress bar
    updateProgressBarSubmitted(questions.length)


}