export { buildProgressBar, updateProgressBarNext, updateProgressBarSubmitted }

function buildProgressBar(quiz){

    // fetch container for progress bar
    var container = quiz.querySelector('.progress-container');

    // set quiz to be not completed
    container.completed = false;

    // fetch size of container
    var containerSize = container.offsetWidth;

    // variable to store the HTML output 
    var output = [];

    // create progress bar
    output.push(
        `<svg style="width: ${containerSize}px; height: ${containerSize}px; position: absolute; top: 0; left: 0;" data-value=0>
            <path class="pb-idle" style="stroke-dasharray: 0; stroke-dashoffset: 0;" d="
                M ${containerSize/2}, ${containerSize/2}
                m 0, -${0.9*containerSize/2}
                a ${0.9*containerSize/2},${0.9*containerSize/2} 0 1,1 0, ${0.9*containerSize}
                a ${0.9*containerSize/2},${0.9*containerSize/2} 0 1,1 0, ${-0.9*containerSize}"
            ></path>
            <path class="pb-meter" style="stroke-dasharray: 0; stroke-dashoffset: 0;" d="
                M ${containerSize/2}, ${containerSize/2}
                m 0, -${0.9*containerSize/2}
                a ${0.9*containerSize/2},${0.9*containerSize/2} 0 1,1 0, ${0.9*containerSize}
                a ${0.9*containerSize/2},${0.9*containerSize/2} 0 1,1 0, ${-0.9*containerSize}"
            ></path>
        </svg>
        <div class="pb-text-wrapper">
            <span class="pb-text">0</span>
            <span class="pb-text-percent">%</span>
        </div>`
    );

    // finally combine our output list into one string of HTML and put it on the page
    container.innerHTML = output.join('');

    // initialize progress bar
     initializeProgressBar(quiz)

}

function initializeProgressBar(quiz){

    const meters = quiz.querySelectorAll('.pb-meter');

    meters.forEach( (path) => {
      // Get the length of the path
      let length = path.getTotalLength();
    
      // console.log(length) and hardcode the value for both stroke-dasharray & stroke-dashoffest styles
      // If unable to hardcode, set dynamically...
      path.style.strokeDashoffset = length;
      path.style.strokeDasharray = length;
    
      // Get the value of the meter
      let value = parseInt(path.parentNode.getAttribute('data-value'));
      // Calculate the percentage of the total length
      let to = length * ((100 - value) / 100);
    
      // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
      path.getBoundingClientRect();
      
      // Set the Offset
      path.style.strokeDashoffset = Math.max(0, to);  
    });

    // get text of progress bar
    const progText = quiz.querySelectorAll('.pb-text');

    progText.forEach( (text) => {

        // Set the value to the correct percentage
        text.textContent = "0";
        
      });
}

function updateProgressBarNext(n, nr_questions, quiz){

    // get progress bar container
    const container = quiz.querySelector('.progress-container');
    
    // if not completed, update progress bar
    if (container.completed == false) {

        // get progress meter element
        const meters = quiz.querySelectorAll('.pb-meter');

        meters.forEach( (path) => {
            // Get the length of the path
            let length = path.getTotalLength();
        
            // console.log(length) and hardcode the value for both stroke-dasharray & stroke-dashoffest styles
            // If unable to hardcode, set dynamically...
            path.style.strokeDashoffset = length;
            path.style.strokeDasharray = length;
        
            // Get the value of the meter
            let value = parseInt(n/(nr_questions+1)*100);

            // Calculate the percentage of the total length
            let to = length * ((100 - value) / 100);
        
            // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
            path.getBoundingClientRect();
            
            // Set the Offset
            path.style.strokeDashoffset = Math.max(0, to);  
        });

        // get text of progress bar
        const progText = quiz.querySelectorAll('.pb-text');

        progText.forEach( (text) => {
            // get current percentage
            let value = parseInt(n/(nr_questions+1)*100);
            // Set the value to the correct percentage
            text.textContent = String(value);
            
        });

    }
}


function updateProgressBarSubmitted(length, quiz){

    // get progress bar
    const container = quiz.querySelector('.progress-container');

    // set progress bar to be completed
    container.completed = true;

    // get progress meter
    const meters = quiz.querySelectorAll('.pb-meter');

    meters.forEach( (path) => {
        // Get the length of the path
        let length = path.getTotalLength();
      
        // console.log(length) and hardcode the value for both stroke-dasharray & stroke-dashoffest styles
        // If unable to hardcode, set dynamically...
        path.style.strokeDashoffset = length;
        path.style.strokeDasharray = length;
      
        // Get the value of the meter
        let value = parseInt(100);

        // Calculate the percentage of the total length
        let to = length * ((100 - value) / 100);
      
        // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
        path.getBoundingClientRect();
        
        // Set the Offset
        path.style.strokeDashoffset = Math.max(0, to);  
      });

      // get text of progress bar
      const progText = quiz.querySelectorAll('.pb-text');

      progText.forEach( (text) => {

        // Set the value to the correct percentage
        text.textContent = "100";
        
    });
}

