export { parseQuiz as default}

import searchAll from "../utils/searchall.js"
import replaceAll from "../utils/replaceall.js"


function parseQuiz(questions){

    // parse variables into questions and answers
    questions = parseVariables(questions)

    // parse inline LaTeX ( convert $...$ delimiters to \(...\) )
    questions = parseLaTeX(questions)

    // return parsed questions
    return questions
}


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


function processString(str){
    
    // check if string contains $ character
    if (str.includes("$")){
        str = inlineMath(str)
    }

    return str

}


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
    inds.forEach( function (ind, _) {
        
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

    });

    return newString;
    
}


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