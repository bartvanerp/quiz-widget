export { showResults as default };

import { updateProgressBarSubmitted } from "./progressbar.js"
import { StartConfetti, DeactivateConfetti } from "../utils/confetti.js"

function showResults(questions, options){

    // get some elements
    const questionsContainer = document.getElementById('questions');
    const resultsContainer = document.getElementById('results');

    // lock buttons
    const buttons = questionsContainer.querySelectorAll('.answer-button');
    buttons.forEach( ( currentButton ) => {
        currentButton.disabled = true;
    });


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
        if (userAnswer == currentQuestion.correctAnswer){
        
            // add to the number of correct answers
            numCorrect++

            // color the answer green
            answerContainer.querySelectorAll("span.checkmark")[userAnswer-1].style.backgroundColor = "rgb(40, 240, 100)";

        }
        // else if the answer is wrong or blank
        else{

            // color the answer button red if the answer is wrong
            if (typeof(answerContainer.querySelectorAll("span.checkmark")[userAnswer-1]) !== "undefined"){
                answerContainer.querySelectorAll("span.checkmark")[userAnswer-1].style.backgroundColor = "rgb(235, 45, 57)";
            }
            // color all answers orange if no answer is submitted
            else{
                answerContainer.querySelectorAll("span.checkmark").forEach(checkmark => {
                    checkmark.style.backgroundColor = "rgb(230, 140, 30)";
                });
            }

            // color the correct answer green
            if (options.showCorrectAnswer == true){
                answerContainer.querySelectorAll("span.checkmark")[currentQuestion.correctAnswer-1].style.backgroundColor = "rgb(40, 240, 100)";
            }
            
        }

    });

    // show the number of correct answers out of the total number of questions
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;

    // fill progress bar
    updateProgressBarSubmitted(questions.length)

    // if 100% correct, CONFETTI
    if (options.confetti){
        if (numCorrect === questions.length){
            StartConfetti();
            setTimeout(function(){
                DeactivateConfetti();
            }, 1500);    
        }
    }
}