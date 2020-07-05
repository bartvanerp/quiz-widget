export { parseQuiz as default }

import searchAll from "/js/utils/searchall.js"

function parseQuiz(element){

    // if current element is a string...
    if (typeof(element) === "string") {

        // ...process string
        return processString(element)

    }


    // if current element is array...
    if (Array.isArray(element)){

        // create new array
        var newArray = [];
        
        // ...loop through elements...
        element.forEach(function (item, index) {

            // ...and parse elements
            newArray.push(parseQuiz(item));

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
            newObject[key] = parseQuiz(value);

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