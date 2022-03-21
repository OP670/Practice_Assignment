import express from 'express'; //for routing purposes
import bodyParser from 'body-parser'; //for parsing JSON data
import url from 'url'; //for reading queries from URL
import fs from 'fs'; //for opening files

const app = express(); //starts the express service
const PORT = 8080;
var confData = {}; //data loaded from config.json
var text = ""; //text loaded from a file path in config.json

app.use(bodyParser.json());

// reads the config.json
fs.readFile('config.json','utf8',(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        //read the text data from the file config.json points to
        confData = JSON.parse(data);
        fs.readFile(confData.readFrom,'utf8',(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                text = data;
                text = text.split(/\r?\n/); //turns each new line into an array element
            }
        });
    }
});

//homepage with some instructions
app.get('/', (req, res) => {
    var msg = "Hello World! <br/> Consider adding \"/count?word=word_you_want_counted\" to the URL";
    msg += "<br/>so that you can see how many times your word appears in each line of";
    msg += "<br/>fileNameGoesHere";
    res.send(msg);
});

//responds to /count?word queries
app.get('/count', (req, res) => {
    const urlObject = url.parse(req.url, true).query;

    //if the query is correct, proceed with counting words
    if ('word' in urlObject){
        var resObj = {"word":urlObject.word, "sentances":[]};
        var pattern = new RegExp(urlObject.word,'gi');
        var line = "";

        for(line of text){
            var count = line.match(pattern);

            if (count) count = count.length; //if there are no matches, match returns null, there is no length of null

            if (count>0){
                resObj.sentances.push({"sentance":line, "count":count}); //ads a new object to response object's array of sentances
            }

            resObj.sentances.sort((a, b) => { // sorts objects in sentaces array in descending order by count than in ascending order by alphabet
                if (parseInt(b.count) - parseInt(a.count) == 0) return a.sentance > b.sentance?1:-1;
                return parseInt(b.count) - parseInt(a.count);
            });
        }
        
        res.send("<pre>"+JSON.stringify(resObj,null,4)+"</pre>"); //shows prettier JSON to client
        
    } else {
        res.status(404).send("Sorry, we couldn't find what you were looking for...")
    }
});

app.listen(PORT, () => console.log('Server listening on 8080...')) //message for console