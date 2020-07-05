export { updateProgressBarNext, updateProgressBarSubmitted };


function updateProgressBarNext(n, length){

    // get progress bar
    const progressBar = document.getElementById("progressbar");

    // if quiz has not been submitted yet...
    if (progressBar.submitted !== true){
        
        // set aria value of progress meter
        progressBar.setAttribute("aria-valuenow", n.toString(2));

        // set new width of progress meter
        progressBar.style.width = (n/(length+1)*100).toString()+"%";

        // set percentage complete of progress meter
        progressBar.getElementsByClassName("progress-percentage")[0].textContent = Math.round(n/(length+1)*100).toString()+"% complete"

    }

}


function updateProgressBarSubmitted(length){

    // get progress bar
    const progressBar = document.getElementById("progressbar");

    // update percentage
    progressBar.getElementsByClassName("progress-percentage")[0].textContent = "100% complete"

    // completely fill progress bar
    progressBar.style.width = "100%";

    // set attribute to submitted
    progressBar.submitted = true;
}