const PORT = 8080                               //Resource Help/Assistance Recieved from https://www.youtube.com/watch?v=-3lqUHeZs_0
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const url = 'https://en.wikipedia.org/wiki/Logic_gate'
var inputLogicGate = readInputFile() 

axios (url).then(response => {
        const html = response.data
        const info = cheerio.load(html)
        const logicGates = []
        
        //-------------------------- Searches and Scrapes from Wiki --------------------------
        info('b', html).each(function() {
            const lgLink = info(this).find('a').attr('href')
            const lgText = info(this).text()
            logicGates.push({
                lgText,
                lgLink
            })
        })

        //-------------------------- Displays Logic Gate WikiLink --------------------------
        console.log(logicGates) 
        console.log("Searching for:", inputLogicGate)
        for (var i = 0; i < logicGates.length; i++) {
            
            if (logicGates[i].lgText == inputLogicGate) {
                 console.log(logicGates[i].lgText + ':','https://en.wikipedia.org' + logicGates[i].lgLink)
                 printToFile('https://en.wikipedia.org' + logicGates[i].lgLink)
            } 
        }

    })


app.listen(PORT, () => console.log('server running on PORT ${PORT}'))

function printToFile (link) {
    var data = link
    fs.writeFile('logicGateFile.csv', data, (err) => {      //Resource code from https://www.geeksforgeeks.org/javascript-program-to-write-data-in-a-text-file/
        if (err) throw err;
    })
}
 
function readInputFile () {
    fs.readFile('logicGateInput.csv', 'utf-8', (err, data) => {
        if (err) throw err;
       inputLogicGate = data.toString();
    }) 
}
