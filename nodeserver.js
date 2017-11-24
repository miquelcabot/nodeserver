// Requirements: node.js and Express
// To install Express:
//   $ npm install express --save

const PORT = process.env.PORT || 8080;
const HTDOCS_FOLDER = '.';

var express = require('express');
var path = require('path');
var fs = require('fs');
var cp = require('child_process');

var app = express();

app.get('/', function (req, res) {
    // Text of the main index.html
    var htmltext = '<!DOCTYPE html>\r\n'+
        '<html><head><title>Node.js HTTP Server</title>\r\n'+
        '<meta name="viewport" content="width=device-width, initial-scale=1">\r\n'+
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\r\n'+
        '<body><div class="jumbotron text-center"><h1>Projects</h1></div>\r\n'+
        '<div class="container"><div class="list-group">';
    // Function dirs(p). Returns directory names of the "p" directory
    const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());

    // We add to html web page every subdir in HTDOC_FOLDER
    var dirnames = dirs(path.join(__dirname, HTDOCS_FOLDER));
    for (var i = 0; i < dirnames.length; i++) {
        if ((dirnames[i]!='node_modules') && (dirnames[i].substring(0,1)!='.')) {
            htmltext += '<a href="http://localhost:'+PORT+'/'+dirnames[i]+'" class="list-group-item">'+dirnames[i]+'</a>';
        }
    }
    // End of html file
    htmltext += '</div></div></body></html>';

    res
        .status(200)
        .send(htmltext);
})

// We use the HTDOC_FOLDER as the main folder of the server
app.use('/', express.static(path.join(__dirname, HTDOCS_FOLDER)));
console.log('http://localhost:'+PORT+'/');

// We start the http server
app.listen(PORT, function () {
  console.log('Server running on '+PORT+'...');
  console.log('Press CTRL+C to stop');
  // We start chrome browser
  cp.exec('start chrome http://localhost:'+PORT);
});

