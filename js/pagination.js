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

    // if on the first page, do not show previous button
    if (currentSlide === 0){

        previousButton.style.display = "none";

    }
    else{

        previousButton.style.display = "inline-block";

    }

    // if on the last page, do not show the next button, but show the submit button
    if (currentSlide === slides.length-1){

        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";

    }
    else{

        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";

    }

}


function showNextSlide(){

    // show next slide
    showSlide(currentSlide + 1);

}

function showPreviousSlide(){

    // show previous slide
    showSlide(currentSlide - 1);

}
