export { replaceAll as default }

import numberOfOccurences from "../utils/numberofoccurences.js"

function replaceAll(str, find, replace){

    // initialize counter
    var i = 0;

    // loop through number of occurences
    while (i < numberOfOccurences(str, find)){

        // replace once
        str = str.replace(find, replace);

        // update counter
        i++;
    }

    // return new string
    return str

};