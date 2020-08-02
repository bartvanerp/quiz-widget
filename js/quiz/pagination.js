export { showSlide, showNextSlide, showPreviousSlide, currentSlide };

import { updateProgressBarNext } from "./progressbar.js"

// variables
let currentSlide = 0;


function showSlide(n){

    // variables  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const slides = document.querySelectorAll(".slide");

    // hide current slide
    slides[currentSlide].classList.remove('active-slide');

    //show new slide 
    slides[n].classList.add('active-slide');

    // update current slide number
    currentSlide = n;

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
        if (document.getElementById('quizContainer').submitted == true){
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
    updateProgressBarNext(n+1, slides.length-1)
    
}


function showNextSlide(){

    // show next slide
    showSlide(currentSlide + 1);

}


function showPreviousSlide(){

    // show previous slide
    showSlide(currentSlide - 1);

}
