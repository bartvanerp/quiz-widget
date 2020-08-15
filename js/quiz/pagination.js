export { showSlide, showNextSlide, showPreviousSlide };

import { updateProgressBarNext } from "./progressbar.js"

function showSlide(n, quiz){

    // variables  
    var previousButton = quiz.querySelector(".button-previous");
    var nextButton = quiz.querySelector(".button-next");
    var submitButton = quiz.querySelector(".button-submit");
    var slides = quiz.querySelectorAll(".slide");

    // hide current slide
    if (quiz.querySelector(".active-slide") != null) {
        quiz.querySelector(".active-slide").classList.remove('active-slide');
    }
    
    //show new slide 
    slides[n-1].classList.add('active-slide');

    // update current slide number
    var currentSlide = n-1;

    // if on the first page, disable previous button
    if (currentSlide === 0){

        previousButton.disabled = true;
        previousButton.style.backgroundColor = "lightgrey";

    }
    else{

        previousButton.disabled = false;
        previousButton.style.backgroundColor = "rgb(15, 160, 206)";

    }

    // if on the last page, do not show the next button, but show the submit button
    if (currentSlide === slides.length-1){

        nextButton.style.backgroundColor = "lightgrey";
        nextButton.disabled = true;
        if (quiz.submitted == true){
            submitButton.disabled = true;
            submitButton.style.backgroundColor = "lightgrey";
        }
        else {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "rgb(15, 160, 206)";
        }

    }
    else{

        nextButton.style.backgroundColor = "rgb(15, 160, 206)";
        nextButton.disabled = false;
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "lightgrey";

    }

    // update progress bar
    updateProgressBarNext(n, slides.length-1, quiz)
    
}


function showNextSlide(quiz){

    // get current slide
    var currentSlide = quiz.querySelector(".active-slide").getAttribute("nr");

    // show next slide
    showSlide(parseInt(currentSlide) + 1, quiz);

}


function showPreviousSlide(quiz){

    // get current slide
    var currentSlide = quiz.querySelector(".active-slide").getAttribute("nr");

    // show previous slide
    showSlide(parseInt(currentSlide) - 1, quiz);

}
