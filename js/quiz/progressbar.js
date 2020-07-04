export { updateProgressBarNext, updateProgressBarSubmitted };


function updateProgressBarNext(n, length){

    // get progress bar
    const progressBar = document.getElementById("progressbar");

    // if quiz has not been submitted yet...
    if (progressBar.submitted !== true){
        
        // set progress meter
        progressBar.setAttribute("aria-valuenow", n.toString());
        progressBar.style.width = (n/(length+1)*100).toString()+"%";

    }

}


function updateProgressBarSubmitted(length){

    // get progress bar
    const progressBar = document.getElementById("progressbar");

    // completely fill progress bar
    progressBar.style.width = "100%";

    // set attribute to submitted
    progressBar.submitted = true;
}