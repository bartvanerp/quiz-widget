export { searchAll as default }

function searchAll(str, substr){
    
    // create empty array for indices
    var inds = [];

    // create last index
    var lastInd = -1;

    // loop through string
   do {

        // search for substring
        lastInd = parseInt(str.indexOf(substr, lastInd+1), 10)

        // push to array if meaningful
        if (lastInd !== -1){
            inds.push(lastInd)
        }

    }
    while (lastInd !== -1)

    // return indices
    return inds

}