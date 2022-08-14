const PORT = 8080                               //Resource Help/Assistance Recieved from https://www.youtube.com/watch?v=-3lqUHeZs_0
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const authorUrl = 'https://www.youtube.com/c/'
const videoUrl = 'https://www.youtube.com/embed/'
var inputAuthors = readInputFile() 

axios (authorUrl).then(response => {
        const html = response.data
        const info = cheerio.load(html)
        const yt_authors = []
        
        //-------------------------- Searches and Scrapes from Author Page --------------------------
        info('b', html).each(function() {
            const idVideo = info(this).find('a').attr('href')               //Identify video tags/attributes
            const videoText = info(this).text()                             //Grab video title for website title tag
            videos.push({
                videoText,
                idVideo
            })
        })

        //-------------------------- Displays Video Link/ID  --------------------------
        console.log(videos) 
        console.log("Searching for:", inputAuthors)
        for (var i = 0; i < videos.length; i++) {
            
            if (videos[i].videoText == inputAuthors) {
                 console.log(videos[i].videoText + ':','https://en.wikipedia.org' + videos[i].idVideo)
                 printToFile('https://en.wikipedia.org' + videos[i].idVideo)
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
       inputAuthors = data.toString();
    }) 
}
