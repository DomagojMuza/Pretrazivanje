const fs = require('fs');

//za ocistit konzolu
process.stdout.write('\033c');



function searchTool(){
    this.text = fs.readFileSync("./long.txt", "utf-8")
    return this;
}

//svaku rijec cisti od viska znakova i vraca listu ociscenih rijeci
searchTool.prototype.cleanAndSplitText = function() {
    this.cleandText =  this.text.split(/[\s,]+/).map((eachWord) =>{
        return eachWord.replace(/[|&;?.!#$%@"/*:<>()+,]/g, ' ')
    }).join(" ").split(/[\s,]+/)
    return this
}


//jako ruzna funkcija koja mapira sljedece rijeci
searchTool.prototype.mapNextWords = function() {
    this.mappedWords = this.cleandText.reduce((mapOfNextWords, currentWord, idx, cleandText) =>{
        let cursor = mapOfNextWords[currentWord] = mapOfNextWords[currentWord] || {} // prvi level
        cursor = cursor[cleandText[++idx]] = cursor[cleandText[idx]] || {} // drugi level
        cursor = cursor[cleandText[++idx]] = cursor[cleandText[idx]] || {} // treci level
        cursor = cursor[cleandText[++idx]] = cursor[cleandText[idx]] || [] // cetvrti level
        cursor.push(cleandText[++idx])
        return mapOfNextWords
    }, {})
    return this
}

searchTool.prototype.findNextWords = function(phrase, mappedWords = this.mappedWords, phraseIndex = 0) {
    let splitedPhrase = phrase.replace(/^\s+|\s+$|\s+(?=\s)/g, "").split(" ")
    if(splitedPhrase.length >= 4 || splitedPhrase[phraseIndex] === '') throw new Error("Search phrase invalid")

    this.nextWords = mappedWords[splitedPhrase[phraseIndex]]
    this.fiveMostOcurred = Object.keys(this.nextWords).sort((wordA, wordB) =>{
        return Object.keys(this.nextWords[wordB]).length - Object.keys(this.nextWords[wordA]).length
    }).slice(0, 5)

    if(splitedPhrase[++phraseIndex] === undefined) {
        this.phrase = splitedPhrase.join(" ")
        return this
    }
    return this.findNextWords(phrase, this.nextWords, phraseIndex)
}

searchTool.prototype.printNextWords = function (){
    this.fiveMostOcurred.forEach((word) =>{
        console.log(`${this.phrase} ${word}`);
    })
}

try { 
    new searchTool().cleanAndSplitText()
        .mapNextWords()
        .findNextWords('       Good     ')
        .printNextWords()
} catch (error) {
    console.log(error.message);
}


// module.exports = findNextWords