const fs = require('fs');

let inputText = fs.readFileSync("./long.txt", "utf-8")
inputText = inputText.split(/[\s,]+/)

function find(){
    return inputText
}

module.exports = find

