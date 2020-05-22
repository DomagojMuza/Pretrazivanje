const fs = require('fs');

let text = fs.readFileSync("./long.txt", "utf-8")
text = text.split(/[\s,]+/)

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}


let indexTrazeneRijeci = getAllIndexes(text, "I").slice(0, 20)
indexTrazeneRijeci.forEach((index) =>{
    console.log(text[index], text[index+1]);
})