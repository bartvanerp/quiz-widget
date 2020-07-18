export { parseQuiz as default}

import searchAll from "../utils/searchall.js"
import shuffle from "../utils/shuffle.js"
import replaceAll from "../utils/replaceall.js"
import randomPermutation from "../utils/randompermutation.js"

// This function parses the quiz questions according to the specified options.
function parseQuiz(questions, options){

    // select questions
    questions = selectQuestions(questions, options)

    // shuffle questions
    questions = shuffleQuestions(questions, options)

    // shuffle answers
    questions = shuffleAnswers(questions, options)

    // parse variables into questions and answers
    questions = parseVariables(questions)

    // parse inline LaTeX ( convert $...$ delimiters to \(...\) )
    questions = parseLaTeX(questions)

    // return parsed questions
    return questions

}


// This function randomly selects all/a subset of the provided questions.
function selectQuestions(questions, options){

    // if all questions should be in the quiz...
    if (options.select === "all") {

        // return all questions
        return questions

    }
    // if a specific number of questions should be in the quiz...
    else if (typeof(options.select) === "number") {

        // check if desired number is actually valid
        if (options.select <= questions.length) {

            // return {selection} questions
            var selection = randomPermutation(questions.length).slice(0,options.select).sort();
            return selection.map(i => questions[i])
            
        }
        else {

            // give warning
            console.log("WARNING: Desired number of questions to select exceeds total number of available questions. All questions are now used.");

            // return all questions
            return questions

        }

    }
    else {

        // throw error
        throw "Select option is invalid. It neither represents 'all' or a number."

    }
}


// This function randomly shuffles the questions if desired.
function shuffleQuestions(questions, options){

    // if questions are desired to be shuffled...
    if (options.shuffleQuestions === true){

        // ...return shuffled questions
        return shuffle(questions)

    }
    // if questions are not desired to be shuffled...
    else{
        
        // ... just return questions
        return questions
    
    }

}


// This function randomly shuffles the answers in multiple-choice questions.
function shuffleAnswers(questions, options){

    // if answers are desired to be shuffled...
    if (options.shuffleAnswers === true){

        // ...loop through questions
        questions.forEach(
            (currentQuestion, questionNumber) => {

                // check if current question is multiple-choice
                if (currentQuestion.type === "multiple-choice"){

                    // get random ordering
                    var ordering = randomPermutation(Object.keys(currentQuestion.answers).length);

                    // get new correct answer
                    currentQuestion.correctAnswer = ordering.indexOf(currentQuestion.correctAnswer-1)+1;

                    // shuffle answers
                    currentQuestion.answers = Object.fromEntries(
                        ordering.map((i,ind) => [ind+1, currentQuestion.answers[i+1]])
                    );

                }

        });

        // return questions
        return questions

    }
    // if answers are not desired to be shuffled...
    else{
        
        // ... just return questions
        return questions
    
    }

}


// This function replaces the parameters in between <> with their corresponding values as defined in the quiz layout.
function parseVariables(questions){

    // loop through questions
    questions.forEach(function (item, item_ind) {

        // check if question has variables property
        if (item.hasOwnProperty("variables")){

            // loop through known variables...
            for (var [key, value] of Object.entries(item.variables)) {
                
                // ...and substitute corresponding values in question...
                item.question = replaceAll(item.question, "<"+key+">", value);

                // ...and answers
                for (var [answer_key, answer_value] of Object.entries(item.answers)) {
                    item.answers[answer_key] = replaceAll(answer_value, "<"+key+">", value);
                }
            }
        
        }

    });

    return questions;

}


// This function finds all strings in the questions object.
function parseLaTeX(element){

    // if current element is a string...
    if (typeof(element) === "string") {

        // ...process string
        return processString(element)

    }

    // if current element is a number...
    if (typeof(element) === "number") {

        // return number
        return element

    }

    // if current element is a function...
    if (typeof(element) === "function") {

        // return function
        return element

    }

    // if current element is array...
    if (Array.isArray(element)){

        // create new array
        var newArray = [];
        
        // ...loop through elements...
        element.forEach(function (item, index) {

            // ...and parse elements
            newArray.push(parseLaTeX(item));

        });

        // return new array
        return newArray;

    }


    // if current element is an object...
    if (typeof element === 'object' && element !== null){

        // create empty object
        var newObject = {};

        // ...loop through keys and values...
        for (var [key, value] of Object.entries(element)) {

            // ...and parse values
            newObject[key] = parseLaTeX(value);

        }

        // return new object
        return newObject;

    }

}


// This function processes the string.
function processString(str){
    
    // check if string contains $ character
    if (str.includes("$")){
        str = inlineMath(str)
    }

    return str

}


// This functions converts single $...$ deliters to \(...\) for MathJax.
function inlineMath(str){

    // remove whitespaces from string
    str = str.trim()

    // create empty string for revised version
    var newString = ""

    // look for $ characters
    var inds = searchAll(str, "$")

    // set last checked index
    var lastInd = 0;

    // set leftright indicator (true => right, false => left)
    var leftright = true

    // check if preceded or followed by another $
    inds.forEach( function (ind, indInd) {
        
        // if character is at beginning of string and the length of the string is larger than 1...
        if ((ind == 0) && (str.length > 1)){

            // ...check whether it is followed by $
            if (str[ind+1] === "$"){

                // copy characters
                newString = newString.concat("$");

                // update last index
                lastInd = ind;

            }
            else{

                // change left/right indicator
                leftright = !leftright;

                // replace character
                if (leftright){
                    newString = newString.concat("\\)");
                }
                else{
                    newString = newString.concat("\\(");
                }

                // update last index
                lastInd = ind;

            }

        }

        // if character is at end of string and string length is larger than 1...
        else if ((ind == str.length-1) && (str.length > 1)) {

            // ... check whether it is preceded by a $
            if (str[ind-1] === "$"){

                // copy preceding characters
                newString = newString.concat(str.slice(lastInd+1, ind));

                // copy characters
                newString = newString.concat("$");

                // update last index
                lastInd = ind;

            }
            else{

                // copy preceding characters
                newString = newString.concat(str.slice(lastInd+1, ind));

                // change left/right indicator
                leftright = !leftright;

                // replace character
                if (leftright){
                    newString = newString.concat("\\)");
                }
                else{
                    newString = newString.concat("\\(");
                }

                // update last index
                lastInd = ind;

            }

        }

        // check if character is preceded or followed by $
        else if (str[ind-1] === "$" || str[ind+1] === "$"){

            // copy preceding characters
            newString = newString.concat(str.slice(lastInd+1, ind));

            // copy characters
            newString = newString.concat("$");

            // update last index
            lastInd = ind;

        }
        else{

            // copy preceding characters
            if (indInd == 0){
                newString = newString.concat(str.slice(lastInd, ind));
            }
            else{
                newString = newString.concat(str.slice(lastInd+1, ind));
            }

            // change left/right indicator
            leftright = !leftright;

            // replace character
            if (leftright){
                newString = newString.concat("\\)");
            }
            else{
                newString = newString.concat("\\(");
            }

            // update last index
            lastInd = ind;

            // if last index, copy also the following text
            if (indInd == inds.length-1){
                newString = newString.concat(str.slice(lastInd+1, str.length));
            }

        }

    });

    return newString;
    
}