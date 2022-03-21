import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import fs from 'fs';

const app = express();
const PORT = 8080;
var confData = {};
var text = "";

app.use(bodyParser.json());
fs.readFile('config.json','utf8',(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        confData = JSON.parse(data);
        //console.log(confData.readFrom);
        fs.readFile(confData.readFrom,'utf8',(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                text = data;
                text = text.split(/\r?\n/);
                console.log(text);
            }
        });
    }
});


app.get('/', (req, res) => {
    var msg = "Hello World! <br/> Consider adding \"/count?word=word_you_want_counted\" to the URL";
    msg += "<br/>so that you can see how many times your word appears in each line of";
    msg += "<br/>fileNameGoesHere";
    res.send(msg);
});

app.get('/count', (req, res) => {
    const urlObject = url.parse(req.url, true).query;
    if ('word' in urlObject){
        //add word counting logic here
        var resObj = {"word":urlObject.word, "sentances":[]};
        var pattern = new RegExp(urlObject.word,'gi');
        var max = 0;
        var line = "";
        for(line of text){
            var count = line.match(pattern);
            if (count) count = count.length;
            console.log(line)
            if (count>0){
                resObj.sentances.push({"sentance":line, "count":count});
            }
            resObj.sentances.sort((a, b) => {
                if (parseInt(b.count) - parseInt(a.count) == 0) return a.sentance > b.sentance?1:-1;
                return parseInt(b.count) - parseInt(a.count);
            });
        }
        
        res.send("<pre>"+JSON.stringify(resObj,null,4)+"</pre>");
        
    } else {
        res.status(404).send("Sorry, we couldn't find what you were looking for...")
    }
});
app.listen(PORT, () => console.log('Server listening on 8080...'))