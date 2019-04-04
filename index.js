const Fuse = require('fuse.js');
const Tesseract = require('tesseract.js');
const image = require('path').resolve(__dirname, 'carte.png');
Tesseract.recognize(image)
    .progress(function (info) {
        console.log(info);
    })
    .then(function (result) {
        search(result.lines, 'void')
    })


function search(lines, txt) {
    let options = {
        keys: ["text"],
        shouldSort: true,
        findAllMatches: true,
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
    };
    let fuse = new Fuse(lines, options);

    let res = fuse.search(txt);
    let matches = res[0].matches;
    console.log(matches);
}




// result is: {
//     blocks: Array[1]
//     confidence: 87
//     html: "<div class='ocr_page' id='page_1' ..."
//     lines: Array[3]
//     oem: "DEFAULT"
//     paragraphs: Array[1]
//     psm: "SINGLE_BLOCK"
//     symbols: Array[33]
//     text: "Hello World↵from beyond↵the Cosmic Void↵↵"
//     version: "3.04.00"
//     words: Array[7]
// }