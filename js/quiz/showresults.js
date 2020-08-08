export { showResults as default };

import { updateProgressBarSubmitted } from "./progressbar.js"
import { StartConfetti, DeactivateConfetti } from "../utils/confetti.js"

function showResults(questions, options){

    // get some elements
    const questionsContainer = document.getElementById('questions');
    const resultsContainer = document.getElementById('results');

    // set quizcontainer to be submitted
    document.getElementById('quizContainer').submitted = true;

    // lock buttons
    const buttons = questionsContainer.querySelectorAll('.answer-button');
    buttons.forEach( ( currentButton ) => {
        currentButton.disabled = true;
    });
    const forms = questionsContainer.querySelectorAll('.input-answer-numerical');
    forms.forEach( ( currentForm ) => {
        currentForm.disabled = true;
    });

    // change submit button
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").style.backgroundColor = "lightgrey";


    // gather answer containers from our quiz
    const answerContainers = questionsContainer.querySelectorAll('.answers');

    // keep track of obtained and available points
    let numPointsObtained = 0;
    let numPointsAvailable = 0;

    // for each question
    questions.forEach( (currentQuestion, questionNumber) => {

        // add to the number of available points
        numPointsAvailable += ((typeof currentQuestion.points === "undefined") ? 1 : currentQuestion.points);
        
        // multiple choice
        if (currentQuestion.type == "multiple-choice"){

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer == currentQuestion.correctAnswer){
            
                // add to the number of correct answers
                numPointsObtained += ((typeof currentQuestion.points === "undefined") ? 1 : currentQuestion.points);

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
        }

        // numerical
        else if (currentQuestion.type == "numerical"){

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (Math.abs(parseFloat(userAnswer)-parseFloat(currentQuestion.correctAnswer)) < currentQuestion.tolerance){
            
                // add to the number of correct answers
                numPointsObtained += ((typeof currentQuestion.points === "undefined") ? 1 : currentQuestion.points);

                // color the answer green
                answerContainer.querySelectorAll("input.input-answer-numerical")[0].style.border = "2px solid rgb(40, 240, 100)";

            }
            // else if the answer is wrong or blank
            else{

                // color the answer button red if the answer is wrong
                if (userAnswer.length != 0){
                    answerContainer.querySelectorAll("input.input-answer-numerical")[0].style.border = "2px solid rgb(235, 45, 57)";
                }
                // color all answers orange if no answer is submitted
                else{
                    answerContainer.querySelectorAll("input.input-answer-numerical")[0].style.border = "2px solid rgb(230, 140, 30)";
                }

                // color the correct answer green
                //if (options.showCorrectAnswer == true){
                //    answerContainer.querySelectorAll("span.checkmark")[currentQuestion.correctAnswer-1].style.backgroundColor = "rgb(40, 240, 100)";
                //}
                
            }

        }

    });


    // show the number of correct answers out of the total number of questions
    resultsContainer.innerHTML = `${numPointsObtained} out of ${numPointsAvailable} points obtained`;

    // fill progress bar
    updateProgressBarSubmitted(questions.length)

    // if 100% correct, CONFETTI
    if (options.confetti){
        if (numPointsObtained === numPointsAvailable){
            StartConfetti();
            setTimeout(function(){
                DeactivateConfetti();
            }, 1500);    
        }
    }
}