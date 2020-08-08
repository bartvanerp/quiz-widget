export { buildAnswers as default };


function buildAnswers(currentQuestion, questionNumber){

    if (currentQuestion.type == "multiple-choice"){
        return buildAnswersMC(currentQuestion, questionNumber)
    }
    else if (currentQuestion.type == "numerical"){
        return buildAnswerNum(currentQuestion, questionNumber)
    }
    
}

function buildAnswersMC(currentQuestion, questionNumber){

    // create object to store answers in 
    const answers = [];

    // loop through answers
    for (var letter in currentQuestion.answers) {
                
        // ... add an HTML radio button
        answers.push(
            `<label class="answer answer-mc">
                <span class="answer-text">${currentQuestion.answers[letter]}</span>
                <input type="radio" class="answer-button" name="question${questionNumber}" value="${letter}">
                <span class="checkmark"></span>
            </label>`
        );
    }

    // return answers
    return answers

}

function buildAnswerNum(currentQuestion, questionNumber){

    // create object to store answers in 
    const answers = [];

    // create form for answer
    answers.push(
        `<label class="answer">
            <input type="number" class="input-answer-numerical" name="question${questionNumber}" placeholder="submit your answer here">
        </label>`
    );

    // return answers
    return answers
}